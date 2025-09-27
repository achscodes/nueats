// Checkout.jsx
import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { CartContext } from "./context/CartContext";
import { OrderContext } from "./context/OrderContext";
import checkoutStyles from "./src/Checkout.js"; // Import dedicated checkout styles

export default function Checkout() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const cartContext = useContext(CartContext);
  const orderContext = useContext(OrderContext);

  if (!cartContext) return <Text>Loading cart...</Text>;
  if (!orderContext) return <Text>Loading order...</Text>;

  const { cartItems, increaseQty, decreaseQty, clearCart, addToCart } =
    cartContext;

  // ✅ Use createOrder instead of setCurrentOrder
  const { createOrder } = orderContext;

  const [selectedPayment, setSelectedPayment] = useState("Gcash");

  // Handle reorder items from params
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

  // Calculate prep time based on items
  const calculatePrepTime = () => {
    if (cartItems.length === 0) return 15;

    // Get the maximum prep time from all items (they can be prepared in parallel)
    const maxPrepTime = Math.max(
      ...cartItems.map((item) => item.prep_time || 15)
    );

    // Add queue time (2-5 minutes)
    const queueTime = 5;

    return maxPrepTime + queueTime;
  };

  // ✅ FIXED: Place order with proper order number generation
  const handleOrder = () => {
    if (cartItems.length === 0) return;

    const orderId = Date.now().toString();
    const orderDate = new Date().toISOString();
    const prepTime = calculatePrepTime();

    // ✅ Use createOrder - this will generate the unique order number
    const orderData = {
      id: orderId,
      items: cartItems,
      total: totalAmount,
      payment: selectedPayment,
      time: orderDate,
      status: "preparing", // Set initial status as preparing
      prepTime: prepTime,
      // ✅ DON'T include orderNumber - let createOrder generate it
    };

    // ✅ Create the order (this generates the unique order number)
    const createdOrder = createOrder(orderData);

    // ✅ Navigate to OrderStatus with the generated order number
    router.replace({
      pathname: "/OrderStatus",
      params: {
        id: createdOrder.id,
        time: createdOrder.time,
        status: createdOrder.status,
        items: encodeURIComponent(JSON.stringify(createdOrder.items)),
        total: createdOrder.total.toString(),
        payment: createdOrder.payment,
        orderNumber: createdOrder.orderNumber, // ✅ Pass the generated order number
      },
    });

    clearCart();
  };

  const renderItem = ({ item }) => (
    <View style={checkoutStyles.checkoutItemCard} key={item.id}>
      <Image
        source={{ uri: item.image }}
        style={checkoutStyles.checkoutItemImage}
      />
      <View style={{ flex: 1 }}>
        <Text style={checkoutStyles.checkoutItemName}>{item.name}</Text>
        <Text style={checkoutStyles.checkoutItemQty}>x{item.quantity}</Text>
      </View>
      <Text style={checkoutStyles.checkoutItemPrice}>
        ₱{item.price * item.quantity}
      </Text>
    </View>
  );

  const paymentMethods = [
    {
      label: "Gcash ••••••••••••7143",
      value: "Gcash",
      icon: require("../assets/images/Gcash.png"),
    },
    {
      label: "Cash",
      value: "Cash",
      icon: require("../assets/images/Cash.png"),
    },
    {
      label: "Pay Maya",
      value: "PayMaya",
      icon: require("../assets/images/Maya.png"),
    },
  ];

  // Create sections for FlatList rendering
  const sections = [
    {
      type: "items",
      data: cartItems,
    },
    {
      type: "payment",
      data: paymentMethods,
    },
  ];

  const renderSection = ({ item, index }) => {
    if (item.type === "items") {
      return (
        <View style={checkoutStyles.itemsCard}>
          <Text style={checkoutStyles.sectionTitle}>Your Items</Text>
          {item.data.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 20, color: "#777" }}>
              Your cart is empty
            </Text>
          ) : (
            item.data.map((cartItem, idx) => (
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
      {/* Header */}
      <View style={checkoutStyles.checkoutHeader}>
        <TouchableOpacity
          onPress={() => router.replace("/Cart")}
          style={checkoutStyles.checkoutBackButton}
        >
          <Text style={checkoutStyles.checkoutBackArrow}>←</Text>
        </TouchableOpacity>

        <Text style={checkoutStyles.checkoutHeaderText}>CHECKOUT</Text>
      </View>

      {/* Replace ScrollView + FlatList with single FlatList */}
      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={(item, index) => `${item.type}-${index}`}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Total + Order Button */}
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
