import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OrderContext } from "./context/OrderContext";
import { Ionicons } from "@expo/vector-icons";
import styles from "./src/style"; // ✅ style.js instead of .jsx

const { height } = Dimensions.get("window");

export default function Menu() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const { orderStartTime, prepTime, currentOrder } = useContext(OrderContext);

  // ✅ Sample menu items
  const todaysOffer = [
    {
      id: "1",
      name: "Adobo",
      description: "Tender chicken simmered in soy sauce. A classic Pinoy favorite!",
      price: "120",
    },
    {
      id: "2",
      name: "Sinigang",
      description: "Sour tamarind broth with pork and vegetables.",
      price: "150",
    },
    {
      id: "3",
      name: "Kare-Kare",
      description: "Peanut-based stew with oxtail and vegetables.",
      price: "180",
    },
    {
      id: "4",
      name: "Lechon",
      description: "Crispy roasted pork belly, a true fiesta dish!",
      price: "250",
    },
  ];

  // ✅ Filtering logic
  const filteredOffer = todaysOffer.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase())
  );

  // ✅ Fix countdown calculation
  const getTimeLeft = () => {
    if (!orderStartTime) return null;
    const elapsed = Math.floor((Date.now() - orderStartTime) / 1000); // seconds
    return Math.max(prepTime - elapsed, 0);
  };

  const timeLeft = getTimeLeft();

  // ✅ Navigate to order page with params
  const handleFoodPress = (item) => {
    router.push({
      pathname: "/Order",
      params: {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price || "150",
      },
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.menuContainer}>
        {/* Header */}
        <View style={styles.menuHeader}>
          <Image
            source={require("../assets/images/NuEatsLogov3.png")}
            style={styles.menuLogo}
          />
          <TouchableOpacity
            onPress={() => router.push("/Setting")}
            style={styles.menuSettingsWrapper}
          >
            <Ionicons name="settings-outline" size={24} color="#2D2A84" />
          </TouchableOpacity>
        </View>

        {/* Welcome */}
        <Text style={styles.menuWelcome}>Welcome!</Text>
        <Text style={styles.menuSubText}>Let’s order your Food!</Text>

        {/* Search Bar */}
        <View style={styles.menuSearchBar}>
          <TextInput
            placeholder="🔍 Search..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            style={styles.menuSearchInput}
          />
        </View>

        {/* Today's Offer */}
        <Text style={styles.menuOfferTitle}>TODAY'S OFFER</Text>
        <FlatList
          data={filteredOffer}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: height * 0.2 }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleFoodPress(item)}>
              <View style={styles.menuFoodItem}>
                <View style={styles.menuFoodImage} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.menuFoodName}>{item.name}</Text>
                  <Text style={styles.menuFoodDesc}>{item.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.menuEmptyText}>No results found.</Text>
          )}
        />

        {/* Floating Cart */}
        <TouchableOpacity
          style={styles.menuCartButton}
          onPress={() => router.push("/Cart")}
        >
          <Image
            source={require("../assets/images/Cart.png")}
            style={styles.menuCartIcon}
          />
        </TouchableOpacity>

        {/* Order Status */}
        {currentOrder && (
          <TouchableOpacity
            style={styles.menuStatusButton}
            onPress={() => router.push("/OrderStatus")}
          >
            <Text style={styles.menuStatusBtnText}>
              {timeLeft !== null
                ? `Check Order Status (${timeLeft} min left)`
                : "Check Order Status"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </GestureHandlerRootView>
  );
}
