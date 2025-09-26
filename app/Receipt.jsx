import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import styles from "./src/style"; 

export default function Receipt() {
  const router = useRouter();
  const { items, amount, paymentMethod, date, refNo } = useLocalSearchParams();

  // ✅ Parse items safely
  const parsedItems = items ? JSON.parse(items) : [];

  return (
    <View style={styles.receiptContainer}>
      {/* Header */}
      <View style={styles.receiptHeader}>
        <TouchableOpacity onPress={() => router.push("/Menu")}>
          <Ionicons name="close" size={28} color="#FFD700" />
        </TouchableOpacity>
        <Text style={styles.receiptHeaderText}>RECEIPT</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.receiptCardContainer}>
        {/* Circle check */}
        <View style={styles.receiptCircle}>
          <Ionicons name="checkmark" size={32} color="#2c3e91" />
        </View>

        {/* Card */}
        <View style={styles.receiptCard}>
          <Text style={styles.receiptStoreName}>Food Stall</Text>
          <Text style={styles.receiptPaymentMethod}>
            Paid Via {paymentMethod}
          </Text>

          {/* Items */}
          {parsedItems.map((item, index) => (
            <View style={styles.receiptItemRow} key={index}>
              <Text style={styles.receiptItemText}>
                {item.name}
              </Text>
              <Text style={styles.receiptItemPrice}>
                ₱{item.price * item.quantity}
              </Text>
            </View>
          ))}

          <View style={styles.receiptSeparator} />

          {/* Total */}
          <View style={styles.receiptItemRow}>
            <Text style={[styles.receiptItemText, { fontWeight: "bold" }]}>
              Amount
            </Text>
            <Text style={[styles.receiptItemPrice, { fontWeight: "bold" }]}>
              ₱{amount}
            </Text>
          </View>

          <View style={styles.receiptSeparator} />

          {/* Date */}
          <View style={styles.receiptInfoBlock}>
            <Text style={styles.receiptLabel}>Date of Transaction</Text>
            <Text style={styles.receiptValue}>{date}</Text>
          </View>

          {/* Ref No */}
          <View style={styles.receiptInfoBlock}>
            <Text style={styles.receiptLabel}>Ref No.</Text>
            <Text style={styles.receiptValue}>{refNo}</Text>
          </View>
        </View>

        {/* Download button */}
        <TouchableOpacity style={styles.receiptDownloadBtn}>
          <Ionicons name="download-outline" size={20} color="#FFD700" />
          <Text style={styles.receiptDownloadText}>Download</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
