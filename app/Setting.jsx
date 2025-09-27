import React from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import settingsStyles, { SETTINGS_COLORS } from "./src/Setting.js"; // Import dedicated settings styles

export default function Settings() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to logout?",
      [
        {
          text: "No",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            // Clear ALL navigation history and reset to Login
            router.dismissAll();
            router.replace("/Login");
          },
          style: "destructive",
        },
      ],
      { cancelable: false } // Prevents dismissing by tapping outside
    );
  };

  return (
    <View style={settingsStyles.settingsContainer}>
      {/* Header */}
      <View style={settingsStyles.settingsHeader}>
        <View style={settingsStyles.headerContent}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={SETTINGS_COLORS.accent}
            />
          </TouchableOpacity>
          <Text style={settingsStyles.settingsTitle}>Settings</Text>
        </View>
      </View>

      {/* Settings Options */}
      <View style={settingsStyles.optionsContainer}>
        {/* Profile Option with Logo */}
        <TouchableOpacity
          style={settingsStyles.optionCard}
          onPress={() => router.push("/Profile")}
        >
          <Image
            source={require("../assets/images/Profile.png")}
            style={settingsStyles.optionLogo}
          />
          <Text style={settingsStyles.optionText}>Profile</Text>
        </TouchableOpacity>

        {/* Notifications Option */}
        <TouchableOpacity
          style={settingsStyles.optionCard}
          onPress={() => router.push("/Notifications")}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color={SETTINGS_COLORS.primary}
            style={settingsStyles.optionIcon}
          />
          <Text style={settingsStyles.optionText}>Notifications</Text>
        </TouchableOpacity>

        {/* Help & Support Option */}
        <TouchableOpacity
          style={settingsStyles.optionCard}
          onPress={() => router.push("/HelpSupport")}
        >
          <Ionicons
            name="help-circle-outline"
            size={24}
            color={SETTINGS_COLORS.primary}
            style={settingsStyles.optionIcon}
          />
          <Text style={settingsStyles.optionText}>Help & Support</Text>
        </TouchableOpacity>

        {/* About Option */}
        <TouchableOpacity
          style={settingsStyles.optionCard}
          onPress={() => router.push("/About")}
        >
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={SETTINGS_COLORS.primary}
            style={settingsStyles.optionIcon}
          />
          <Text style={settingsStyles.optionText}>About App</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button with Confirmation */}
      <TouchableOpacity
        style={settingsStyles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={settingsStyles.logoutText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}
