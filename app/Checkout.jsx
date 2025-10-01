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
import checkoutStyles from "./src/Checkout.js";

// Payment methods array
const paymentMethods = [
  { label: "Cash", value: "cash", icon: require("../assets/images/Cash.png") },
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

  if (!cartContext) return <Text>Loading cart...</Text>;
  if (!orderContext) return <Text>Loading order...</Text>;

  const { cartItems, clearCart, addToCart } = cartContext;
  const { createOrder } = orderContext;

  const [selectedPayment, setSelectedPayment] = useState("cash");

  // ✅ ✅ LISTEN FOR DEEPLINK REDIRECTS
  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      if (url.includes("payment-success")) {
        Alert.alert("Payment Successful!", "Thank you for your order.");
        placeLocalOrder(); // Create order here when payment is successful
      } else if (url.includes("payment-failed")) {
        Alert.alert("Payment Failed", "You can try again or choose another method.");
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, []);

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

  // Create the local order (used by cash or successful PayMongo)
  const placeLocalOrder = () => {
    const orderId = Date.now().toString();
    const orderDate = new Date().toISOString();
    const prepTime = calculatePrepTime();

    const orderData = {
      id: orderId,
      items: cartItems,
      total: totalAmount,
      payment: selectedPayment,
      time: orderDate,
      status: "preparing",
      prepTime: prepTime,
    };

    const createdOrder = createOrder(orderData);

    router.replace({
      pathname: "/OrderStatus",
      params: {
        id: createdOrder.id,
        time: createdOrder.time,
        status: createdOrder.status,
        items: encodeURIComponent(JSON.stringify(createdOrder.items)),
        total: createdOrder.total.toString(),
        payment: createdOrder.payment,
        orderNumber: createdOrder.orderNumber,
      },
    });

    clearCart();
  };

  const handleOrder = async () => {
    if (cartItems.length === 0) return;

    try {
      console.log("Calling payment function with:", {
        amount: totalAmount,
        payment_method_type: selectedPayment.toLowerCase(),
      });

      const { data, error } = await supabase.functions.invoke("payment", {
        body: {
          amount: totalAmount,
          payment_method_type: selectedPayment.toLowerCase(),
        },
      });

      console.log("EDGE FUNCTION RESPONSE:", data);
      console.log("EDGE FUNCTION ERROR:", error);

      if (error) {
        console.error("Supabase function error:", error);
        alert(`Payment failed: ${error.message}`);
        return;
      }

      if (!data) {
        alert("No response from payment service");
        return;
      }

      if (selectedPayment.toLowerCase() === "cash") {
        placeLocalOrder();
      } else if (selectedPayment.toLowerCase() === "paymongo") {
        const redirectUrl = data?.redirect_url;
        if (redirectUrl) {
          console.log("Redirecting to:", redirectUrl);
          Linking.openURL(redirectUrl);
        } else {
          alert("Payment could not be initiated. Try again later.");
        }
      }
    } catch (e) {
      console.error("Payment error:", e);
      alert(`Payment error: ${e.message}`);
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
