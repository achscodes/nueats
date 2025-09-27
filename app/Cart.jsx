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
import cartStyles, { CART_COLORS } from "./src/Cart.js"; // ✅ Import dedicated cart styles
import { Ionicons } from "@expo/vector-icons";

export default function Cart() {
  const router = useRouter();
  const { cartItems, increaseQty, decreaseQty, removeFromCart } =
    useContext(CartContext);

  // Remove item with confirmation
  const handleRemoveItem = (id) => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => removeFromCart(id),
      },
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
    router.push("/Checkout");
  };

  return (
    <SafeAreaView style={cartStyles.cartContainer}>
      {/* Header */}
      <View style={cartStyles.cartHeader}>
        <TouchableOpacity onPress={() => router.replace("/Menu")}>
          <Ionicons name="arrow-back" size={22} color={CART_COLORS.white} />
        </TouchableOpacity>
        <Text style={cartStyles.cartHeaderTitle}>CART</Text>
        <View style={{ width: 25 }} />
      </View>

      {cartItems.length === 0 ? (
        <View style={cartStyles.emptyCart}>
          <Text style={cartStyles.emptyCartText}>Your cart is empty 🛒</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ paddingBottom: 150 }}
            renderItem={({ item }) => (
              <View style={cartStyles.cartCard}>
                {/* Food Image */}
                <Image
                  source={{
                    uri: item.image || "https://via.placeholder.com/60",
                  }}
                  style={cartStyles.cartFoodImage}
                />

                {/* Food Details */}
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={cartStyles.cartFoodName}>{item.name}</Text>
                  <Text style={cartStyles.cartFoodServing}>1 Serving</Text>

                  {/* Quantity Controls */}
                  <View style={cartStyles.qtyControls}>
                    <TouchableOpacity
                      onPress={() => decreaseQty(item.id)}
                      style={cartStyles.qtyBtn}
                    >
                      <Ionicons
                        name="remove"
                        size={18}
                        color={CART_COLORS.primary}
                      />
                    </TouchableOpacity>
                    <Text style={cartStyles.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => increaseQty(item.id)}
                      style={cartStyles.qtyBtn}
                    >
                      <Ionicons
                        name="add"
                        size={18}
                        color={CART_COLORS.primary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Price & Remove */}
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={cartStyles.price}>
                    ₱{item.price * item.quantity}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveItem(item.id)}
                    style={cartStyles.removeBtn}
                  >
                    <Text style={cartStyles.removeText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          {/* Total and Checkout Button */}
          <View style={cartStyles.checkoutContainer}>
            <Text style={cartStyles.totalText}>Total: ₱{totalPrice}</Text>
            <TouchableOpacity
              style={cartStyles.checkoutBtn}
              onPress={handleCheckout}
            >
              <Text style={cartStyles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
