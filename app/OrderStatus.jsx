import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./src/style"; // ⬅ central styles

const { width } = Dimensions.get("window");

export default function OrderStatus() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const {
    id = "1",
    time = new Date().toISOString(),
    status = "pending",
    items = "[]",
    total = "0",
    payment = "Cash",
  } = params;

  // Parse order items safely
  const orderItems = useMemo(() => {
    try {
      const decoded = typeof items === "string" ? decodeURIComponent(items) : items;
      const parsed = typeof decoded === "string" ? JSON.parse(decoded) : decoded;

      if (!Array.isArray(parsed)) return [];

      return parsed.map((item) => ({
        ...item,
        quantity: Number(item.quantity) || 1,
        price: Number(item.price) || 0,
      }));
    } catch {
      return [];
    }
  }, [items]);

  // Parse order time
  const orderTime = useMemo(() => {
    const parsed = Date.parse(time);
    return !isNaN(parsed) ? new Date(parsed) : new Date();
  }, [time]);

  // Compute ETA (5 minutes per item + 2 min queue wait)
  const ITEM_PREP_MINUTES = 5;
  const QUEUE_WAIT_MINUTES = 2;
  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const orderPosition = Number(id) || 1;
  const ETA_MINUTES =
    totalItems * ITEM_PREP_MINUTES + (orderPosition - 1) * QUEUE_WAIT_MINUTES;

  const readyTime = useMemo(
    () => new Date(orderTime.getTime() + ETA_MINUTES * 60000),
    [orderTime, ETA_MINUTES]
  );

  const [remaining, setRemaining] = useState(
    Math.max(0, Math.floor((readyTime - new Date()) / 1000))
  );

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.max(0, Math.floor((readyTime - new Date()) / 1000));
      setRemaining(diff);
    }, 1000);
    return () => clearInterval(interval);
  }, [readyTime]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const isReady = remaining === 0;

  return (
    <View style={styles.orderStatusContainer}>
      {/* Header */}
      <View style={styles.orderStatusHeader}>
        <TouchableOpacity onPress={() => router.back()} style={styles.side}>
          <Ionicons name="arrow-back" size={25} color="#FFD700" />
        </TouchableOpacity>
        <Text style={styles.orderStatusHeaderTitle}>ORDER STATUS</Text>
        <View style={styles.side} />
      </View>

      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View style={styles.orderCard}>
          <Text style={styles.dateText}>
            Ordered on {"\n"}
            {orderTime.toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            at{" "}
            {orderTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>

          <View style={{ alignSelf: "stretch", marginBottom: 15 }}>
            <Text style={styles.sectionTitle}>Ordered Items</Text>
            {orderItems.length > 0 ? (
              orderItems.map((item, index) => (
                <View key={index} style={styles.productRow}>
                  <Image
                    source={{ uri: item.image || "https://via.placeholder.com/50" }}
                    style={styles.foodImage}
                  />
                  <Text style={styles.productText}>
                    {item.quantity}x {item.name} — ₱
                    {(item.quantity * item.price).toFixed(2)}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.noItemsText}>No items found</Text>
            )}
          </View>

          {!isReady ? (
            <>
              <Text style={styles.etaText}>{formatTime(remaining)}</Text>
              <Text style={styles.etaLabel}>Time Remaining</Text>
            </>
          ) : (
            <>
              <Text style={styles.etaText}>READY!</Text>
              <Text style={styles.etaLabel}>You can now pick up your order</Text>
            </>
          )}

          <View style={styles.progress}>
            <View style={styles.step}>
              <View
                style={[styles.dot, !isReady && { backgroundColor: "orange" }]}
              />
              <Text style={styles.stepText}>Your order is being prepared</Text>
            </View>
            <View style={styles.step}>
              <View
                style={[styles.dot, isReady && { backgroundColor: "green" }]}
              />
              <Text style={styles.stepText}>You can now pick up your order</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.dot} />
              <Text style={styles.stepText}>Order has been received</Text>
            </View>
          </View>

          <View style={{ marginTop: 15, alignItems: "center" }}>
            <Text style={styles.paymentText}>Payment Method: {payment}</Text>
            <Text style={styles.totalText}>
              Total: ₱{parseFloat(total).toFixed(2)}
            </Text>
          </View>

          {isReady && (
            <TouchableOpacity
              style={styles.rateBtn}
              onPress={() => router.push("/Feedback")}
            >
              <Text style={styles.rateText}>RATE ORDER</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
