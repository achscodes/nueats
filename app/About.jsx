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

  // Operating hours data
  const operatingHours = [
    { day: "Monday", isOpen: true, openTime: "7:00 AM", closeTime: "7:00 PM" },
    { day: "Tuesday", isOpen: true, openTime: "7:00 AM", closeTime: "7:00 PM" },
    {
      day: "Wednesday",
      isOpen: true,
      openTime: "7:00 AM",
      closeTime: "7:00 PM",
    },
    {
      day: "Thursday",
      isOpen: true,
      openTime: "7:00 AM",
      closeTime: "7:00 PM",
    },
    { day: "Friday", isOpen: true, openTime: "7:00 AM", closeTime: "7:00 PM" },
    {
      day: "Saturday",
      isOpen: true,
      openTime: "8:00 AM",
      closeTime: "5:00 PM",
    },
    { day: "Sunday", isOpen: false, openTime: null, closeTime: null },
  ];

  // Get current day to highlight it
  const getCurrentDay = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date().getDay();
    return days[today];
  };

  const currentDay = getCurrentDay();

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

            {/* Operating Hours Section */}
            <View style={aboutStyles.operatingHoursSection}>
              <Text style={aboutStyles.operatingHoursTitle}>
                Operating Hours
              </Text>

              {operatingHours.map((schedule, index) => (
                <View key={index}>
                  {/* Today Banner */}
                  {schedule.day === currentDay && (
                    <View style={aboutStyles.todayBanner}>
                      <Text style={aboutStyles.todayBannerText}>Today</Text>
                    </View>
                  )}

                  {/* Schedule Item */}
                  <View
                    style={[
                      aboutStyles.scheduleItem,
                      schedule.day === currentDay &&
                        aboutStyles.scheduleItemToday,
                    ]}
                  >
                    <View style={aboutStyles.scheduleDay}>
                      <Text
                        style={[
                          aboutStyles.scheduleDayText,
                          schedule.day === currentDay &&
                            aboutStyles.scheduleDayTextToday,
                        ]}
                      >
                        {schedule.day}
                      </Text>
                    </View>

                    <View style={aboutStyles.scheduleTime}>
                      {schedule.isOpen ? (
                        <>
                          <Text
                            style={[
                              aboutStyles.scheduleTimeText,
                              schedule.day === currentDay &&
                                aboutStyles.scheduleTimeTextToday,
                            ]}
                          >
                            {schedule.openTime} - {schedule.closeTime}
                          </Text>
                          <View style={aboutStyles.openIndicator}>
                            <View style={aboutStyles.openDot} />
                            <Text style={aboutStyles.openText}>Open</Text>
                          </View>
                        </>
                      ) : (
                        <>
                          <Text
                            style={[
                              aboutStyles.scheduleTimeText,
                              aboutStyles.closedText,
                              schedule.day === currentDay &&
                                aboutStyles.scheduleTimeTextToday,
                            ]}
                          >
                            Closed
                          </Text>
                          <View style={aboutStyles.closedIndicator}>
                            <View style={aboutStyles.closedDot} />
                            <Text style={aboutStyles.closedTextLabel}>
                              Closed
                            </Text>
                          </View>
                        </>
                      )}
                    </View>
                  </View>
                </View>
              ))}
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
