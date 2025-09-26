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
import { useRouter } from "expo-router";
import styles from "./src/style.jsx"; // central styles

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSignUp = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    Alert.alert("Success", "Account created!");
    router.replace("/(tabs)");
  };

  return (
    <ImageBackground
      source={require("../assets/images/NuEatsBG.png")}
      style={styles.background}
      imageStyle={styles.bgImage}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.signupContainer}>
            {/* Logo */}
            <Image
              source={require("../assets/images/NuEatsLogo.png")}
              style={styles.logo}
              resizeMode="contain"
            />

            {/* Card */}
            <View style={styles.signupCard}>
              <Text style={styles.signupHeader}>Sign Up</Text>

              {/* Already have account */}
              <View style={styles.loginSignupRow}>
                <Text style={{ color: "#fff" }}>Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/Login")}>
                  <Text style={styles.loginSignupLink}>Log In</Text>
                </TouchableOpacity>
              </View>

              {/* First Name + Suffix */}
              <View style={styles.signupRow}>
                <TextInput
                  style={styles.signupInputHalf}
                  placeholder="First Name"
                  value={firstName}
                  onChangeText={setFirstName}
                />
                <TextInput
                  style={styles.signupInputHalf}
                  placeholder="Suffix"
                  value={suffix}
                  onChangeText={setSuffix}
                />
              </View>

              {/* Last Name */}
              <TextInput
                style={styles.signupInput}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
              />

              {/* Email */}
              <TextInput
                style={styles.signupInput}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              {/* Password */}
              <TextInput
                style={styles.signupInput}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              {/* Confirm Password */}
              <TextInput
                style={styles.signupInput}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />

              {/* Button */}
              <TouchableOpacity style={styles.signupBtn} onPress={handleSignUp}>
                <Text style={styles.signupBtnText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
