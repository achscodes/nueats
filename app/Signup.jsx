import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import signupStyles from "./src/Signup.js"; // ✅ Import dedicated signup styles
import { useAuth } from "./context/AuthContext";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const { signUp } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^09\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert(
        "Error",
        "Please enter a valid Philippine phone number (11 digits starting with 09)."
      );
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        "Error",
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    const displayName = `${firstName} ${lastName}`.trim();
    const result = await signUp({ email, password, displayName });
    if (result.success) {
      Alert.alert(
        "Success",
        "Account created. Please check your email to verify before logging in.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/Login"),
          },
        ]
      );
    } else {
      Alert.alert("Error", result.message || "Failed to create account.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/NuEatsBG.png")}
      style={signupStyles.background}
      imageStyle={signupStyles.bgImage}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={signupStyles.signupContainer}>
            {/* Logo */}
            <Image
              source={require("../assets/images/NuEatsLogo.png")}
              style={signupStyles.logo}
              resizeMode="contain"
            />

            {/* Card */}
            <View style={signupStyles.signupCard}>
              <Text style={signupStyles.signupHeader}>Sign Up</Text>

              {/* Already have account */}
              <View style={signupStyles.loginSignupRow}>
                <Text style={{ color: "#fff" }}>Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/Login")}>
                  <Text style={signupStyles.loginSignupLink}>Log In</Text>
                </TouchableOpacity>
              </View>

              {/* First Name - now full width */}
              <TextInput
                style={signupStyles.signupInput}
                placeholder="First Name"
                placeholderTextColor="#888"
                value={firstName}
                onChangeText={setFirstName}
              />

              {/* Last Name */}
              <TextInput
                style={signupStyles.signupInput}
                placeholder="Last Name"
                placeholderTextColor="#888"
                value={lastName}
                onChangeText={setLastName}
              />

              {/* Email */}
              <TextInput
                style={signupStyles.signupInput}
                placeholder="Enter your email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              {/* Phone Number */}
              <TextInput
                style={signupStyles.signupInput}
                placeholder="Enter your phone number"
                placeholderTextColor="#888"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />

              {/* Password */}
              <View style={signupStyles.signupPasswordContainer}>
                <TextInput
                  style={signupStyles.signupPasswordInput}
                  placeholder="Enter your password"
                  placeholderTextColor="#888"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={signupStyles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>

              {/* Confirm Password */}
              <View style={signupStyles.signupPasswordContainer}>
                <TextInput
                  style={signupStyles.signupPasswordInput}
                  placeholder="Confirm your password"
                  placeholderTextColor="#888"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  style={signupStyles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={
                      showConfirmPassword ? "eye-outline" : "eye-off-outline"
                    }
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>

              {/* Password Requirements Note */}
              <Text
                style={{
                  color: "#FFD700",
                  fontSize: 12,
                  textAlign: "center",
                  marginTop: -10,
                  marginBottom: 15,
                  fontStyle: "italic",
                }}
              >
                Password must contain: 1 uppercase, 1 lowercase, 1 number, 1
                special character & minimum 8 characters
              </Text>

              {/* Button */}
              <TouchableOpacity
                style={signupStyles.signupBtn}
                onPress={handleSignUp}
              >
                <Text style={signupStyles.signupBtnText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
