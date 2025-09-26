// Checkout.jsx
import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { CartContext } from "./context/CartContext";
import { OrderContext } from "./context/OrderContext";
import styles from "./src/style"; // ✅ no .jsx

export default function Checkout() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const cartContext = useContext(CartContext);
  const orderContext = useContext(OrderContext);

  if (!cartContext) return <Text>Loading cart...</Text>;
  if (!orderContext) return <Text>Loading order...</Text>;

  const { cartItems, increaseQty, decreaseQty, clearCart, addToCart } =
    cartContext;
  const { setCurrentOrder } = orderContext;

  const [selectedPayment, setSelectedPayment] = useState("Gcash");

  // ✅ handle reorder items from params
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

  // ✅ place order
  const handleOrder = () => {
    if (cartItems.length === 0) return;

    const orderId = Date.now().toString();
    const orderDate = new Date().toISOString();

    setCurrentOrder({
      id: orderId,
      items: cartItems,
      total: totalAmount,
      payment: selectedPayment,
      date: orderDate,
      store: "Food Stall",
      status: "pending",
    });

    router.push({
      pathname: "/OrderStatus",
      params: {
        id: orderId,
        time: orderDate,
        status: "pending",
        items: encodeURIComponent(JSON.stringify(cartItems)),
        total: totalAmount.toString(),
        payment: selectedPayment,
        store: "Food Stall",
      },
    });

    clearCart();
  };

  const renderItem = ({ item }) => (
    <View style={styles.checkoutItemCard} key={item.id}>
      <Image source={{ uri: item.image }} style={styles.checkoutItemImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.checkoutItemName}>{item.name}</Text>
        <Text style={styles.checkoutItemQty}>x{item.quantity}</Text>
      </View>
      <Text style={styles.checkoutItemPrice}>
        ₱{item.price * item.quantity}
      </Text>
    </View>
  );

  const paymentMethods = [
    {
      label: "Gcash •••••••••••7143",
      value: "Gcash",
      icon: require("../assets/images/Gcash.png"),
    },
    { label: "Cash", value: "Cash", icon: require("../assets/images/Cash.png") },
    {
      label: "Pay Maya",
      value: "PayMaya",
      icon: require("../assets/images/Maya.png"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.checkoutHeader}>
        <TouchableOpacity
          onPress={() => router.replace("/Cart")}
          style={styles.checkoutBackButton}
        >
          <Text style={styles.checkoutBackArrow}>←</Text>
        </TouchableOpacity>

        <Text style={styles.checkoutHeaderText}>CHECKOUT</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Items */}
        <View style={styles.itemsCard}>
          <Text style={styles.sectionTitle}>Your Items</Text>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id || item.name}
            ListEmptyComponent={
              <Text
                style={{ textAlign: "center", marginTop: 20, color: "#777" }}
              >
                Your cart is empty
              </Text>
            }
          />
        </View>

        {/* Payment */}
        <View style={styles.paymentSection}>
          <Text style={styles.paymentTitle}>Payment Method</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.value}
              style={styles.method}
              onPress={() => setSelectedPayment(method.value)}
            >
              <View style={styles.radioCircle}>
                {selectedPayment === method.value && (
                  <View style={styles.radioDot} />
                )}
              </View>
              <Image source={method.icon} style={styles.icon} />
              <Text style={styles.label}>{method.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Total + Order Button */}
      <View style={styles.bottomSection}>
        <View style={styles.total}>
          <Text style={styles.totalText}>TOTAL</Text>
          <Text style={styles.totalText}>₱{totalAmount}</Text>
        </View>

        <TouchableOpacity style={styles.orderBtn} onPress={handleOrder}>
          <Text style={styles.orderText}>ORDER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
