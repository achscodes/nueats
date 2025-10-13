import React, { createContext, useState } from "react";

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orderStartTime, setOrderStartTime] = useState(null);
  const [prepTime, setPrepTime] = useState(0);
  const [orderHistory, setOrderHistory] = useState([]); // Track order numbers

  // Generate unique order number
  const generateUniqueOrderNumber = (orderTime = new Date()) => {
    const year = orderTime.getFullYear();
    const timestamp = orderTime.getTime();

    // Create a unique 3-digit number using timestamp and random component
    const timeComponent = timestamp % 1000; // Last 3 digits of timestamp
    const randomComponent = Math.floor(Math.random() * 100); // 0-99

    // Combine and ensure 3 digits
    const uniqueNumber = String(timeComponent + randomComponent)
      .padStart(3, "0")
      .slice(-3);

    const orderNumber = `NU-${year}-${uniqueNumber}`;

    // Check if this number already exists (very unlikely but just in case)
    const exists = orderHistory.some(
      (order) => order.orderNumber === orderNumber
    );

    if (exists) {
      // If by rare chance it exists, recursively try again
      return generateUniqueOrderNumber(new Date(orderTime.getTime() + 1));
    }

    return orderNumber;
  };

  // Create or update current order with complete data
  const createOrder = (orderData) => {
    // Generate unique order number if not provided
    const orderTime = new Date(orderData.time || new Date().toISOString());
    const orderNumber =
      orderData.orderNumber || generateUniqueOrderNumber(orderTime);

    const order = {
      id: orderData.id || Date.now().toString(),
      items: orderData.items || [],
      total: orderData.total || 0,
      payment: orderData.payment || "Cash",
      status: orderData.status || "pending",
      time: orderData.time || new Date().toISOString(),
      prepTime: orderData.prepTime || 15,
      orderNumber: orderNumber,
    };

    setCurrentOrder(order);

    // Add to order history for uniqueness tracking
    setOrderHistory((prev) => {
      const existingIndex = prev.findIndex(
        (o) => o.orderNumber === orderNumber
      );
      if (existingIndex >= 0) {
        // Update existing order
        const updated = [...prev];
        updated[existingIndex] = { ...order };
        return updated;
      } else {
        // Add new order
        return [...prev, { ...order }];
      }
    });

    // Store the original order time for countdown calculations
    setOrderStartTime(orderTime.getTime());
    setPrepTime(order.prepTime * 60); // Convert to seconds

    // If status is "preparing", reset the start time to now for countdown
    if (order.status === "preparing") {
      const now = Date.now();
      setOrderStartTime(now);
    }

    return order;
  };

  // Update order status without losing other data
  const updateOrderStatus = (newStatus) => {
    if (currentOrder) {
      const updatedOrder = {
        ...currentOrder,
        status: newStatus,
      };

      setCurrentOrder(updatedOrder);

      // Update in history as well
      setOrderHistory((prev) =>
        prev.map((order) =>
          order.orderNumber === updatedOrder.orderNumber
            ? { ...updatedOrder }
            : order
        )
      );
    }
  };

  // Clear current order when completed/cancelled
  const clearOrder = () => {
    setCurrentOrder(null);
    setOrderStartTime(null);
    setPrepTime(0);
  };

  // Get time remaining based on original order time and status
  const getTimeRemaining = () => {
    if (!orderStartTime || !prepTime || !currentOrder) {
      return 0;
    }

    // Only start timer when status is "preparing"
    if (currentOrder.status !== "preparing") {
      return prepTime; // Return full prep time if not preparing yet
    }

    const now = Date.now();
    const elapsed = Math.floor((now - orderStartTime) / 1000); // seconds elapsed
    const remaining = Math.max(prepTime - elapsed, 0);

    return remaining;
  };

  // Calculate estimated ready time
  const getEstimatedReadyTime = () => {
    if (!orderStartTime || !prepTime) return null;

    return new Date(orderStartTime + prepTime * 1000);
  };

  // Compute preparation minutes consistently across the app
  // Uses the maximum per-item prep time, plus a constant 5-minute buffer
  const computePrepMinutes = (items) => {
    const safeItems = Array.isArray(items) ? items : [];
    if (safeItems.length === 0) return 15;
    const maxItemMinutes = Math.max(
      ...safeItems.map((it) => Number(it?.prep_time || 15))
    );
    const bufferMinutes = 5;
    return maxItemMinutes + bufferMinutes;
  };

  // Store order from OrderStatus when navigating back
  const storeOrderFromStatus = (orderParams) => {
    try {
      const orderItems =
        typeof orderParams.items === "string"
          ? JSON.parse(decodeURIComponent(orderParams.items))
          : orderParams.items || [];

      // Calculate prep time from items using unified logic
      const maxPrepTime = computePrepMinutes(orderItems);

      const orderData = {
        id: orderParams.id,
        items: orderItems,
        total: parseFloat(orderParams.total || 0),
        payment: orderParams.payment || "Cash",
        status: orderParams.status || "pending",
        time: orderParams.time || new Date().toISOString(),
        prepTime: maxPrepTime,
        orderNumber: orderParams.orderNumber, // Preserve existing order number
      };

      return createOrder(orderData);
    } catch (error) {
      console.error("Error storing order from status:", error);
      return null;
    }
  };

  // Get order by order number
  const getOrderByNumber = (orderNumber) => {
    return orderHistory.find((order) => order.orderNumber === orderNumber);
  };

  // Get all orders
  const getAllOrders = () => {
    return orderHistory;
  };

  const value = {
    // State
    currentOrder,
    orderStartTime,
    prepTime,
    orderHistory,

    // Actions
    setCurrentOrder,
    createOrder,
    updateOrderStatus,
    clearOrder,
    storeOrderFromStatus,
    generateUniqueOrderNumber,

    // Getters
    getTimeRemaining,
    getEstimatedReadyTime,
    getOrderByNumber,
    getAllOrders,
    computePrepMinutes,

    // Legacy props for backward compatibility
    setOrderStartTime,
    setPrepTime,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export default OrderProvider;
