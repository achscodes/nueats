import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
  Animated,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OrderContext } from "./context/OrderContext";
// Import React Icons equivalent - using Ionicons from Expo
import { Ionicons } from "@expo/vector-icons";
// Import styles and demo data
import styles from "./src/Menu.js";
import {
  getMenuItems,
  getCategories,
  getFeaturedItems,
  MENU_ITEMS,
} from "./demodata/menuDemoData.js";

const { height, width } = Dimensions.get("window");

export default function Menu() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [isGridLayout, setIsGridLayout] = useState(false); // New state for layout toggle

  const { orderStartTime, prepTime, currentOrder } = useContext(OrderContext);

  // Simulate database fetch on component mount
  useEffect(() => {
    const loadMenuData = async () => {
      setIsLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      try {
        const categoriesData = getCategories();
        const itemsData = getMenuItems(selectedCategory, searchText);

        setCategories(categoriesData);
        setMenuItems(itemsData);

        // Fade in animation
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      } catch (error) {
        console.error("Error loading menu data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMenuData();
  }, [selectedCategory, searchText]);

  // Filter items based on category and search
  useEffect(() => {
    const filteredItems = getMenuItems(selectedCategory, searchText);
    setMenuItems(filteredItems);
  }, [selectedCategory, searchText]);

  // Fix countdown calculation
  const getTimeLeft = () => {
    if (!orderStartTime) return null;
    const elapsed = Math.floor((Date.now() - orderStartTime) / 1000); // seconds
    return Math.max(prepTime - elapsed, 0);
  };

  const timeLeft = getTimeLeft();

  // Navigate to order page with params
  const handleFoodPress = (item) => {
    router.push({
      pathname: "/Order",
      params: {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price.toString(),
        image: item.image,
        category: item.category,
      },
    });
  };

  // Handle category filter selection
  const handleCategoryPress = (categorySlug) => {
    setSelectedCategory(categorySlug);
  };

  // Toggle layout view
  const toggleLayout = () => {
    setIsGridLayout(!isGridLayout);
  };

  // Format price in Philippine Peso
  const formatPrice = (price) => {
    return `₱${price.toFixed(0)}`;
  };

  // Render category filter buttons
  const renderCategoryFilters = () => (
    <View style={styles.menuFilterContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.menuFilterScroll}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.menuFilterButton,
              selectedCategory === category.slug &&
                styles.menuFilterButtonActive,
            ]}
            onPress={() => handleCategoryPress(category.slug)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.menuFilterText,
                selectedCategory === category.slug &&
                  styles.menuFilterTextActive,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  // Render food item for list layout
  const renderListItem = ({ item, index }) => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
          },
        ],
      }}
    >
      <TouchableOpacity
        onPress={() => handleFoodPress(item)}
        activeOpacity={0.8}
        style={styles.menuFoodItem}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.menuFoodImage}
          resizeMode="cover"
        />
        <View style={styles.menuFoodContent}>
          <Text style={styles.menuFoodName}>{item.name}</Text>
          <Text style={styles.menuFoodDesc} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={styles.menuFoodCategory}>{item.category}</Text>
        </View>
        <View style={styles.menuFoodPrice}>
          <Text style={styles.menuFoodPriceText}>
            {formatPrice(item.price)}
          </Text>
          <Text style={styles.menuFoodCurrency}>PHP</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  // Render food item for grid layout
  const renderGridItem = ({ item, index }) => (
    <Animated.View
      style={[
        styles.menuGridItem,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => handleFoodPress(item)}
        activeOpacity={0.8}
        style={styles.menuGridItemContent}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.menuGridImage}
          resizeMode="cover"
        />
        <View style={styles.menuGridContent}>
          <Text style={styles.menuGridName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.menuGridDesc} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.menuGridFooter}>
            <Text style={styles.menuGridCategory}>{item.category}</Text>
            <Text style={styles.menuGridPrice}>{formatPrice(item.price)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  // Render empty state
  const renderEmptyState = () => (
    <View style={styles.menuEmptyContainer}>
      <Ionicons
        name="restaurant-outline"
        size={60}
        color="#ccc"
        style={styles.menuEmptyIcon}
      />
      <Text style={styles.menuEmptyText}>
        {searchText
          ? `No results found for "${searchText}"`
          : "No items available"}
      </Text>
      {searchText && (
        <TouchableOpacity
          onPress={() => setSearchText("")}
          style={{ marginTop: 10 }}
        >
          <Text style={{ color: styles.primary, fontWeight: "bold" }}>
            Clear search
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  // Loading component
  const renderLoading = () => (
    <View style={styles.menuLoadingContainer}>
      <ActivityIndicator size="large" color={styles.primary} />
      <Text style={styles.menuLoadingText}>Loading delicious menu...</Text>
    </View>
  );

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
            activeOpacity={0.7}
          >
            <Ionicons name="settings-outline" size={24} color="#FFD700" />
          </TouchableOpacity>
        </View>

        {/* Welcome */}
        <Text style={styles.menuWelcome}>Welcome!</Text>
        <Text style={styles.menuSubText}>Let's order your Food!</Text>

        {/* Search Bar */}
        <View style={styles.menuSearchContainer}>
          <View style={styles.menuSearchBar}>
            <Ionicons
              name="search-outline"
              size={20}
              color="#999"
              style={styles.menuSearchIcon}
            />
            <TextInput
              placeholder="Search delicious food..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
              style={styles.menuSearchInput}
              returnKeyType="search"
            />
            {searchText.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchText("")}
                style={{ marginLeft: 8 }}
              >
                <Ionicons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Category Filters */}
        {renderCategoryFilters()}

        {/* Today's Offer Header with Toggle */}
        <View style={styles.menuOfferHeader}>
          <Text style={styles.menuOfferTitle}>
            {selectedCategory === "all"
              ? "TODAY'S MENU"
              : `${selectedCategory.toUpperCase()}`}
          </Text>
          <View style={styles.menuLayoutToggle}>
            <TouchableOpacity
              onPress={toggleLayout}
              style={[
                styles.menuToggleButton,
                !isGridLayout && styles.menuToggleButtonActive,
              ]}
              activeOpacity={0.7}
            >
              <Ionicons
                name="list"
                size={18}
                color={!isGridLayout ? "#ffffff" : "#666666"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleLayout}
              style={[
                styles.menuToggleButton,
                isGridLayout && styles.menuToggleButtonActive,
              ]}
              activeOpacity={0.7}
            >
              <Ionicons
                name="grid"
                size={18}
                color={isGridLayout ? "#ffffff" : "#666666"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items List */}
        {isLoading ? (
          renderLoading()
        ) : (
          <FlatList
            data={menuItems}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: height * 0.25 }}
            renderItem={isGridLayout ? renderGridItem : renderListItem}
            numColumns={isGridLayout ? 2 : 1}
            key={isGridLayout ? "grid" : "list"} // Force re-render when layout changes
            columnWrapperStyle={isGridLayout ? styles.menuGridRow : null}
            ListEmptyComponent={renderEmptyState}
            showsVerticalScrollIndicator={false}
            initialNumToRender={6}
            maxToRenderPerBatch={8}
            windowSize={10}
            removeClippedSubviews={true}
          />
        )}

        {/* Floating Cart Button */}
        <TouchableOpacity
          style={styles.menuCartButton}
          onPress={() => router.push("/Cart")}
          activeOpacity={0.8}
        >
          <Ionicons name="cart-outline" size={24} color="#ffffff" />
        </TouchableOpacity>

        {/* Order Status Button */}
        {currentOrder && (
          <TouchableOpacity
            style={styles.menuStatusButton}
            onPress={() => router.push("/OrderStatus")}
            activeOpacity={0.9}
          >
            <Text style={styles.menuStatusBtnText}>
              {timeLeft !== null
                ? `Check Order Status (${Math.ceil(timeLeft / 60)} min left)`
                : "Check Order Status"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </GestureHandlerRootView>
  );
}
