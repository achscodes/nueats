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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { CartContext } from "./context/CartContext.jsx";
import { LinearGradient } from "expo-linear-gradient";
// Import the new dedicated Order styles
import orderStyles, { ORDER_COLORS } from "./src/Order.js";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const HEADER_HEIGHT = 90;
const IMAGE_HEIGHT = screenHeight * 0.4;

export default function Order() {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { id, name, description, price, image } = useLocalSearchParams();
  const { addToCart } = useContext(CartContext);

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

  const handleAddToCart = () => {
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

    addToCart({ id, name, price: Number(price), image }, quantity);
    Alert.alert(
      "Added to Cart",
      `${quantity} ${name}${quantity > 1 ? "s" : ""} added!`
    );
  };

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

          {/* Logo in header */}
          <Image
            source={require("../assets/images/NuEatsLogov2.png")}
            style={orderStyles.orderLogoSmall}
          />

          <TouchableOpacity
            style={orderStyles.orderProfileButton}
            onPress={() => router.push("/Profile")}
            activeOpacity={0.7}
          >
            <Ionicons
              name="person-circle"
              size={28}
              color={ORDER_COLORS.white}
            />
          </TouchableOpacity>
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
          // Removed blurRadius prop to make image clear
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
          </View>

          {/* Add to Cart Button */}
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={orderStyles.orderAddToCartButton}
              onPress={handleAddToCart}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[ORDER_COLORS.primaryDark, ORDER_COLORS.primary]}
                style={orderStyles.orderAddToCartGradient}
              >
                <Text style={orderStyles.orderAddToCartText}>Add to Cart</Text>
                <Ionicons
                  name="cart"
                  size={20}
                  color={ORDER_COLORS.white}
                  style={orderStyles.orderCartIcon}
                />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}
