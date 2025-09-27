import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import loginStyles from "./src/Login.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    Alert.alert("Success", "Logged in!");
    router.replace("/Menu");
  };

  const handleGuestContinue = () => {
    router.replace("/Menu");
  };

  return (
    <ImageBackground
      source={require("../assets/images/NuEatsBG.png")}
      style={loginStyles.background}
      imageStyle={loginStyles.bgImage}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={loginStyles.loginContainer}>
            <Image
              source={require("../assets/images/NuEatsLogo.png")}
              style={loginStyles.logo}
              resizeMode="contain"
            />

            <View style={loginStyles.loginCard}>
              <Text style={loginStyles.loginHeader}>
                <Text style={loginStyles.loginWelcome}>Welcome </Text>to NUeats!
              </Text>

              {/* Email */}
              <TextInput
                style={loginStyles.loginInput}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              {/* Password with Eye Icon */}
              <View style={loginStyles.passwordInputContainer}>
                <TextInput
                  style={loginStyles.passwordInput}
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={loginStyles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    size={24}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>

              <View style={loginStyles.loginOptions}>
                <TouchableOpacity onPress={() => setRemember(!remember)}>
                  <Text style={loginStyles.remember}>
                    {remember ? "☑" : "☐"} Remember Me
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text style={loginStyles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={loginStyles.loginBtn}
                onPress={handleLogin}
              >
                <Text style={loginStyles.loginBtnText}>Login</Text>
              </TouchableOpacity>

              <View style={loginStyles.loginSignupRow}>
                <Text style={{ color: "#fff" }}>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => router.push("/Termsandconditions")}
                >
                  <Text style={loginStyles.loginSignupLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>

              {/* Continue as Guest Option */}
              <View style={loginStyles.guestOption}>
                <TouchableOpacity onPress={handleGuestContinue}>
                  <Text style={loginStyles.guestText}>Continue as Guest</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
