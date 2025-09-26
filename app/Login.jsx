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
import styles from "./src/style";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    Alert.alert("Success", "Logged in!");
    router.replace("/Menu");
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
          <View style={styles.loginContainer}>
            <Image
              source={require("../assets/images/NuEatsLogo.png")}
              style={styles.logo}      
              resizeMode="contain"
            />

            <View style={styles.loginCard}>
              <Text style={styles.loginHeader}>
                <Text style={styles.loginWelcome}>Welcome </Text>to NUeats!
              </Text>

              {/* Email */}
              <TextInput
                style={styles.loginInput}   
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              {/* Password */}
              <TextInput
                style={styles.loginInput}   
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <View style={styles.loginOptions}>
                <TouchableOpacity onPress={() => setRemember(!remember)}>
                  <Text style={styles.remember}>
                    {remember ? "☑" : "☐"} Remember Me
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                <Text style={styles.loginBtnText}>Login</Text>
              </TouchableOpacity>

              <View style={styles.loginSignupRow}>
                <Text style={{ color: "#fff" }}>Don’t have an account? </Text>
                <TouchableOpacity
                  onPress={() => router.push("/Termsandconditions")}
                >
                  <Text style={styles.loginSignupLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
