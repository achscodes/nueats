import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Image, SafeAreaView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { CartContext } from "./context/CartContext.jsx";
import styles, { COLORS } from "./src/style";

export default function Order() {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { id, name, description, price, image } = useLocalSearchParams();
  const { addToCart } = useContext(CartContext);

  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    addToCart({ id, name, price: Number(price), image }, quantity);
    Alert.alert(
      "Added to Cart",
      `${quantity} ${name}${quantity > 1 ? "s" : ""} added!`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            router.canGoBack() ? router.back() : router.push("/Menu")
          }
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>

        {/* Logo in header */}
        <Image
          source={require("../assets/images/NuEatsLogov2.png")} // ✅ correct path & case
          style={styles.logoSmall}
        />

        <TouchableOpacity onPress={() => router.push("/Profile")}>
          <Ionicons name="person-circle" size={28} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Food Image */}
      <Image
        source={{ uri: image || "https://via.placeholder.com/180" }}
        style={styles.foodImage}
      />

      {/* Title overlay */}
      <View style={styles.titleBox}>
        <Text style={styles.foodTitle}>{name}</Text>
      </View>

      {/* Info Card */}
      <View style={styles.infoCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.foodName}>{name}</Text>
          <Text style={styles.foodDesc}>{description}</Text>
        </View>
        <Text style={styles.foodPrice}>₱{price}</Text>
      </View>

      {/* Quantity Selector */}
      <View style={styles.amountBox}>
        <Text style={styles.amountLabel}>Amount</Text>
        <View style={styles.amountControls}>
          <TouchableOpacity onPress={decreaseQty} style={styles.amountBtn}>
            <Ionicons name="remove" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.amountText}>{quantity}</Text>
          <TouchableOpacity onPress={increaseQty} style={styles.amountBtn}>
            <Ionicons name="add" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
        <Text style={styles.cartBtnText}>Add to Cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
