import React, { useState, useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  Animated,
  Dimensions,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { CartContext } from "./context/CartContext.jsx";
import { useAuth } from "./context/AuthContext"; // Import auth context
import { LinearGradient } from "expo-linear-gradient";
// Import the new dedicated Order styles
import orderStyles, { ORDER_COLORS } from "./src/Order.js";
import { supabase } from "../lib/supabase";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const HEADER_HEIGHT = 90;
const IMAGE_HEIGHT = screenHeight * 0.4;

export default function Order() {
  const [quantity, setQuantity] = useState(1);
  const [guestModalVisible, setGuestModalVisible] = useState(false); // Guest mode modal
  const router = useRouter();
  const { id, name, description, price, image, isGuest, userId, prep_time } =
    useLocalSearchParams();
  const { addToCart } = useContext(CartContext);
  const { isGuest: authIsGuest, user, getUserFirstName } = useAuth(); // Get auth state

  // Use auth context state, fallback to params if needed
  const isGuestMode = authIsGuest || isGuest === "true";

  // Animation references
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const increaseQty = () => {
    // Animate button press
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      // Animate button press
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    if (isGuestMode) {
      setGuestModalVisible(true);
      return;
    }

    // Add to cart animation
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    try {
      // 1) Ensure cart exists for this user
      const userIdStr = user?.id;
      if (!userIdStr) throw new Error("No authenticated user.");

      const { error: upsertCartError } = await supabase
        .from("cart")
        .upsert({ user_id: userIdStr }, { onConflict: "user_id" });
      if (upsertCartError) throw upsertCartError;

      // 2) Get cart_id
      const { data: cartRow, error: cartSelectError } = await supabase
        .from("cart")
        .select("cart_id")
        .eq("user_id", userIdStr)
        .single();
      if (cartSelectError || !cartRow) throw cartSelectError || new Error("Cart not found");

      const cartIdNum = cartRow.cart_id;
      const productIdNum = Number(id);

      // 3) Insert or increment cart item quantity
      const { data: existingItem, error: existingErr } = await supabase
        .from("cart_items")
        .select("cart_item_id, quantity")
        .eq("cart_id", cartIdNum)
        .eq("product_id", productIdNum)
        .maybeSingle();
      if (existingErr) throw existingErr;

      if (existingItem) {
        const newQty = Number(existingItem.quantity) + Number(quantity);
        const { error: updateErr } = await supabase
          .from("cart_items")
          .update({ quantity: newQty })
          .eq("cart_item_id", existingItem.cart_item_id);
        if (updateErr) throw updateErr;
      } else {
        const { error: insertErr } = await supabase
          .from("cart_items")
          .insert({ cart_id: cartIdNum, product_id: productIdNum, quantity: Number(quantity) });
        if (insertErr) throw insertErr;
      }

      // 4) Sync local UI cart state
      addToCart({ id, name, price: Number(price), image }, quantity);

      Alert.alert(
        "Added to Cart",
        `${quantity} ${name}${quantity > 1 ? "s" : ""} added to your cart!`,
        [
          { text: "Continue Shopping", onPress: () => router.back() },
          { text: "View Cart", onPress: () => router.push("/Cart") },
        ]
      );
    } catch (e) {
      console.error("Add to cart failed", e);
      Alert.alert("Error", "Failed to add to cart. Please try again.");
    }
  };

  // Handle login button press
  const handleLoginPress = () => {
    setGuestModalVisible(false);
    router.push("/Login"); // Navigate to login page
  };

  // Handle sign up button press
  const handleSignUpPress = () => {
    setGuestModalVisible(false);
    router.push("/Termsandconditions"); // Navigate to sign up page
  };

  // Guest Mode Modal
  const renderGuestModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={guestModalVisible}
      onRequestClose={() => setGuestModalVisible(false)}
    >
      <View style={orderStyles.orderModalOverlay}>
        <View style={orderStyles.orderModalContainer}>
          <View style={orderStyles.orderModalHeader}>
            <Ionicons name="lock-closed-outline" size={50} color="#FFD700" />
            <Text style={orderStyles.orderModalTitle}>Account Required</Text>
          </View>

          <Text style={orderStyles.orderModalText}>
            You need to create an account or log in to add items to cart and
            access profile features. Don't worry, your browsing session will be
            saved!
          </Text>

          <View style={orderStyles.orderModalButtons}>
            <TouchableOpacity
              style={orderStyles.orderModalLoginButton}
              onPress={handleLoginPress}
              activeOpacity={0.8}
            >
              <Text style={orderStyles.orderModalLoginText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={orderStyles.orderModalSignUpButton}
              onPress={handleSignUpPress}
              activeOpacity={0.8}
            >
              <Text style={orderStyles.orderModalSignUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={orderStyles.orderModalCloseButton}
            onPress={() => setGuestModalVisible(false)}
            activeOpacity={0.8}
          >
            <Text style={orderStyles.orderModalCloseText}>
              Continue as Guest
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={orderStyles.orderContainer}>
      {/* Fixed Header */}
      <SafeAreaView style={orderStyles.orderHeaderContainer}>
        <View style={orderStyles.orderHeader}>
          <TouchableOpacity
            style={orderStyles.orderBackButton}
            onPress={() =>
              router.canGoBack() ? router.back() : router.push("/Menu")
            }
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color={ORDER_COLORS.white} />
          </TouchableOpacity>

          {/* Logo in header - centered */}
          <Image
            source={require("../assets/images/NuEatsLogov2.png")}
            style={orderStyles.orderLogoSmall}
          />

          {/* Empty view to balance the layout */}
          <View style={{ width: 40 }} />
        </View>
      </SafeAreaView>

      {/* Fixed Background Food Image */}
      <View style={orderStyles.orderImageContainer}>
        <Animated.Image
          source={{ uri: image || "https://via.placeholder.com/400" }}
          style={[
            orderStyles.orderBackgroundImage,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, 300],
                    outputRange: [0, -100],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)"]}
          style={orderStyles.orderImageOverlay}
        />

        {/* Food Title Overlay - Centered on Image */}
        <Animated.View
          style={[
            orderStyles.orderTitleOverlay,
            {
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, 200],
                    outputRange: [0, -50],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={orderStyles.orderFoodTitleLarge}>{name}</Text>
        </Animated.View>
      </View>

      {/* Scrollable Content Container with Parallax */}
      <Animated.ScrollView
        style={orderStyles.orderScrollContainer}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* Spacer to push content down initially */}
        <View style={{ height: IMAGE_HEIGHT }} />

        {/* Content Container with Curved Top */}
        <Animated.View
          style={[
            orderStyles.orderContentContainer,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, 200],
                    outputRange: [0, -60],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          {/* Food Details Card */}
          <View style={orderStyles.orderDetailsCard}>
            <View style={orderStyles.orderDetailsRow}>
              <View style={orderStyles.orderDetailsLeft}>
                <Text style={orderStyles.orderFoodName}>{name}</Text>
                <Text style={orderStyles.orderFoodDescription}>
                  {description}
                </Text>
                {prep_time ? (
                  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
                    <Ionicons name="time-outline" size={16} color="#999" />
                    <Text style={{ marginLeft: 6, color: "#666" }}>{prep_time} min prep</Text>
                  </View>
                ) : null}
              </View>
              <View style={orderStyles.orderPriceContainer}>
                <Text style={orderStyles.orderCurrencySymbol}>₱</Text>
                <Text style={orderStyles.orderPriceNumber}>{price}</Text>
              </View>
            </View>
          </View>

          {/* Quantity Selector */}
          <View style={orderStyles.orderQuantityCard}>
            <Text style={orderStyles.orderQuantityLabel}>Amount</Text>
            <Animated.View
              style={[
                orderStyles.orderQuantityControls,
                { transform: [{ scale: buttonScale }] },
              ]}
            >
              <TouchableOpacity
                onPress={decreaseQty}
                style={[
                  orderStyles.orderQuantityButton,
                  quantity === 1 && orderStyles.orderQuantityButtonDisabled,
                ]}
                activeOpacity={0.7}
                disabled={quantity === 1}
              >
                <LinearGradient
                  colors={
                    quantity === 1
                      ? [ORDER_COLORS.lightGray, ORDER_COLORS.border]
                      : [ORDER_COLORS.accent, ORDER_COLORS.accentAlt]
                  }
                  style={orderStyles.orderQuantityButtonGradient}
                >
                  <Ionicons
                    name="remove"
                    size={24}
                    color={
                      quantity === 1
                        ? ORDER_COLORS.darkGray
                        : ORDER_COLORS.primaryDark
                    }
                  />
                </LinearGradient>
              </TouchableOpacity>

              <View style={orderStyles.orderQuantityDisplay}>
                <Text style={orderStyles.orderQuantityNumber}>{quantity}</Text>
              </View>

              <TouchableOpacity
                onPress={increaseQty}
                style={orderStyles.orderQuantityButton}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={[ORDER_COLORS.accent, ORDER_COLORS.accentAlt]}
                  style={orderStyles.orderQuantityButtonGradient}
                >
                  <Ionicons
                    name="add"
                    size={24}
                    color={ORDER_COLORS.primaryDark}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            {/* Total price display */}
            <View
              style={{
                marginTop: 15,
                paddingTop: 15,
                borderTopWidth: 1,
                borderTopColor: "#f0f0f0",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "600", color: "#666" }}>
                Total:
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: ORDER_COLORS.primary,
                }}
              >
                ₱{(Number(price) * quantity).toFixed(0)}
              </Text>
            </View>
          </View>

          {/* Add to Cart Button */}
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={[
                orderStyles.orderAddToCartButton,
                isGuestMode && { opacity: 0.8 },
              ]}
              onPress={handleAddToCart}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={
                  isGuestMode
                    ? ["#FF9800", "#F57C00"]
                    : [ORDER_COLORS.primaryDark, ORDER_COLORS.primary]
                }
                style={orderStyles.orderAddToCartGradient}
              >
                <Text style={orderStyles.orderAddToCartText}>
                  {isGuestMode ? "Login to Add to Cart" : "Add to Cart"}
                </Text>
                <Ionicons
                  name={isGuestMode ? "lock-closed" : "cart"}
                  size={20}
                  color={ORDER_COLORS.white}
                  style={orderStyles.orderCartIcon}
                />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Animated.ScrollView>

      {/* Guest Mode Modal */}
      {renderGuestModal()}
    </View>
  );
}
