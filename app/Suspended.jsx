import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Suspended() {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.replace("/Login");
  };

  return (
    <ImageBackground
      source={require("../assets/images/NuEatsBG.png")}
      style={styles.background}
      imageStyle={styles.bgImage}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Logo */}
          <Image
            source={require("../assets/images/NuEatsLogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Suspension Card */}
          <View style={styles.suspensionCard}>
            {/* Icon */}
            <View style={styles.iconContainer}>
              <View style={styles.iconBackground}>
                <Ionicons name="ban" size={64} color="#d32f2f" />
              </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>Account Suspended</Text>

            {/* Message */}
            <Text style={styles.message}>
              Your account has been suspended due to a violation of our terms of
              service or community guidelines.
            </Text>

            <Text style={styles.subMessage}>
              If you believe this is a mistake or would like to appeal this
              decision, please contact our support team at{" "}
              <Text style={styles.emailText}>support@nueats.com</Text>
            </Text>

            {/* Back to Login Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleGoToLogin}
            >
              <Text style={styles.loginButtonText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  bgImage: {
    opacity: 0.3,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
  },
  suspensionCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 32,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ffebee",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#d32f2f",
    textAlign: "center",
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 16,
  },
  subMessage: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  emailText: {
    fontWeight: "bold",
    color: "#2c3e91",
  },
  loginButton: {
    backgroundColor: "#2c3e91",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
