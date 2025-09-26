import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles, { COLORS } from "./src/style"; // import both styles + COLORS

export default function Settings() {
  const router = useRouter();

  return (
    <View style={styles.settingsContainer}>
      {/* Header */}
      <View style={styles.settingsHeader}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.accent} />
          </TouchableOpacity>
          <Text style={styles.settingsTitle}>Settings</Text>
        </View>
      </View>

      {/* Settings Options */}
      <View style={styles.optionsContainer}>
        {/* Profile Option with Logo */}
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => router.push("/Profile")}
        >
          <Image
            source={require("../assets/images/Profile.png")}
            style={styles.optionLogo}
          />
          <Text style={styles.optionText}>Profile</Text>
        </TouchableOpacity>

        {/* About Option */}
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => router.push("/About")}
        >
          <Ionicons
            name="information-circle-outline"
            size={22}
            color={COLORS.primary}
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>About App</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => router.push("/Login")}
      >
        <Text style={styles.logoutText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}
