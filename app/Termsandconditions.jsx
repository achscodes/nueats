import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import termsStyles from "./src/Terms.js"; // ✅ Import dedicated terms styles

export default function Termsandconditions() {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const handleAccept = () => {
    if (!isChecked) {
      Alert.alert(
        "Notice",
        "You must agree to the Terms & Conditions before continuing."
      );
      return;
    }
    router.push("/Signup");
  };

  return (
    <View style={termsStyles.termsContainer}>
      {/* Logo */}
      <Image
        source={require("../assets/images/NuEatsLogo.png")}
        style={termsStyles.termsLogo}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={termsStyles.termsTitle}>Terms and Conditions</Text>

      {/* Card with scrollable text */}
      <View style={termsStyles.termsCard}>
        <ScrollView style={termsStyles.termsScroll}>
          <Text style={termsStyles.termsText}>
            Welcome to NUeats! These Terms and Conditions ("Terms") govern your
            use of our platform and services. By accessing or using NUeats, you
            agree to be bound by these Terms. If you do not agree, please do not
            use our platform.
            {"\n\n"}1. About NUeats{"\n"}
            NUeats is an online food ordering platform exclusively for the
            National University (NU) campus community. Orders made through
            NUeats are pickup-only from participating merchants within the NU
            campus. NUeats does not provide delivery services.
            {"\n\n"}2. Orders and Payments{"\n"}
            Users must ensure that all order details, including items and
            payment information, are accurate before confirming. Payments are
            non-refundable once processed.
            {"\n\n"}3. User Responsibilities{"\n"}
            You agree to use NUeats responsibly and not engage in fraudulent or
            inappropriate activity when placing orders.
            {"\n\n"}4. Admin Rights{"\n"}
            NUeats administrators reserve the right to cancel orders in cases of
            misuse or policy violations.
            {"\n\n"}Continued use of NUeats constitutes acceptance of these
            Terms.
            {"\n\n"}Thank you for using NUeats!
          </Text>
        </ScrollView>

        {/* Checkbox */}
        <View style={termsStyles.termsCheckboxRow}>
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? "#ffeb3b" : undefined}
          />
          <Text style={termsStyles.termsCheckboxText}>
            I have read the Terms and Conditions
          </Text>
        </View>

        {/* Accept Button */}
        <TouchableOpacity
          style={termsStyles.termsAcceptBtn}
          onPress={handleAccept}
        >
          <Text style={termsStyles.termsAcceptText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
