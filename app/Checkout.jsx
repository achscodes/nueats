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
  const [hasActiveOrder, setHasActiveOrder] = useState(false);
  const [isCheckingActiveOrder, setIsCheckingActiveOrder] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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

  // Check for active orders on component mount
  useEffect(() => {
    const checkActiveOrder = async () => {
      if (!isAuthenticated || !user?.id) {
        setIsCheckingActiveOrder(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("orders")
          .select("order_id, status, created_at")
          .eq("user_id", user.id)
          .in("status", ["Pending", "Preparing", "Ready"])
          .order("created_at", { ascending: false })
          .limit(1);

        if (error) {
          console.error("Error checking active order:", error);
          setIsCheckingActiveOrder(false);
          return;
        }

        setHasActiveOrder(data && data.length > 0);
      } catch (error) {
        console.error("Error checking active order:", error);
      } finally {
        setIsCheckingActiveOrder(false);
      }
    };

    checkActiveOrder();
  }, [isAuthenticated, user]);

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

  const mapPaymentMethod = (method) => {
    // PayMongo handles both GCash and PayMaya, store as Paymongo in DB
    return method.toLowerCase() === 'cash' ? 'Cash' : 'Paymongo';
  };

  // Clear cart items from database
  const clearCartFromDatabase = async () => {
    try {
      if (!user?.id) return;

      // Get user's cart
      const { data: cartRow, error: cartErr } = await supabase
        .from("cart")
        .select("cart_id")
        .eq("user_id", user.id)
        .single();

      if (cartErr || !cartRow) {
        console.error("Cart not found:", cartErr);
        return;
      }

      // Delete all cart items for this cart
      const { error: deleteErr } = await supabase
        .from("cart_items")
        .delete()
        .eq("cart_id", cartRow.cart_id);

      if (deleteErr) {
        console.error("Failed to clear cart items:", deleteErr);
      }
    } catch (error) {
      console.error("Error clearing cart from database:", error);
    }
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

      // Insert order into database (status defaults to 'Pending' from DB)
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: totalAmount,
          payment_method: paymentMethod,
        })
        .select()
        .single();

      if (orderError) {
        console.error('Order insert error:', orderError);
        Alert.alert("Error", "Failed to create order. Please try again.");
        return null;
      }

      // Create payment record for this order
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          order_id: orderData.order_id,
          user_id: user.id,
          method: paymentMethod,
          amount: totalAmount,
          status: 'pending',
          provider: paymentMethod === 'Cash' ? null : 'Paymongo',
        });

      if (paymentError) {
        console.error('Payment insert error:', paymentError);
        Alert.alert("Error", "Failed to create payment record. Please try again.");
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

      // Clear cart items from database after successful order
      await clearCartFromDatabase();

      // Create local order for tracking
      const orderNumber = `NU-2025-${orderData.order_id.toString().slice(-6)}`;
      const localOrderData = {
        id: orderData.order_id.toString(),
        items: cartItems,
        total: totalAmount,
        payment: paymentMethod,
        time: orderData.created_at,
        status: "pending",
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

    // Check for active orders
    if (hasActiveOrder) {
      Alert.alert(
        "Active Order Found",
        "You already have an ongoing order. Please wait for it to be completed before placing a new order.",
        [
          {
            text: "View Order Status",
            onPress: () => router.push("/OrderStatus"),
          },
          {
            text: "OK",
            style: "cancel",
          },
        ]
      );
      return;
    }

    setIsLoading(true);
    try {
      if (selectedPayment.toLowerCase() === "cash") {
        // For cash payments, save directly to database
        await placeLocalOrder();
      } else if (selectedPayment.toLowerCase() === "paymongo") {
        // Save order to database first
        const order = await saveOrderToDatabase();
        
        if (!order) {
          return;
        }

        // Invoke payment function after order is saved
        const { data, error } = await supabase.functions.invoke("payment", {
          body: {
            amount: totalAmount,
            payment_method_type: selectedPayment.toLowerCase(),
            order_id: order.order_id,
            user_id: user.id,
          },
        });

        if (error) {
          Alert.alert("Payment Error", "Payment initiation failed. Try again.");
          return;
        }

        const redirectUrl = data?.redirect_url;
        if (redirectUrl) {
          // Clear cart first
          clearCart();
          
          // Navigate to order status
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
          
          // Open PayMongo URL
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
    } finally {
      setIsLoading(false);
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

        <TouchableOpacity 
          style={[
            checkoutStyles.orderBtn,
            (isLoading || isCheckingActiveOrder || hasActiveOrder) && checkoutStyles.orderButtonDisabled,
          ]} 
          onPress={handleOrder}
          disabled={isLoading || isCheckingActiveOrder || hasActiveOrder}
        >
          <Text style={checkoutStyles.orderText}>
            {isLoading ? "Processing..." : isCheckingActiveOrder ? "Checking..." : hasActiveOrder ? "Active Order" : "ORDER"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}