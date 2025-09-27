import React, { useRef, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  BackHandler,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { OrderContext } from "./context/OrderContext";
import receiptStyles from "./src/Receipt.js";

export default function Receipt() {
  const router = useRouter();
  const { items, amount, paymentMethod, date, refNo, orderNumber } =
    useLocalSearchParams();
  const receiptRef = useRef();
  const { clearOrder } = useContext(OrderContext);

  // Use orderNumber if available, fallback to refNo
  const displayOrderNumber = orderNumber || refNo;

  // Parse items safely
  const parsedItems = items ? JSON.parse(items) : [];

  // Handle navigation back to menu and clear order
  const handleBackToMenu = () => {
    clearOrder(); // Clear the order since transaction is complete
    router.push("/Menu");
  };

  // Handle Android hardware back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        handleBackToMenu();
        return true; // Prevent default back behavior
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription?.remove();
    }, [])
  );

  const downloadReceipt = async () => {
    try {
      // Add a small delay to ensure the view is fully rendered
      setTimeout(async () => {
        try {
          // Capture the receipt view as image
          const uri = await captureRef(receiptRef, {
            format: "png",
            quality: 1.0,
            result: "tmpfile",
          });

          // Check if sharing is available
          if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(uri, {
              mimeType: "image/png",
              dialogTitle: "Save Receipt",
              UTI: "public.png",
            });

            Alert.alert(
              "Receipt Ready!",
              "Your receipt is ready to save. Use the share dialog to save it to your photos or preferred location."
            );
          } else {
            Alert.alert(
              "Sharing Not Available",
              "Unable to share receipt on this device."
            );
          }
        } catch (error) {
          console.error("Error downloading receipt:", error);
          Alert.alert(
            "Download Failed",
            "Sorry, we couldn't download your receipt. Please try again."
          );
        }
      }, 100);
    } catch (error) {
      console.error("Error downloading receipt:", error);
      Alert.alert(
        "Download Failed",
        "Sorry, we couldn't download your receipt. Please try again."
      );
    }
  };

  return (
    <View style={receiptStyles.receiptContainer}>
      {/* Header */}
      <View style={receiptStyles.receiptHeader}>
        <TouchableOpacity onPress={handleBackToMenu}>
          <Ionicons name="close" size={28} color="#FFD700" />
        </TouchableOpacity>
        <Text style={receiptStyles.receiptHeaderText}>RECEIPT</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={receiptStyles.receiptCardContainer}>
        {/* Receipt Content Container */}
        <View style={receiptStyles.receiptCaptureArea}>
          {/* This entire view will be captured */}
          <View
            ref={receiptRef}
            style={receiptStyles.receiptCaptureContent}
            collapsable={false}
          >
            {/* Circle check */}
            <View style={receiptStyles.receiptCircle}>
              <Ionicons name="checkmark" size={32} color="#2c3e91" />
            </View>

            {/* Card */}
            <View style={receiptStyles.receiptCard}>
              <Text style={receiptStyles.receiptStoreName}>NUeats</Text>
              <Text style={receiptStyles.receiptPaymentMethod}>
                Paid Via {paymentMethod}
              </Text>

              {/* Items */}
              {parsedItems.map((item, index) => (
                <View style={receiptStyles.receiptItemRow} key={index}>
                  <Text style={receiptStyles.receiptItemText}>{item.name}</Text>
                  <Text style={receiptStyles.receiptItemPrice}>
                    ₱{(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              ))}

              <View style={receiptStyles.receiptSeparator} />

              {/* Total */}
              <View style={receiptStyles.receiptItemRow}>
                <Text
                  style={[
                    receiptStyles.receiptItemText,
                    { fontWeight: "bold" },
                  ]}
                >
                  Amount
                </Text>
                <Text
                  style={[
                    receiptStyles.receiptItemPrice,
                    { fontWeight: "bold" },
                  ]}
                >
                  ₱{amount}
                </Text>
              </View>

              <View style={receiptStyles.receiptSeparator} />

              {/* Date */}
              <View style={receiptStyles.receiptInfoBlock}>
                <Text style={receiptStyles.receiptLabel}>
                  Date of Transaction
                </Text>
                <Text style={receiptStyles.receiptValue}>{date}</Text>
              </View>

              {/* Order Number */}
              <View style={receiptStyles.receiptInfoBlock}>
                <Text style={receiptStyles.receiptLabel}>Order No.</Text>
                <Text style={receiptStyles.receiptValue}>
                  {displayOrderNumber}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Download button - Outside capture area */}
        <TouchableOpacity
          style={receiptStyles.receiptDownloadBtn}
          onPress={downloadReceipt}
        >
          <Ionicons name="download-outline" size={20} color="#FFD700" />
          <Text style={receiptStyles.receiptDownloadText}>Download</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
