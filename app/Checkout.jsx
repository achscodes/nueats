import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  Linking,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { supabase } from "../lib/supabase";
import { CartContext } from "./context/CartContext";
import { OrderContext } from "./context/OrderContext";
import { useAuth } from "./context/AuthContext";
import checkoutStyles from "./src/Checkout.js";

// Payment methods array
const paymentMethods = [
  { 
    label: "Cash", 
    value: "cash", 
    icon: require("../assets/images/Cash.png") 
  },
  {
    label: "PayMongo",
    value: "paymongo",
    icon: require("../assets/images/Maya.png"),
  },
];

export default function Checkout() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const cartContext = useContext(CartContext);
  const orderContext = useContext(OrderContext);
  const { user, isAuthenticated } = useAuth();

  if (!cartContext) return <Text>Loading cart...</Text>;
  if (!orderContext) return <Text>Loading order...</Text>;

  const { cartItems, clearCart, addToCart } = cartContext;
  const { createOrder } = orderContext;

  const [selectedPayment, setSelectedPayment] = useState("cash");

  useEffect(() => {
    if (params.reorderItems) {
      try {
        const items = JSON.parse(decodeURIComponent(params.reorderItems));
        clearCart();
        items.forEach((item) => {
          addToCart({ ...item, quantity: item.quantity || 1 });
        });
      } catch (e) {
        console.log("Error parsing reorder items:", e);
      }
    }
  }, []);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const calculatePrepTime = () => {
    if (cartItems.length === 0) return 15;
    const maxPrepTime = Math.max(
      ...cartItems.map((item) => item.prep_time || 15)
    );
    const queueTime = 5;
    return maxPrepTime + queueTime;
  };

  // Helper function to map payment method to database format
  const mapPaymentMethod = (method) => {
    // PayMongo handles both GCash and PayMaya, store as Paymongo in DB
    return method.toLowerCase() === 'cash' ? 'Cash' : 'Paymongo';
  };

  // Save order to database
  const saveOrderToDatabase = async () => {
    if (!isAuthenticated || !user) {
      Alert.alert("Authentication Required", "Please login to place an order.");
      return null;
    }

    try {
      const prepTime = calculatePrepTime();
      const paymentMethod = mapPaymentMethod(selectedPayment);

      // Insert order into database
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: totalAmount,
          payment_method: paymentMethod,
          status: 'Preparing',
        })
        .select()
        .single();

      if (orderError) {
        console.error('Order insert error:', orderError);
        Alert.alert("Error", "Failed to create order. Please try again.");
        return null;
      }

      // Insert order items into database
      const orderItems = cartItems.map(item => ({
        order_id: orderData.order_id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Order items insert error:', itemsError);
        Alert.alert("Error", "Failed to save order items.");
        return null;
      }

      // Create local order for tracking
      const orderNumber = `NU-2025-${orderData.order_id.toString().slice(-6)}`;
      const localOrderData = {
        id: orderData.order_id.toString(),
        items: cartItems,
        total: totalAmount,
        payment: paymentMethod,
        time: orderData.created_at,
        status: "preparing",
        prepTime: prepTime,
        orderNumber: orderNumber,
      };

      const createdOrder = createOrder(localOrderData);

      return {
        ...createdOrder,
        order_id: orderData.order_id,
      };
    } catch (error) {
      console.error('Error saving order:', error);
      Alert.alert("Error", "An unexpected error occurred.");
      return null;
    }
  };

  // Place local order for cash payments
  const placeLocalOrder = async () => {
    const order = await saveOrderToDatabase();
    
    if (order) {
      router.replace({
        pathname: "/OrderStatus",
        params: {
          id: order.id,
          time: order.time,
          status: order.status,
          items: encodeURIComponent(JSON.stringify(order.items)),
          total: order.total.toString(),
          payment: order.payment,
          orderNumber: order.orderNumber,
        },
      });

      clearCart();
      Alert.alert("Order placed!", "Thank you for your order.");
    }
  };

  // Updated handleOrder function
  const handleOrder = async () => {
    if (cartItems.length === 0) {
      Alert.alert("Empty Cart", "Please add items to your cart.");
      return;
    }

    if (!isAuthenticated || !user) {
      Alert.alert("Authentication Required", "Please login to place an order.");
      router.push("/Login");
      return;
    }

    try {
      if (selectedPayment.toLowerCase() === "cash") {
        // For cash payments, save directly to database
        await placeLocalOrder();
      } else if (selectedPayment.toLowerCase() === "paymongo") {
        // Step 1: Save order to database first
        const order = await saveOrderToDatabase();
        
        if (!order) {
          return; // Error already shown in saveOrderToDatabase
        }

        // Step 2: Invoke payment function after order is saved
        const { data, error } = await supabase.functions.invoke("payment", {
          body: {
            amount: totalAmount,
            payment_method_type: selectedPayment.toLowerCase(),
            order_id: order.order_id,
          },
        });

        if (error) {
          Alert.alert("Payment Error", "Payment initiation failed. Try again.");
          return;
        }

        const redirectUrl = data?.redirect_url;
        if (redirectUrl) {
          // Step 3: Clear cart first
          clearCart();
          
          // Step 4: Navigate to order status
          router.replace({
            pathname: "/OrderStatus",
            params: {
              id: order.id,
              time: order.time,
              status: order.status,
              items: encodeURIComponent(JSON.stringify(order.items)),
              total: order.total.toString(),
              payment: order.payment,
              orderNumber: order.orderNumber,
            },
          });
          
          // Step 5: Open PayMongo URL last (after navigation)
          setTimeout(() => {
            Linking.openURL(redirectUrl);
          }, 500);
        } else {
          Alert.alert("Payment Error", "Payment could not be initiated. Try again later.");
        }
      }
    } catch (e) {
      console.error("Order error:", e);
      Alert.alert("Error", "An unexpected error occurred while placing your order.");
    }
  };

  const sections = [
    { type: "items", data: cartItems },
    { type: "payment", data: paymentMethods },
  ];

  const renderSection = ({ item }) => {
    if (item.type === "items") {
      return (
        <View style={checkoutStyles.itemsCard}>
          <Text style={checkoutStyles.sectionTitle}>Your Items</Text>
          {item.data.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 20, color: "#777" }}>
              Your cart is empty
            </Text>
          ) : (
            item.data.map((cartItem) => (
              <View
                key={cartItem.id || cartItem.name}
                style={checkoutStyles.checkoutItemCard}
              >
                <Image
                  source={{ uri: cartItem.image }}
                  style={checkoutStyles.checkoutItemImage}
                />
                <View style={{ flex: 1 }}>
                  <Text style={checkoutStyles.checkoutItemName}>
                    {cartItem.name}
                  </Text>
                  <Text style={checkoutStyles.checkoutItemQty}>
                    x{cartItem.quantity}
                  </Text>
                </View>
                <Text style={checkoutStyles.checkoutItemPrice}>
                  ₱{cartItem.price * cartItem.quantity}
                </Text>
              </View>
            ))
          )}
        </View>
      );
    }

    if (item.type === "payment") {
      return (
        <View style={checkoutStyles.paymentSection}>
          <Text style={checkoutStyles.paymentTitle}>Payment Method</Text>
          {item.data.map((method) => (
            <TouchableOpacity
              key={method.value}
              style={checkoutStyles.method}
              onPress={() => setSelectedPayment(method.value)}
            >
              <View style={checkoutStyles.radioCircle}>
                {selectedPayment === method.value && (
                  <View style={checkoutStyles.radioDot} />
                )}
              </View>
              <Image source={method.icon} style={checkoutStyles.icon} />
              <Text style={checkoutStyles.label}>{method.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={checkoutStyles.container}>
      <View style={checkoutStyles.checkoutHeader}>
        <TouchableOpacity
          onPress={() => router.replace("/Cart")}
          style={checkoutStyles.checkoutBackButton}
        >
          <Text style={checkoutStyles.checkoutBackArrow}>←</Text>
        </TouchableOpacity>
        <Text style={checkoutStyles.checkoutHeaderText}>CHECKOUT</Text>
      </View>

      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={(item, index) => `${item.type}-${index}`}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />

      <View style={checkoutStyles.bottomSection}>
        <View style={checkoutStyles.total}>
          <Text style={checkoutStyles.totalText}>TOTAL</Text>
          <Text style={checkoutStyles.totalText}>₱{totalAmount}</Text>
        </View>

        <TouchableOpacity style={checkoutStyles.orderBtn} onPress={handleOrder}>
          <Text style={checkoutStyles.orderText}>ORDER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}