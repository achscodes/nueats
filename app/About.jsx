import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import styles from "./src/style"; // ✅ no need for .jsx if exported as default

export default function AboutPage() {
  const router = useRouter();

  return (
    <View style={styles.aboutContainer}>
      {/* Logo */}
      <View style={styles.aboutLogoContainer}>
        <Text style={styles.aboutNuText}>NU</Text>
        <Text style={styles.aboutEatsText}>eats</Text>
      </View>

      {/* Title */}
      <Text style={styles.aboutTitle}>About NuEats</Text>

      {/* About Content Box */}
      <View style={styles.aboutBox}>
        <Text style={styles.aboutText}>
          NuEats is a school-based food reservation and ordering app designed to
          make it easier for students to access food conveniently.{"\n\n"}
          With NuEats, students can explore menus, place orders, and reserve
          meals within the school campus—all in just a few taps!
        </Text>
      </View>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.aboutBackButton}
        onPress={() => router.back()}
        activeOpacity={0.7} // ✅ added feedback for better UX
      >
        <Text style={styles.aboutBackButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
