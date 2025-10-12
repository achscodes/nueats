import React, { useState, useEffect } from "react";
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
  ActivityIndicator,
  Modal,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "./context/AuthContext"; // Import the auth context
import { supabase } from "../lib/supabase";
import loginStyles from "./src/Login.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isHandlingLogin, setIsHandlingLogin] = useState(false);

  const router = useRouter();
  const params = useLocalSearchParams();
  const { login, continueAsGuest, isLoading, resetPassword, isAuthenticated, user } = useAuth();

  // Check if user was just logged out due to suspension
  useEffect(() => {
    if (params.suspended === "true") {
      // Redirect to Suspended screen instead of showing modal
      router.replace("/Suspended");
    }
  }, [params.suspended]);

  // If user somehow gets authenticated while on Login page, check suspension first
  useEffect(() => {
    const checkSuspensionAndRedirect = async () => {
      if (isAuthenticated && !isHandlingLogin && user) {
        try {
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('is_suspended')
            .eq('id', user.id)
            .maybeSingle();

          if (profileData?.is_suspended === true) {
            console.log('Login: User is suspended, redirecting to Suspended screen');
            router.replace("/Suspended");
          } else {
            console.log('Login: User not suspended, redirecting to Menu');
            router.replace("/Menu");
          }
        } catch (error) {
          console.error('Login: Error checking suspension:', error);
          router.replace("/Menu");
        }
      }
    };
    checkSuspensionAndRedirect();
  }, [isAuthenticated, isHandlingLogin, user]);

  const handleLogin = async () => {
    // Clear previous error
    setLoginError("");

    if (!email || !password) {
      setLoginError("Please enter both email and password.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLoginError("Please enter a valid email address.");
      return;
    }

    try {
      setIsHandlingLogin(true);
      const result = await login(email, password);
      if (result.success) {
        // Don't show alert, just navigate directly
        router.replace({
          pathname: "/Menu",
        });
      } else {
        // Check if account is suspended
        if (result.isSuspended) {
          // Redirect to Suspended screen instead of showing modal
          router.replace("/Suspended");
          // Clear password field for security
          setPassword("");
        } else {
          setLoginError(result.message);
        }
      }
    } catch (error) {
      setLoginError("An unexpected error occurred. Please try again.");
    } finally {
      setIsHandlingLogin(false);
    }
  };

  const handleGuestContinue = () => {
    continueAsGuest();
    router.replace("/Menu");
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Reset Password", "Enter your email to receive a reset link.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Reset Password", "Please enter a valid email address.");
      return;
    }
    const res = await resetPassword(email);
    if (res.success) {
      Alert.alert("Check your email", "We sent a password reset link to your email.");
    } else {
      Alert.alert("Reset Failed", res.message || "Unable to send reset email.");
    }
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

              {/* Error Message */}
              {loginError ? (
                <View
                  style={{
                    backgroundColor: "#ffebee",
                    borderLeftWidth: 4,
                    borderLeftColor: "#f44336",
                    padding: 10,
                    marginBottom: 15,
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ color: "#c62828", fontSize: 14 }}>
                    {loginError}
                  </Text>
                </View>
              ) : null}

              {/* Email */}
              <TextInput
                style={loginStyles.loginInput}
                placeholder="Enter your email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setLoginError(""); // Clear error when typing
                }}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!isLoading}
              />

              {/* Password with Eye Icon */}
              <View style={loginStyles.passwordInputContainer}>
                <TextInput
                  style={loginStyles.passwordInput}
                  placeholder="Enter your password"
                  placeholderTextColor="#888"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setLoginError(""); // Clear error when typing
                  }}
                  secureTextEntry={!showPassword}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  style={loginStyles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    size={24}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>

              <View style={loginStyles.loginOptions}>
                <TouchableOpacity
                  onPress={() => setRemember(!remember)}
                  disabled={isLoading}
                >
                  <Text style={loginStyles.remember}>
                    {remember ? "☑" : "☐"} Remember Me
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity disabled={isLoading} onPress={handleForgotPassword}>
                  <Text style={loginStyles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[loginStyles.loginBtn, isLoading && { opacity: 0.7 }]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={loginStyles.loginBtnText}>Login</Text>
                )}
              </TouchableOpacity>

              <View style={loginStyles.loginSignupRow}>
                <Text style={{ color: "#fff" }}>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => router.push("/Termsandconditions")}
                  disabled={isLoading}
                >
                  <Text style={loginStyles.loginSignupLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>

              {/* Continue as Guest Option */}
              <View style={loginStyles.guestOption}>
                <TouchableOpacity
                  onPress={handleGuestContinue}
                  disabled={isLoading}
                >
                  <Text style={loginStyles.guestText}>Continue as Guest</Text>
                </TouchableOpacity>
              </View>

              {/* Remove demo credentials block when using real auth */}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    </ImageBackground>
  );
}
