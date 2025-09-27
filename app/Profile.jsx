import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import profileStyles from "./src/Profile.js"; // Make sure path is correct
import { userProfileManager, demoHelpers } from "./demodata/profileDemoData.js"; // Make sure path is correct

export default function ProfileScreen() {
  // State for password visibility toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();

  // State for user data
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // State for editing modes
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // State for profile data
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  // State for modals
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State for messages
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  // Function to get user initials
  const getUserInitials = (fullName) => {
    if (!fullName || typeof fullName !== "string") return "U";

    const names = fullName
      .trim()
      .split(" ")
      .filter((name) => name.length > 0);
    if (names.length === 0) return "U";

    if (names.length === 1) {
      // If only one name, take first two characters
      return names[0].substring(0, 2).toUpperCase();
    } else {
      // If multiple names, take first character of first and last name
      const firstInitial = names[0].charAt(0);
      const lastInitial = names[names.length - 1].charAt(0);
      return (firstInitial + lastInitial).toUpperCase();
    }
  };

  // Load user data on component mount
  useEffect(() => {
    loadUserData();
  }, [params.userId]);

  const loadUserData = () => {
    setLoading(true);
    try {
      if (params.userId) {
        // Load user data using the userId from params
        const userData = demoHelpers.getUserById(params.userId);
        if (userData) {
          // Add any missing properties with defaults
          const completeUserData = {
            ...userData,
            profileImage: userData.profileImage || null,
            preferences: userData.preferences || { notifications: true },
          };

          setUser(completeUserData);

          // Set form data with fallbacks
          setName(completeUserData.name || "");
          setPhone(completeUserData.phone || "");
          setEmail(completeUserData.email || "");
          setProfileImage(completeUserData.profileImage || null);
        } else {
          showMessage("User not found", "error");
        }
      } else {
        // Fallback to current user if no userId provided
        const userData = userProfileManager.getCurrentUser();
        if (userData) {
          setUser(userData);

          // Set form data with fallbacks
          setName(userData.name || "");
          setPhone(userData.phone || "");
          setEmail(userData.email || "");
          setProfileImage(userData.profileImage || null);
        } else {
          showMessage("No user data available", "error");
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      showMessage("Failed to load user data", "error");
    }
    setLoading(false);
  };

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 3000);
  };

  // Request permissions for camera and media library
  const requestPermissions = async () => {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaLibraryStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== "granted" || mediaLibraryStatus !== "granted") {
      Alert.alert(
        "Permissions Required",
        "Camera and photo library permissions are needed to update your profile picture.",
        [{ text: "OK" }]
      );
      return false;
    }
    return true;
  };

  // Handle camera capture
  const handleCameraCapture = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        setProfileImage(imageUri);
        setShowImagePickerModal(false);
        showMessage("Profile picture updated successfully!", "success");
      }
    } catch (error) {
      console.error("Camera error:", error);
      showMessage("Failed to capture photo. Please try again.", "error");
    }
  };

  // Handle photo library selection
  const handlePhotoLibrary = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        setProfileImage(imageUri);
        setShowImagePickerModal(false);
        showMessage("Profile picture updated successfully!", "success");
      }
    } catch (error) {
      console.error("Photo library error:", error);
      showMessage("Failed to select photo. Please try again.", "error");
    }
  };

  // Handle profile image press
  const handleProfileImagePress = () => {
    setShowImagePickerModal(true);
  };

  const handleSaveProfile = () => {
    if (!user) return;

    const updates = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      profileImage: profileImage,
    };

    const result = userProfileManager.updateUserProfile(user.id, updates);

    if (result.success) {
      setUser(result.user);
      setIsEditingProfile(false);
      showMessage(result.message, "success");
    } else {
      showMessage(result.message, "error");
    }
  };

  const handleCancelEdit = () => {
    if (user) {
      // Reset form data to original values
      setName(user.name || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
      setProfileImage(user.profileImage || null);
    }
    setIsEditingProfile(false);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      showMessage("New passwords do not match", "error");
      return;
    }

    if (!user) return;

    const result = userProfileManager.changePassword(
      user.id,
      currentPassword,
      newPassword
    );

    if (result.success) {
      setShowPasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      showMessage(result.message, "success");
    } else {
      showMessage(result.message, "error");
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={profileStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#2c3e91" />
        <Text style={profileStyles.messageText}>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={profileStyles.errorContainer}>
        <Ionicons name="alert-circle" size={48} color="#D32F2F" />
        <Text style={profileStyles.errorText}>Failed to load profile data</Text>
        <TouchableOpacity
          style={profileStyles.primaryActionButton}
          onPress={loadUserData}
        >
          <Text style={profileStyles.actionButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={profileStyles.profileContainer}>
      {/* Header */}
      <View style={profileStyles.profileHeader}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFD700" />
        </TouchableOpacity>
        <Text style={profileStyles.profileHeaderText}>YOUR PROFILE</Text>
        <TouchableOpacity
          onPress={() => setIsEditingProfile(!isEditingProfile)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={isEditingProfile ? "checkmark" : "pencil"}
            size={24}
            color="#FFD700"
          />
        </TouchableOpacity>
      </View>

      {/* Success/Error Message */}
      {message && (
        <View
          style={[
            profileStyles.messageContainer,
            messageType === "success"
              ? profileStyles.successMessage
              : profileStyles.errorMessage,
          ]}
        >
          <Text
            style={[
              profileStyles.messageText,
              messageType === "success"
                ? profileStyles.successMessageText
                : profileStyles.errorMessageText,
            ]}
          >
            {message}
          </Text>
        </View>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {/* Profile Card */}
          <View style={profileStyles.profileCard}>
            <TouchableOpacity
              style={profileStyles.profileAvatar}
              onPress={handleProfileImagePress}
              activeOpacity={0.7}
            >
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={profileStyles.profileAvatarImage}
                />
              ) : (
                <View style={profileStyles.initialsContainer}>
                  <Text style={profileStyles.initialsText}>
                    {getUserInitials(user.name)}
                  </Text>
                </View>
              )}
              <View style={profileStyles.editImageOverlay}>
                <Ionicons name="camera" size={18} color="#ffffff" />
              </View>
            </TouchableOpacity>
            {isEditingProfile ? (
              <TextInput
                style={[
                  profileStyles.profileName,
                  profileStyles.profileInputEditable,
                ]}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
              />
            ) : (
              <Text style={profileStyles.profileName}>{user.name}</Text>
            )}
          </View>

          {/* Basic Information Section */}
          <Text style={profileStyles.profileSectionTitle}>
            Basic Information
          </Text>

          {/* Email */}
          <View style={profileStyles.profileInfoCard}>
            <View style={profileStyles.profileInfoIcon}>
              <Ionicons name="mail" size={22} color="#2c3e91" />
            </View>

            <View style={profileStyles.profileInfoContent}>
              {isEditingProfile ? (
                <TextInput
                  style={[
                    profileStyles.profileInfoText,
                    profileStyles.profileInfoTextEditable,
                  ]}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              ) : (
                <Text style={profileStyles.profileInfoText}>{user.email}</Text>
              )}
            </View>
          </View>

          {/* Phone */}
          <View style={profileStyles.profileInfoCard}>
            <View style={profileStyles.profileInfoIcon}>
              <Ionicons name="call" size={22} color="#2c3e91" />
            </View>

            <View style={profileStyles.profileInfoContent}>
              {isEditingProfile ? (
                <TextInput
                  style={[
                    profileStyles.profileInfoText,
                    profileStyles.profileInfoTextEditable,
                  ]}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={profileStyles.profileInfoText}>{user.phone}</Text>
              )}
            </View>
          </View>

          {/* Change Password */}
          <TouchableOpacity
            style={profileStyles.profileInfoCard}
            onPress={() => setShowPasswordModal(true)}
          >
            <View style={profileStyles.profileInfoIcon}>
              <Ionicons name="lock-closed" size={22} color="#2c3e91" />
            </View>
            <View style={profileStyles.profileInfoContent}>
              <Text style={profileStyles.profileInfoText}>Change Password</Text>
            </View>
            <View style={profileStyles.chevronIcon}>
              <Ionicons name="chevron-forward" size={20} color="#666666" />
            </View>
          </TouchableOpacity>

          {/* Edit Profile Buttons */}
          {isEditingProfile && (
            <View style={profileStyles.actionButtonsContainer}>
              <TouchableOpacity
                style={profileStyles.primaryActionButton}
                onPress={handleSaveProfile}
              >
                <Text style={profileStyles.actionButtonText}>Save Changes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={profileStyles.secondaryActionButton}
                onPress={handleCancelEdit}
              >
                <Text style={profileStyles.actionButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Actions Section */}
          <Text style={profileStyles.profileSectionTitle}>Actions</Text>

          {/* Transaction History */}
          <TouchableOpacity
            style={[profileStyles.profileMenuItem, { marginBottom: 30 }]}
            onPress={() =>
              router.push({
                pathname: "/Transaction",
                params: { userId: user.id },
              })
            }
          >
            <View style={profileStyles.profileMenuItemContent}>
              <View style={profileStyles.profileMenuItemIcon}>
                <Ionicons name="time" size={22} color="#2c3e91" />
              </View>
              <Text style={profileStyles.profileMenuItemText}>
                Transaction History
              </Text>
            </View>
            <View style={profileStyles.profileMenuItemChevron}>
              <Ionicons name="chevron-forward" size={20} color="#666666" />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Image Picker Modal */}
      <Modal
        visible={showImagePickerModal}
        transparent={true}
        animationType="slide"
      >
        <View style={profileStyles.modalOverlay}>
          <View style={profileStyles.modalContainer}>
            <Text style={profileStyles.modalTitle}>Update Profile Picture</Text>
            <Text style={profileStyles.modalText}>
              Choose how you'd like to update your profile picture
            </Text>

            <View style={profileStyles.imagePickerButtons}>
              <TouchableOpacity
                style={[
                  profileStyles.modalButton,
                  profileStyles.modalPrimaryButton,
                ]}
                onPress={handleCameraCapture}
              >
                <Ionicons
                  name="camera"
                  size={24}
                  color="#ffffff"
                  style={{ marginBottom: 8 }}
                />
                <Text style={profileStyles.modalButtonText}>Take Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  profileStyles.modalButton,
                  profileStyles.modalPrimaryButton,
                ]}
                onPress={handlePhotoLibrary}
              >
                <Ionicons
                  name="images"
                  size={24}
                  color="#ffffff"
                  style={{ marginBottom: 8 }}
                />
                <Text style={profileStyles.modalButtonText}>
                  Choose from Gallery
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                profileStyles.modalButton,
                profileStyles.modalSecondaryButton,
                { marginTop: 15 },
              ]}
              onPress={() => setShowImagePickerModal(false)}
            >
              <Text style={profileStyles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Password Change Modal */}
      <Modal
        visible={showPasswordModal}
        transparent={true}
        animationType="slide"
      >
        <View style={profileStyles.modalOverlay}>
          <View style={profileStyles.modalContainer}>
            {/* Show error/success message above modal content if present */}
            {message && (
              <View
                style={[
                  profileStyles.messageContainer,
                  messageType === "success"
                    ? profileStyles.successMessage
                    : profileStyles.errorMessage,
                  { marginBottom: 10 },
                ]}
              >
                <Text
                  style={[
                    profileStyles.messageText,
                    messageType === "success"
                      ? profileStyles.successMessageText
                      : profileStyles.errorMessageText,
                  ]}
                >
                  {message}
                </Text>
              </View>
            )}
            <Text style={profileStyles.modalTitle}>Change Password</Text>
            {/* Password Inputs with Show/Hide Toggle */}
            <View style={profileStyles.modalInputContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                  style={[profileStyles.modalInput, { flex: 1 }]}
                  placeholder="Current Password"
                  secureTextEntry={!showCurrentPassword}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowCurrentPassword((v) => !v)}
                  style={{ marginLeft: 8 }}
                >
                  <Ionicons
                    name={showCurrentPassword ? "eye-off" : "eye"}
                    size={22}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={profileStyles.modalInputContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                  style={[profileStyles.modalInput, { flex: 1 }]}
                  placeholder="New Password"
                  secureTextEntry={!showNewPassword}
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowNewPassword((v) => !v)}
                  style={{ marginLeft: 8 }}
                >
                  <Ionicons
                    name={showNewPassword ? "eye-off" : "eye"}
                    size={22}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={profileStyles.modalInputContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                  style={[profileStyles.modalInput, { flex: 1 }]}
                  placeholder="Confirm New Password"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword((v) => !v)}
                  style={{ marginLeft: 8 }}
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={22}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={profileStyles.modalButtons}>
              <TouchableOpacity
                style={[
                  profileStyles.modalButton,
                  profileStyles.modalDangerButton,
                ]}
                onPress={() => setShowPasswordModal(false)}
              >
                <Text style={profileStyles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  profileStyles.modalButton,
                  profileStyles.modalPrimaryButton,
                ]}
                onPress={handleChangePassword}
              >
                <Text style={profileStyles.modalButtonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
