import React, { useContext, useEffect } from "react";
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
import { supabase } from "../lib/supabase";
import { useAuth } from "./context/AuthContext";

export default function Cart() {
  const router = useRouter();
  const { cartItems, increaseQty, decreaseQty, removeFromCart, setCartItems } =
    useContext(CartContext);
  const { user } = useAuth();

  useEffect(() => {
    const loadCart = async () => {
      try {
        if (!user?.id) return;

        // Ensure a cart exists for the current user
        const { error: upsertErr } = await supabase
          .from("cart")
          .upsert({ user_id: user.id }, { onConflict: "user_id" });
        if (upsertErr) throw upsertErr;

        // Get cart id
        const { data: cartRow, error: cartErr } = await supabase
          .from("cart")
          .select("cart_id")
          .eq("user_id", user.id)
          .single();
        if (cartErr || !cartRow) throw cartErr || new Error("Cart not found");

        // Fetch items joined with menu_items for product details
        const { data: items, error: itemsErr } = await supabase
          .from("cart_items")
          .select(
            "cart_item_id, product_id, quantity, menu_items:product_id(id,name,price,image,prep_time)"
          )
          .eq("cart_id", cartRow.cart_id);
        if (itemsErr) throw itemsErr;

        const hydrated = (items || []).map((row) => ({
          id: row.product_id,
          name: row.menu_items?.name || "",
          price: Number(row.menu_items?.price || 0),
          image: row.menu_items?.image || "",
          quantity: Number(row.quantity || 1),
          prep_time: Number(row.menu_items?.prep_time || 0) || undefined,
        }));
        setCartItems(hydrated);
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    };

    loadCart();
  }, [user?.id, setCartItems]);

  // Remove item with confirmation (also remove from DB)
  const handleRemoveItem = (id) => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: async () => {
          try {
            if (!user?.id) {
              removeFromCart(id);
              return;
            }

            // Find user's cart
            const { data: cartRow, error: cartErr } = await supabase
              .from("cart")
              .select("cart_id")
              .eq("user_id", user.id)
              .single();
            if (cartErr || !cartRow) throw cartErr || new Error("Cart not found");

            // Delete the cart item by cart_id + product_id
            const { error: delErr } = await supabase
              .from("cart_items")
              .delete()
              .eq("cart_id", cartRow.cart_id)
              .eq("product_id", id);
            if (delErr) throw delErr;

            // Update local UI state
            removeFromCart(id);
          } catch (e) {
            console.error("Failed to remove cart item", e);
            Alert.alert("Error", "Failed to remove item. Please try again.");
          }
        },
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
