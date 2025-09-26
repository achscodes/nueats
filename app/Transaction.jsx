import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { useRouter } from "expo-router";
import styles from "./src/style.jsx"; // ✅ import centralized styles

export default function Transactions() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // later you can load saved orders here
  }, []);

  const handleReorder = (item) => {
    // ✅ Pass the entire order as reorderItems
    router.push({
      pathname: "/Checkout",
      params: {
        reorderItems: encodeURIComponent(JSON.stringify([item])),
      },
    });
  };

  const addOrder = (newItem) => {
    const newOrders = [...orders, newItem];
    setOrders(newOrders);
  };

  return (
    <View style={styles.transactionContainer}>
      {/* Header */}
      <View style={styles.transactionHeader}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.transactionTitle}>TRANSACTIONS</Text>
      </View>

      {/* History */}
      <Text style={styles.historyTitle}>History</Text>

      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.transactionCard}>
            <View style={styles.row}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.textRow}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.price}>₱{item.price}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.reorderButton}
              onPress={() => handleReorder(item)}
            >
              <Text style={styles.reorderText}>REORDER</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Demo button */}
      <TouchableOpacity
        style={styles.demoButton}
        onPress={() =>
          addOrder({
            id: Date.now().toString(), // ✅ add ID for consistency
            name: "Chicken Adobo",
            price: 65,
            image:
              "https://cdn.tasteatlas.com//images/dishes/d42d02f1a62a4f639fc3f3a01b0467a5.jpg",
            quantity: 1,
          })
        }
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Add Demo Order
        </Text>
      </TouchableOpacity>
    </View>
  );
}
