import React, { useState, useEffect } from "react";
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
import { supabase } from "../lib/supabase";

const { height } = Dimensions.get("window");

export default function AboutPage() {
  const router = useRouter();
  
  // State for store settings
  const [storeSettings, setStoreSettings] = useState(null);
  const [operatingHours, setOperatingHours] = useState([
    { day: "Monday", isOpen: true, openTime: "7:00 AM", closeTime: "7:00 PM" },
    { day: "Tuesday", isOpen: true, openTime: "7:00 AM", closeTime: "7:00 PM" },
    { day: "Wednesday", isOpen: true, openTime: "7:00 AM", closeTime: "7:00 PM" },
    { day: "Thursday", isOpen: true, openTime: "7:00 AM", closeTime: "7:00 PM" },
    { day: "Friday", isOpen: true, openTime: "7:00 AM", closeTime: "7:00 PM" },
    { day: "Saturday", isOpen: true, openTime: "8:00 AM", closeTime: "5:00 PM" },
    { day: "Sunday", isOpen: false, openTime: null, closeTime: null },
  ]);

  // Load store settings on component mount
  useEffect(() => {
    const loadStoreSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('store_settings')
          .select('*')
          .single();

        if (error) {
          console.error('Error loading store settings:', error);
          // Use fallback data if store settings fail to load
          setStoreSettings({
            name: 'NU EATS',
            description: 'A modern canteen serving fresh, healthy meals with convenient mobile ordering and pickup service.',
            phone_number: '(+63)912 345 6789',
            email_address: 'contact@nueats.com',
            street_address: 'Sampaloc 1 Bridge, SM Dasmarinas, Governor\'s Dr',
            city: 'Dasmarinas',
            province: 'Cavite',
            zip_code: '4114',
            operating_hours: {
              monday: { open: true, openTime: "08:00", closeTime: "17:00" },
              tuesday: { open: true, openTime: "08:00", closeTime: "17:00" },
              wednesday: { open: true, openTime: "08:00", closeTime: "17:00" },
              thursday: { open: true, openTime: "08:00", closeTime: "17:00" },
              friday: { open: true, openTime: "08:00", closeTime: "17:00" },
              saturday: { open: true, openTime: "08:00", closeTime: "17:00" },
              sunday: { open: false, openTime: "08:00", closeTime: "17:00" }
            }
          });
        } else {
          setStoreSettings(data);
          
          // Parse operating hours from JSONB
          if (data.operating_hours) {
            const hours = data.operating_hours;
            const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            
            const parsedHours = days.map((day, index) => {
              const dayData = hours[day];
              return {
                day: dayNames[index],
                isOpen: dayData?.open || false,
                openTime: dayData?.openTime ? formatTime(dayData.openTime) : null,
                closeTime: dayData?.closeTime ? formatTime(dayData.closeTime) : null,
              };
            });
            
            setOperatingHours(parsedHours);
          }
        }
      } catch (error) {
        console.error('Error loading store settings:', error);
        // Use fallback data
        setStoreSettings({
          name: 'NU EATS',
          description: 'A modern canteen serving fresh, healthy meals with convenient mobile ordering and pickup service.',
          phone_number: '(+63)912 345 6789',
          email_address: 'contact@nueats.com',
          street_address: 'Sampaloc 1 Bridge, SM Dasmarinas, Governor\'s Dr',
          city: 'Dasmarinas',
          province: 'Cavite',
          zip_code: '4114'
        });
      }
    };

    loadStoreSettings();
  }, []);

  // Helper function to format time from 24-hour to 12-hour format
  const formatTime = (time24) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

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
                {storeSettings?.description || 'NUeats is a school-based food reservation and ordering app designed to make it easier for students to access food conveniently.'}
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
