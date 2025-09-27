import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "./context/AuthContext"; // Import auth context
import settingsStyles, { SETTINGS_COLORS } from "./src/Setting.js"; // Import dedicated settings styles
import { demoHelpers, userProfileManager } from "./demodata/profileDemoData.js"; // Import user profile manager

export default function Settings() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user, logout, isGuest } = useAuth(); // Get auth state

  // State for user data and notifications
  const [currentUser, setCurrentUser] = useState(null);
  const [notifications, setNotifications] = useState(true);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  // Load user data on component mount
  useEffect(() => {
    loadUserData();
  }, [params.userId]);

  const loadUserData = () => {
    try {
      if (params.userId) {
        // Load user data using the userId from params
        const userData = demoHelpers.getUserById(params.userId);
        if (userData) {
          // Add preferences if not exists
          const userWithPreferences = {
            ...userData,
            preferences: userData.preferences || { notifications: true },
          };
          setCurrentUser(userWithPreferences);
          setNotifications(
            userWithPreferences.preferences?.notifications ?? true
          );
        } else {
          showMessage("User not found", "error");
        }
      } else {
        showMessage("No user ID provided", "error");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      showMessage("Failed to load user data", "error");
    }
  };

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleUpdateNotifications = (value) => {
    if (!currentUser) return;

    // Update local state immediately for better UX
    setNotifications(value);

    // Update in demo data
    const result = userProfileManager.updateUserPreferences(currentUser.id, {
      notifications: value,
    });

    if (result.success) {
      setCurrentUser((prevUser) => ({
        ...prevUser,
        preferences: result.preferences,
      }));
      showMessage("Notification settings updated successfully", "success");
    } else {
      // Revert if update failed
      setNotifications(!value);
      showMessage(result.message, "error");
    }
  };

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
            // Use auth context logout
            logout();
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

  // Redirect if guest user tries to access settings directly
  useEffect(() => {
    if (isGuest && !currentUser) {
      Alert.alert(
        "Authentication Required",
        "You need to be logged in to access settings.",
        [
          {
            text: "Login",
            onPress: () => router.replace("/Login"),
          },
          {
            text: "Back",
            onPress: () => router.back(),
            style: "cancel",
          },
        ]
      );
    }
  }, [isGuest, currentUser]);

  // Show loading or authentication required state
  if (!currentUser) {
    return (
      <View
        style={[
          settingsStyles.settingsContainer,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Ionicons name="person-outline" size={60} color="#ccc" />
        <Text style={{ color: "#666", fontSize: 16, marginTop: 10 }}>
          {isGuest ? "Authentication Required" : "Loading user data..."}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: SETTINGS_COLORS.primary,
            padding: 12,
            borderRadius: 8,
            marginTop: 20,
          }}
          onPress={() => router.back()}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

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

      {/* Success/Error Message */}
      {message && (
        <View
          style={[
            settingsStyles.messageContainer,
            messageType === "success"
              ? settingsStyles.successMessage
              : settingsStyles.errorMessage,
          ]}
        >
          <Text
            style={[
              settingsStyles.messageText,
              messageType === "success"
                ? settingsStyles.successMessageText
                : settingsStyles.errorMessageText,
            ]}
          >
            {message}
          </Text>
        </View>
      )}

      {/* Settings Options */}
      <View style={settingsStyles.optionsContainer}>
        {/* Profile Option with Logo */}
        <TouchableOpacity
          style={settingsStyles.optionCard}
          onPress={() =>
            router.push({
              pathname: "/Profile",
              params: { userId: params.userId || currentUser?.id },
            })
          }
        >
          <Image
            source={require("../assets/images/Profile.png")}
            style={settingsStyles.optionLogo}
          />
          <Text style={settingsStyles.optionText}>Profile</Text>
        </TouchableOpacity>

        {/* Push Notifications Option with Switch */}
        <View style={settingsStyles.notificationCard}>
          <View style={settingsStyles.notificationContent}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={SETTINGS_COLORS.primary}
              style={settingsStyles.optionIcon}
            />
            <Text style={settingsStyles.optionText}>Push Notifications</Text>
          </View>

          <Switch
            trackColor={{ false: "#ccc", true: SETTINGS_COLORS.accent }}
            thumbColor="#fff"
            onValueChange={handleUpdateNotifications}
            value={notifications}
            style={settingsStyles.customSwitch}
          />
        </View>

        {/* Help & Support Option */}
        <TouchableOpacity
          style={settingsStyles.optionCard}
          onPress={() =>
            router.push({
              pathname: "/HelpSupport",
              params: { userId: params.userId || currentUser?.id },
            })
          }
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
