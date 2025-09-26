import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { CartContext } from "./context/CartContext";
import styles, { COLORS } from "./src/style"; // ✅ clean import
import { Ionicons } from "@expo/vector-icons";

export default function Cart() {
  const router = useRouter();
  const { cartItems, increaseQty, decreaseQty, removeFromCart } =
    useContext(CartContext);

  // Remove item with confirmation
  const handleRemoveItem = (id) => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => removeFromCart(id) },
    ]);
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Navigate to Checkout page
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    router.push("/Checkout"); // ✅ fixed path
  };

  return (
    <SafeAreaView style={styles.cartContainer}>
      {/* Header */}
      <View style={styles.cartHeader}>
        <TouchableOpacity onPress={() => router.replace("/Menu")}>
          <Ionicons name="arrow-back" size={22} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.cartHeaderTitle}>CART</Text>
        <View style={{ width: 25 }} />
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>Your cart is empty 🛒</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => String(item.id)} // ✅ ensure string keys
            contentContainerStyle={{ paddingBottom: 150 }}
            renderItem={({ item }) => (
              <View style={styles.cartCard}>
                {/* Food Image */}
                <Image
                  source={{ uri: item.image || "https://via.placeholder.com/60" }}
                  style={styles.cartFoodImage}
                />

                {/* Food Details */}
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.cartFoodName}>{item.name}</Text>
                  <Text style={styles.cartFoodServing}>1 Serving</Text>

                  {/* Quantity Controls */}
                  <View style={styles.qtyControls}>
                    <TouchableOpacity
                      onPress={() => decreaseQty(item.id)}
                      style={styles.qtyBtn}
                    >
                      <Ionicons
                        name="remove"
                        size={18}
                        color={COLORS.primary}
                      />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => increaseQty(item.id)}
                      style={styles.qtyBtn}
                    >
                      <Ionicons name="add" size={18} color={COLORS.primary} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Price & Remove */}
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.price}>
                    ₱{item.price * item.quantity}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveItem(item.id)}
                    style={styles.removeBtn}
                  >
                    <Text style={styles.removeText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          {/* Total and Checkout Button */}
          <View style={styles.checkoutContainer}>
            <Text style={styles.totalText}>Total: ₱{totalPrice}</Text>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
