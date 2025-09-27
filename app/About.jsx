import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import aboutStyles from "./src/About.js";

const { height } = Dimensions.get("window");

export default function AboutPage() {
  const router = useRouter();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1a237e" />
      <LinearGradient
        colors={["#1a237e", "#2c3e91"]}
        style={aboutStyles.container}
      >
        {/* Header */}
        <View style={aboutStyles.header}>
          <TouchableOpacity
            style={aboutStyles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={aboutStyles.headerTitle}>About</Text>
          <View style={aboutStyles.placeholder} />
        </View>

        <ScrollView
          style={aboutStyles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={aboutStyles.scrollContent}
        >
          {/* Logo Section */}
          <View style={aboutStyles.logoSection}>
            <View style={aboutStyles.logoContainer}>
              <Image
                source={require("../assets/images/NuEatsLogov3.png")}
                style={aboutStyles.logoImage}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Main Content Card */}
          <View style={aboutStyles.contentCard}>
            <View style={aboutStyles.titleSection}>
              <Text style={aboutStyles.title}>About NUeats</Text>
              <View style={aboutStyles.titleUnderline} />
            </View>

            <View style={aboutStyles.descriptionSection}>
              <Text style={aboutStyles.description}>
                NUeats is a school-based food reservation and ordering app
                designed to make it easier for students to access food
                conveniently.
              </Text>

              <Text style={aboutStyles.description}>
                With NUeats, students can explore menus, place orders, and
                reserve meals within the school campus—all in just a few taps!
              </Text>
            </View>

            {/* Features Section */}
            <View style={aboutStyles.featuresSection}>
              <Text style={aboutStyles.featuresTitle}>Key Features</Text>

              <View style={aboutStyles.featureItem}>
                <View style={aboutStyles.featureIcon}>
                  <Ionicons
                    name="restaurant-outline"
                    size={20}
                    color="#4A5FBE"
                  />
                </View>
                <Text style={aboutStyles.featureText}>
                  Browse campus food menus
                </Text>
              </View>

              <View style={aboutStyles.featureItem}>
                <View style={aboutStyles.featureIcon}>
                  <Ionicons name="time-outline" size={20} color="#4A5FBE" />
                </View>
                <Text style={aboutStyles.featureText}>
                  Quick meal reservations
                </Text>
              </View>

              <View style={aboutStyles.featureItem}>
                <View style={aboutStyles.featureIcon}>
                  <Ionicons name="school-outline" size={20} color="#4A5FBE" />
                </View>
                <Text style={aboutStyles.featureText}>
                  Exclusive to NU campus
                </Text>
              </View>

              <View style={aboutStyles.featureItem}>
                <View style={aboutStyles.featureIcon}>
                  <Ionicons name="card-outline" size={20} color="#4A5FBE" />
                </View>
                <Text style={aboutStyles.featureText}>
                  Easy ordering & payment
                </Text>
              </View>
            </View>

            {/* Info Section */}
            <View style={aboutStyles.infoSection}>
              <View style={aboutStyles.infoCard}>
                <Ionicons
                  name="information-circle-outline"
                  size={24}
                  color="#4A5FBE"
                />
                <Text style={aboutStyles.infoText}>
                  Designed specifically for National University students and
                  staff
                </Text>
              </View>
            </View>
          </View>

          {/* Bottom Spacing */}
          <View style={aboutStyles.bottomSpacing} />
        </ScrollView>

        {/* Floating Back Button (Alternative) */}
        <TouchableOpacity
          style={aboutStyles.floatingBackButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Text style={aboutStyles.floatingBackButtonText}>Got it!</Text>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
}
