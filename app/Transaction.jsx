import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "expo-router";
import transactionStyles from "./src/Transaction.js";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { supabase } from "../lib/supabase";
import { useAuth } from "./context/AuthContext";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Transactions = () => {
  const router = useRouter();
  const { user, isGuest } = useAuth();

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  // Rating state
  const [orderRating, setOrderRating] = useState(null);
  const [isRatingMode, setIsRatingMode] = useState(false);
  const [ratingStars, setRatingStars] = useState(0);
  const [ratingFeedback, setRatingFeedback] = useState("");
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  
  // Scroll ref for modal
  const modalScrollRef = useRef(null);

  // Filter dropdowns
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [paymentDropdownOpen, setPaymentDropdownOpen] = useState(false);

  // Animated values for dropdowns
  const sortAnim = useRef(new Animated.Value(0)).current;
  const statusAnim = useRef(new Animated.Value(0)).current;
  const paymentAnim = useRef(new Animated.Value(0)).current;

  // Animation helpers
  const animateDropdown = (anim, open) => {
    Animated.timing(anim, {
      toValue: open ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  };
  const [sortOrder, setSortOrder] = useState("Newest to Oldest");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");

  // Fetch orders from database
  useFocusEffect(
    React.useCallback(() => {
      const fetchOrders = async () => {
        try {
          setIsLoading(true);
          
          if (!user?.id || isGuest) {
            setOrders([]);
            setIsLoading(false);
            return;
          }

          // Fetch orders with order items
          const { data: ordersData, error: ordersError } = await supabase
            .from("orders")
            .select(`
              order_id,
              total_amount,
              payment_method,
              status,
              created_at,
              order_items (
                quantity,
                price,
                menu_items:product_id (
                  id,
                  name,
                  image
                )
              )
            `)
            .eq("user_id", user.id)
            .in("status", ["Pending", "Preparing", "Ready", "Completed", "Cancelled"])
            .order("created_at", { ascending: false });

          if (ordersError) throw ordersError;

          // Transform data to match expected format
          const transformedOrders = (ordersData || []).map((order) => ({
            id: order.order_id,
            orderNumber: `NU-2025-${order.order_id.toString().slice(-6)}`,
            date: new Date(order.created_at).toLocaleDateString(),
            dateTime: order.created_at,
            total: order.total_amount,
            status: order.status,
            paymentMethod: order.payment_method,
            items: (order.order_items || []).map((item) => ({
              name: item.menu_items?.name || "Unknown Item",
              quantity: item.quantity,
              price: Number(item.price),
              image: item.menu_items?.image || "",
            })),
          }));

          setOrders(transformedOrders);
        } catch (error) {
          console.error("Error fetching orders:", error);
          setOrders([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchOrders();
    }, [user?.id, isGuest])
  );

  // Unique values for dropdowns
  const uniqueStatuses = [
    "All",
    "Pending",
    "Preparing",
    "Ready",
    "Completed",
    "Cancelled",
  ];
  const uniquePayments = [
    "All",
    "Cash",
    "Paymongo",
  ];

  // Filtering and sorting logic
  let filteredOrders = [...orders];
  if (statusFilter !== "All") {
    filteredOrders = filteredOrders.filter(
      (order) => order.status === statusFilter
    );
  }
  if (paymentFilter !== "All") {
    filteredOrders = filteredOrders.filter(
      (order) => order.paymentMethod === paymentFilter
    );
  }
  filteredOrders = filteredOrders.sort((a, b) => {
    if (sortOrder === "Newest to Oldest") {
      return new Date(b.dateTime) - new Date(a.dateTime);
    }
    return new Date(a.dateTime) - new Date(b.dateTime);
  });

  // Fetch rating for selected order
  const fetchOrderRating = async (orderId) => {
    try {
      const { data, error } = await supabase
        .from('ratings')
        .select('rating_id, stars, feedback, created_at')
        .eq('order_id', orderId)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        // PGRST116 is "not found" - that's okay
        throw error;
      }
      
      setOrderRating(data || null);
      
      // If rating exists, set the stars and feedback for editing
      if (data) {
        setRatingStars(data.stars);
        setRatingFeedback(data.feedback || '');
      } else {
        setRatingStars(0);
        setRatingFeedback('');
      }
    } catch (error) {
      console.error('Error fetching rating:', error);
      setOrderRating(null);
    }
  };

  // Check if rating is editable (within 30 days)
  const isRatingEditable = (createdAt) => {
    if (!createdAt) return false;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return new Date(createdAt) > thirtyDaysAgo;
  };

  // Submit rating
  const submitRating = async () => {
    if (ratingStars === 0) {
      Alert.alert('Rating Required', 'Please select a star rating.');
      return;
    }

    if (ratingFeedback.trim() === '') {
      Alert.alert('Feedback Required', 'Please provide your feedback.');
      return;
    }

    setIsSubmittingRating(true);
    try {
      const { error } = await supabase
        .from('ratings')
        .insert({
          order_id: selectedOrder.id,
          stars: ratingStars,
          feedback: ratingFeedback.trim(),
        });

      if (error) throw error;

      Alert.alert('Success', 'Thank you for your rating!');
      setIsRatingMode(false);
      await fetchOrderRating(selectedOrder.id); // Refresh rating
    } catch (error) {
      console.error('Error submitting rating:', error);
      Alert.alert('Error', error.message || 'Failed to submit rating');
    } finally {
      setIsSubmittingRating(false);
    }
  };

  // Update rating
  const updateRating = async () => {
    if (ratingStars === 0) {
      Alert.alert('Rating Required', 'Please select a star rating.');
      return;
    }

    if (ratingFeedback.trim() === '') {
      Alert.alert('Feedback Required', 'Please provide your feedback.');
      return;
    }

    setIsSubmittingRating(true);
    try {
      const { error } = await supabase
        .from('ratings')
        .update({
          stars: ratingStars,
          feedback: ratingFeedback.trim(),
        })
        .eq('rating_id', orderRating.rating_id);

      if (error) throw error;

      Alert.alert('Success', 'Rating updated successfully!');
      setIsRatingMode(false);
      await fetchOrderRating(selectedOrder.id); // Refresh rating
    } catch (error) {
      console.error('Error updating rating:', error);
      Alert.alert('Error', error.message || 'Failed to update rating');
    } finally {
      setIsSubmittingRating(false);
    }
  };

  // Handle opening modal
  const handleOrderPress = async (order) => {
    setSelectedOrder(order);
    setIsRatingMode(false);
    
    // Fetch rating if order is completed
    if (order.status === 'Completed') {
      await fetchOrderRating(order.id);
    } else {
      setOrderRating(null);
    }
    
    setModalVisible(true);
  };

  return (
    <View style={transactionStyles.transactionMainContainer}>
      {/* Header */}
      <View style={transactionStyles.transactionPageHeader}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFD700" />
        </TouchableOpacity>
        <Text style={transactionStyles.transactionPageHeaderText}>
          TRANSACTIONS
        </Text>
        <View style={transactionStyles.transactionHeaderSpacer} />
      </View>

      {/* Total Orders and Filter Row */}
      <View style={transactionStyles.transactionFiltersContainer}>
        <Text style={transactionStyles.transactionTotalOrdersText}>
          Total Orders: {filteredOrders.length}
        </Text>
        <View style={transactionStyles.transactionFiltersRow}>
          {/* Sort Dropdown */}
          <View style={transactionStyles.transactionDropdownContainer}>
            <Text style={transactionStyles.transactionDropdownLabel}>Date</Text>
            <TouchableOpacity
              onPress={() => {
                const open = !sortDropdownOpen;
                setSortDropdownOpen(open);
                setStatusDropdownOpen(false);
                setPaymentDropdownOpen(false);
                animateDropdown(sortAnim, open);
                animateDropdown(statusAnim, false);
                animateDropdown(paymentAnim, false);
              }}
              style={transactionStyles.transactionDropdownButtonSort}
              activeOpacity={0.8}
            >
              <Text style={transactionStyles.transactionDropdownButtonText}>
                {sortOrder}
              </Text>
            </TouchableOpacity>
            {sortDropdownOpen && (
              <Animated.View
                pointerEvents={sortDropdownOpen ? "auto" : "none"}
                style={[
                  transactionStyles.transactionDropdownMenu,
                  {
                    opacity: sortAnim,
                    transform: [
                      {
                        translateY: sortAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-10, 0],
                        }),
                      },
                    ],
                    display: sortDropdownOpen ? "flex" : "none",
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSortOrder("Newest to Oldest");
                    setSortDropdownOpen(false);
                    animateDropdown(sortAnim, false);
                  }}
                  style={transactionStyles.transactionDropdownItem}
                >
                  <Text
                    style={[
                      transactionStyles.transactionDropdownItemText,
                      sortOrder === "Newest to Oldest" &&
                        transactionStyles.transactionDropdownItemTextSelected,
                    ]}
                  >
                    Newest to Oldest
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSortOrder("Oldest to Newest");
                    setSortDropdownOpen(false);
                    animateDropdown(sortAnim, false);
                  }}
                  style={transactionStyles.transactionDropdownItemLast}
                >
                  <Text
                    style={[
                      transactionStyles.transactionDropdownItemText,
                      sortOrder === "Oldest to Newest" &&
                        transactionStyles.transactionDropdownItemTextSelected,
                    ]}
                  >
                    Oldest to Newest
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>
          {/* Status Dropdown */}
          <View style={transactionStyles.transactionDropdownContainer}>
            <Text style={transactionStyles.transactionDropdownLabel}>
              Status
            </Text>
            <TouchableOpacity
              onPress={() => {
                const open = !statusDropdownOpen;
                setStatusDropdownOpen(open);
                setSortDropdownOpen(false);
                setPaymentDropdownOpen(false);
                animateDropdown(statusAnim, open);
                animateDropdown(sortAnim, false);
                animateDropdown(paymentAnim, false);
              }}
              style={transactionStyles.transactionDropdownButton}
            >
              <Text style={transactionStyles.transactionDropdownButtonText}>
                {statusFilter}
              </Text>
              <Ionicons
                name={statusDropdownOpen ? "chevron-up" : "chevron-down"}
                size={18}
                color="#FFD700"
              />
            </TouchableOpacity>
            {statusDropdownOpen && (
              <Animated.View
                pointerEvents={statusDropdownOpen ? "auto" : "none"}
                style={[
                  transactionStyles.transactionDropdownMenu,
                  {
                    opacity: statusAnim,
                    transform: [
                      {
                        translateY: statusAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-10, 0],
                        }),
                      },
                    ],
                    display: statusDropdownOpen ? "flex" : "none",
                  },
                ]}
              >
                {uniqueStatuses.map((status) => (
                  <TouchableOpacity
                    key={status}
                    onPress={() => {
                      setStatusFilter(status);
                      setStatusDropdownOpen(false);
                      animateDropdown(statusAnim, false);
                    }}
                    style={transactionStyles.transactionDropdownItem}
                  >
                    <Text
                      style={[
                        transactionStyles.transactionDropdownItemText,
                        statusFilter === status &&
                          transactionStyles.transactionDropdownItemTextSelected,
                      ]}
                    >
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </Animated.View>
            )}
          </View>
          {/* Payment Dropdown */}
          <View style={transactionStyles.transactionDropdownContainer}>
            <Text style={transactionStyles.transactionDropdownLabel}>
              Payment
            </Text>
            <TouchableOpacity
              onPress={() => {
                const open = !paymentDropdownOpen;
                setPaymentDropdownOpen(open);
                setSortDropdownOpen(false);
                setStatusDropdownOpen(false);
                animateDropdown(paymentAnim, open);
                animateDropdown(sortAnim, false);
                animateDropdown(statusAnim, false);
              }}
              style={transactionStyles.transactionDropdownButton}
            >
              <Text style={transactionStyles.transactionDropdownButtonText}>
                {paymentFilter}
              </Text>
              <Ionicons
                name={paymentDropdownOpen ? "chevron-up" : "chevron-down"}
                size={18}
                color="#FFD700"
              />
            </TouchableOpacity>
            {paymentDropdownOpen && (
              <Animated.View
                pointerEvents={paymentDropdownOpen ? "auto" : "none"}
                style={[
                  transactionStyles.transactionDropdownMenu,
                  {
                    opacity: paymentAnim,
                    transform: [
                      {
                        translateY: paymentAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-10, 0],
                        }),
                      },
                    ],
                    display: paymentDropdownOpen ? "flex" : "none",
                  },
                ]}
              >
                {uniquePayments.map((payment) => (
                  <TouchableOpacity
                    key={payment}
                    onPress={() => {
                      setPaymentFilter(payment);
                      setPaymentDropdownOpen(false);
                      animateDropdown(paymentAnim, false);
                    }}
                    style={transactionStyles.transactionDropdownItem}
                  >
                    <Text
                      style={[
                        transactionStyles.transactionDropdownItemText,
                        paymentFilter === payment &&
                          transactionStyles.transactionDropdownItemTextSelected,
                      ]}
                    >
                      {payment}
                    </Text>
                  </TouchableOpacity>
                ))}
              </Animated.View>
            )}
          </View>
        </View>
      </View>

      {/* History Title */}
      <Text style={transactionStyles.transactionHistoryTitle}>History</Text>

      {/* Loading State */}
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 50 }}>
          <ActivityIndicator size="large" color="#FFD700" />
          <Text style={{ color: "#666", marginTop: 10 }}>Loading transactions...</Text>
        </View>
      ) : isGuest ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 50 }}>
          <Ionicons name="receipt-outline" size={60} color="#ccc" />
          <Text style={{ color: "#666", marginTop: 10, fontSize: 16 }}>Please log in to view transactions</Text>
        </View>
      ) : filteredOrders.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 50 }}>
          <Ionicons name="receipt-outline" size={60} color="#ccc" />
          <Text style={{ color: "#666", marginTop: 10, fontSize: 16 }}>No transactions found</Text>
        </View>
      ) : (
        /* Orders List */
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={transactionStyles.transactionOrdersList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={transactionStyles.transactionOrderCard}
              onPress={() => handleOrderPress(item)}
            >
              <View style={transactionStyles.transactionOrderHeaderRow}>
                <Text style={transactionStyles.transactionOrderNumber}>
                  {item.orderNumber}
                </Text>
                <Text style={transactionStyles.transactionOrderStatus}>
                  {item.status}
                </Text>
              </View>
              <Text style={transactionStyles.transactionOrderDate}>
                {item.date}
              </Text>
              <View style={transactionStyles.transactionOrderItemsRow}>
                {item.items.slice(0, 5).map((food, idx) => (
                  <Image
                    key={idx}
                    source={{ uri: food.image }}
                    style={transactionStyles.transactionOrderFoodImage}
                  />
                ))}
                {item.items.length > 5 && (
                  <Text style={{ color: "#666", marginLeft: 5 }}>+{item.items.length - 5} more</Text>
                )}
              </View>
              <Text style={transactionStyles.transactionOrderTotal}>
                Total: ₱{parseFloat(item.total).toFixed(2)}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Modal for Order Details */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(false);
          setIsRatingMode(false);
          Keyboard.dismiss();
        }}
      >
        <View style={transactionStyles.transactionModalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <View style={[transactionStyles.transactionModalContainer, { maxHeight: '90%', width: '92%', minWidth: 350, marginHorizontal: 15 }]}>
              {selectedOrder && (
                <ScrollView 
                  ref={modalScrollRef}
                  showsVerticalScrollIndicator={true}
                  contentContainerStyle={{ paddingBottom: 20 }}
                  keyboardShouldPersistTaps="handled"
                >
                <Text style={transactionStyles.transactionModalOrderNumber}>
                  {selectedOrder.orderNumber}
                </Text>
                <Text style={transactionStyles.transactionModalOrderStatus}>
                  {selectedOrder.status}
                </Text>
                <Text style={transactionStyles.transactionModalOrderDate}>
                  {selectedOrder.date}
                </Text>
                <Text style={transactionStyles.transactionModalSectionTitle}>
                  Items
                </Text>
                <View style={{ maxHeight: 200 }}>
                  <ScrollView 
                    showsVerticalScrollIndicator={true}
                    nestedScrollEnabled={true}
                  >
                    {selectedOrder.items.map((food, idx) => (
                    <View
                      key={idx}
                      style={transactionStyles.transactionModalFoodRow}
                    >
                      <Image
                        source={{ uri: food.image }}
                        style={transactionStyles.transactionModalFoodImage}
                      />
                      <View style={transactionStyles.transactionModalFoodDetails}>
                        <Text style={transactionStyles.transactionModalFoodName}>
                          {food.name}
                        </Text>
                        <Text style={transactionStyles.transactionModalFoodQty}>
                          Qty: {food.quantity}
                        </Text>
                      </View>
                      <Text style={transactionStyles.transactionModalFoodPrice}>
                        ₱{parseFloat(food.price).toFixed(2)}
                      </Text>
                    </View>
                    ))}
                  </ScrollView>
                </View>
                <Text style={transactionStyles.transactionModalSectionTitle}>
                  Payment Method
                </Text>
                <Text style={transactionStyles.transactionModalPayment}>
                  {selectedOrder.paymentMethod}
                </Text>
                <Text style={transactionStyles.transactionModalTotal}>
                  Total: ₱{parseFloat(selectedOrder.total).toFixed(2)}
                </Text>

                {/* Rating Section - Only for Completed Orders */}
                {selectedOrder.status === 'Completed' && (
                  <View style={{ marginTop: 15, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#eee' }}>
                    {!isRatingMode ? (
                      // Show existing rating or "Rate" button
                      orderRating ? (
                        <View>
                          <Text style={transactionStyles.transactionModalSectionTitle}>
                            Your Rating
                          </Text>
                          <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Icon
                                key={star}
                                name="star"
                                size={24}
                                color={star <= orderRating.stars ? "#FFCC00" : "gray"}
                                style={{ marginRight: 4 }}
                              />
                            ))}
                          </View>
                          <Text style={{ color: '#666', marginBottom: 10 }}>
                            {orderRating.feedback}
                          </Text>
                          {isRatingEditable(orderRating.created_at) && (
                            <TouchableOpacity
                              style={{
                                backgroundColor: '#2c3e91',
                                padding: 10,
                                borderRadius: 8,
                                alignItems: 'center',
                              }}
                              onPress={() => setIsRatingMode(true)}
                            >
                              <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                Edit Rating
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      ) : (
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#FFD700',
                            padding: 12,
                            borderRadius: 8,
                            alignItems: 'center',
                          }}
                          onPress={() => setIsRatingMode(true)}
                        >
                          <Text style={{ color: '#2c3e91', fontWeight: 'bold', fontSize: 16 }}>
                            RATE THIS ORDER
                          </Text>
                        </TouchableOpacity>
                      )
                    ) : (
                      // Rating form
                      <View>
                        <Text style={transactionStyles.transactionModalSectionTitle}>
                          {orderRating ? 'Edit Your Rating' : 'Rate This Order'}
                        </Text>
                        
                        {/* Stars */}
                        <View style={{ flexDirection: 'row', marginBottom: 15, justifyContent: 'center' }}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <TouchableOpacity key={star} onPress={() => setRatingStars(star)}>
                              <Icon
                                name="star"
                                size={35}
                                color={star <= ratingStars ? "#FFCC00" : "gray"}
                                style={{ marginHorizontal: 4 }}
                              />
                            </TouchableOpacity>
                          ))}
                        </View>

                        {/* Feedback input */}
                        <TextInput
                          style={{
                            borderWidth: 1,
                            borderColor: '#ddd',
                            borderRadius: 8,
                            padding: 10,
                            minHeight: 80,
                            maxHeight: 120,
                            textAlignVertical: 'top',
                            marginBottom: 12,
                            backgroundColor: '#fff',
                          }}
                          placeholder="Leave your feedback..."
                          placeholderTextColor="#999"
                          multiline
                          value={ratingFeedback}
                          onChangeText={setRatingFeedback}
                          numberOfLines={4}
                          returnKeyType="done"
                          blurOnSubmit={true}
                          onFocus={() => {
                            // Scroll to bottom when keyboard opens
                            setTimeout(() => {
                              modalScrollRef.current?.scrollToEnd({ animated: true });
                            }, 300);
                          }}
                        />

                        {/* Buttons */}
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                          <TouchableOpacity
                            style={{
                              flex: 1,
                              backgroundColor: '#ccc',
                              padding: 12,
                              borderRadius: 8,
                              alignItems: 'center',
                            }}
                            onPress={() => {
                              setIsRatingMode(false);
                              if (orderRating) {
                                setRatingStars(orderRating.stars);
                                setRatingFeedback(orderRating.feedback || '');
                              } else {
                                setRatingStars(0);
                                setRatingFeedback('');
                              }
                            }}
                            disabled={isSubmittingRating}
                          >
                            <Text style={{ color: '#333', fontWeight: 'bold' }}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              flex: 1,
                              backgroundColor: '#FFD700',
                              padding: 12,
                              borderRadius: 8,
                              alignItems: 'center',
                            }}
                            onPress={orderRating ? updateRating : submitRating}
                            disabled={isSubmittingRating}
                          >
                            <Text style={{ color: '#2c3e91', fontWeight: 'bold' }}>
                              {isSubmittingRating ? 'Submitting...' : (orderRating ? 'Update' : 'Submit')}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                )}

                </ScrollView>
              )}
              
              {/* Close button - inside white container, top right */}
              <TouchableOpacity
                style={{ 
                  position: 'absolute', 
                  top: 10, 
                  right: 10, 
                  backgroundColor: 'rgba(44, 62, 145, 0.8)', 
                  borderRadius: 20, 
                  width: 36, 
                  height: 36, 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  zIndex: 10
                }}
                onPress={() => {
                  setModalVisible(false);
                  setIsRatingMode(false);
                  Keyboard.dismiss();
                }}
              >
                <Ionicons name="close" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

export default Transactions;
