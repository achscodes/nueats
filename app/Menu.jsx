import React, { useState, useContext, useEffect, useRef } from "react";
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
  Modal,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OrderContext } from "./context/OrderContext";
import { useAuth } from "./context/AuthContext"; // Import auth context
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
import { demoHelpers } from "./demodata/profileDemoData.js";

const { height, width } = Dimensions.get("window");

export default function Menu() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [isGridLayout, setIsGridLayout] = useState(false); // New state for layout toggle
  const [guestModalVisible, setGuestModalVisible] = useState(false); // Guest mode modal
  const [currentUser, setCurrentUser] = useState(null); // User data from demo

  // Animation for sliding notification
  const [loginNotificationAnim] = useState(new Animated.Value(-100)); // Start above screen
  const [loginNotificationOpacity] = useState(new Animated.Value(0));
  const [showLoginNotification, setShowLoginNotification] = useState(false);

  // Animation for coming from OrderStatus
  const [slideUpAnim] = useState(new Animated.Value(0));

  // Use the updated OrderContext
  const { currentOrder, getTimeRemaining, storeOrderFromStatus, clearOrder } =
    useContext(OrderContext);

  const { isGuest, getUserFirstName, user, logout } = useAuth(); // Get auth state

  // Handle focus effect for navigation from OrderStatus
  useFocusEffect(
    React.useCallback(() => {
      // Check if coming from OrderStatus page
      if (params.fromOrderStatus === "true") {
        // Restore order from params if not already in context
        if (params.orderId && !currentOrder) {
          const orderParams = {
            id: params.orderId,
            status: params.orderStatus,
            time: params.orderTime,
            items: params.orderItems,
            total: params.orderTotal,
            payment: params.paymentMethod,
            orderNumber: params.orderNumber, // Preserve the order number
          };
          storeOrderFromStatus(orderParams);
        }

        // Start animation from bottom
        slideUpAnim.setValue(1);
        Animated.timing(slideUpAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start();

        // Clear the parameters to prevent re-triggering
        router.setParams({
          fromOrderStatus: undefined,
          orderId: undefined,
          orderStatus: undefined,
          orderTime: undefined,
          orderItems: undefined,
          orderTotal: undefined,
          paymentMethod: undefined,
          orderNumber: undefined, // Clear this too
        });
      }
    }, [params.fromOrderStatus])
  );

  // Fetch user data on component mount
  useEffect(() => {
    if (params.userId && !isGuest) {
      const userData = demoHelpers.getUserById(params.userId);
      if (userData) {
        setCurrentUser(userData);
        setShowLoginNotification(true);

        // Trigger sliding animation
        Animated.parallel([
          Animated.timing(loginNotificationAnim, {
            toValue: 0, // Slide to position
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(loginNotificationOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();

        // Auto hide after 5 seconds
        const hideTimer = setTimeout(() => {
          Animated.parallel([
            Animated.timing(loginNotificationOpacity, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(loginNotificationAnim, {
              toValue: -100,
              duration: 500,
              useNativeDriver: true,
            }),
          ]).start(() => {
            setShowLoginNotification(false);
          });
        }, 5000);

        return () => clearTimeout(hideTimer);
      }
    }
  }, [params.userId, isGuest]);

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

  // Get time left using the updated context method
  const getTimeLeft = () => {
    if (!currentOrder) return null;
    return getTimeRemaining();
  };

  const timeLeft = getTimeLeft();

  // Navigate to order page with params and auth status
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
        isGuest: isGuest.toString(),
        userId: currentUser?.id || user?.id || "",
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

  // Handle settings press with guest mode check
  const handleSettingsPress = () => {
    if (isGuest) {
      setGuestModalVisible(true);
    } else {
      // Always pass the userId from currentUser or fallback to user
      const userIdToPass = currentUser?.id || user?.id || "";
      router.push({
        pathname: "/Setting",
        params: {
          userId: userIdToPass,
          userName: currentUser?.name || user?.name || "",
          userEmail: currentUser?.email || user?.email || "",
        },
      });
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

  // Handle user profile press (show menu with logout option)
  const handleUserPress = () => {
    if (!isGuest && currentUser) {
      // Create a simple action sheet alternative
      Alert.alert(`Hello, ${currentUser.name}!`, "What would you like to do?", [
        { text: "View Profile", onPress: () => router.push("/Profile") },
        {
          text: "Order History",
          onPress: () => router.push("/OrderHistory"),
        },
        { text: "Logout", onPress: logout, style: "destructive" },
        { text: "Cancel", style: "cancel" },
      ]);
    }
  };

  // Handle OrderStatus button press - UPDATED to preserve order number
  const handleOrderStatusPress = () => {
    if (!currentOrder) return;

    router.push({
      pathname: "/OrderStatus",
      params: {
        id: currentOrder.id,
        time: currentOrder.time,
        status: currentOrder.status,
        items: encodeURIComponent(JSON.stringify(currentOrder.items)),
        total: currentOrder.total.toString(),
        payment: currentOrder.payment,
        orderNumber: currentOrder.orderNumber, // IMPORTANT: Pass the existing order number
      },
    });
  };

  // Get display name
  const getDisplayName = () => {
    if (isGuest) return "Guest";
    if (currentUser) return currentUser.name.split(" ")[0]; // First name only
    return getUserFirstName();
  };

  // Get full display name for notification
  const getFullDisplayName = () => {
    if (currentUser) return currentUser.name;
    return user?.name || "User";
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

  // Guest Mode Modal
  const renderGuestModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={guestModalVisible}
      onRequestClose={() => setGuestModalVisible(false)}
    >
      <View style={styles.menuModalOverlay}>
        <View style={styles.menuModalContainer}>
          <View style={styles.menuModalHeader}>
            <Ionicons name="person-outline" size={50} color="#FFD700" />
            <Text style={styles.menuModalTitle}>Guest Mode</Text>
          </View>

          <Text style={styles.menuModalText}>
            You are currently browsing in guest mode. To access settings and all
            features, please create an account. If you already have an account,
            please log in.
          </Text>

          <View style={styles.menuModalButtons}>
            <TouchableOpacity
              style={styles.menuModalLoginButton}
              onPress={handleLoginPress}
              activeOpacity={0.8}
            >
              <Text style={styles.menuModalLoginText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuModalSignUpButton}
              onPress={handleSignUpPress}
              activeOpacity={0.8}
            >
              <Text style={styles.menuModalSignUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.menuModalCloseButton}
            onPress={() => setGuestModalVisible(false)}
            activeOpacity={0.8}
          >
            <Text style={styles.menuModalCloseText}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Render login notification
  const renderLoginNotification = () =>
    showLoginNotification && (
      <Animated.View
        style={[
          styles.menuLoginNotification,
          {
            transform: [{ translateY: loginNotificationAnim }],
            opacity: loginNotificationOpacity,
          },
        ]}
      >
        <View style={styles.menuLoginNotificationContent}>
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          <Text style={styles.menuLoginNotificationText}>
            Logged in as {getFullDisplayName()}
          </Text>
        </View>
      </Animated.View>
    );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View
        style={[
          styles.menuContainer,
          {
            transform: [
              {
                translateY: slideUpAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, height * 0.3], // Start from 30% down the screen
                }),
              },
            ],
          },
        ]}
      >
        {/* Header */}
        <View style={styles.menuHeader}>
          <Image
            source={require("../assets/images/NuEatsLogov3.png")}
            style={styles.menuLogo}
          />
          <View style={styles.menuHeaderRight}>
            <Text style={styles.menuGuestText}>{getDisplayName()}</Text>
            <TouchableOpacity
              onPress={handleSettingsPress}
              style={styles.menuSettingsWrapper}
              activeOpacity={0.7}
            >
              <Ionicons name="settings-outline" size={24} color="#FFD700" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Notification - Slides from under header */}
        {renderLoginNotification()}

        {/* Welcome */}
        <Text style={styles.menuWelcome}>
          Welcome{!isGuest ? `, ${getDisplayName()}` : ""}!
        </Text>
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

        {/* Order Status Button - Updated with live countdown */}
        {currentOrder && (
          <TouchableOpacity
            style={styles.menuStatusButton}
            onPress={handleOrderStatusPress}
            activeOpacity={0.9}
          >
            <Text style={styles.menuStatusBtnText}>
              {timeLeft !== null && timeLeft > 0
                ? `Check Order Status (${Math.ceil(timeLeft / 60)} min left)`
                : currentOrder.status === "ready"
                ? "Order Ready - Check Status"
                : currentOrder.status === "received"
                ? "Order Completed"
                : currentOrder.status === "cancelled"
                ? "Order Cancelled"
                : "Check Order Status"}
            </Text>
          </TouchableOpacity>
        )}

        {/* Guest Mode Modal */}
        {renderGuestModal()}
      </Animated.View>
    </GestureHandlerRootView>
  );
}
