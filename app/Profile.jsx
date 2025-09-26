import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from "./src/style.jsx";

export default function ProfileScreen() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("Alden Richards");
  const [phone, setPhone] = useState("********074");
  const [email, setEmail] = useState("***@students.nu.dasma.ph");

  const router = useRouter();

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <SafeAreaView style={styles.profileContainer}>
      {/* Header */}
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={() => router.push("/Menu")}>
          <Ionicons name="arrow-back" size={22} color="#FFD700" />
        </TouchableOpacity>
        <Text style={styles.profileHeaderText}>YOUR PROFILE</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Ionicons name="person-circle" size={32} color="#2c3e91" style={{ marginRight: 10 }} />
        {isEditing ? (
          <TextInput
            style={[styles.profileName, styles.profileInputEditable]}
            value={name}
            onChangeText={setName}
          />
        ) : (
          <Text style={styles.profileName}>{name}</Text>
        )}
        <TouchableOpacity onPress={toggleEdit} style={styles.profileEditBtn}>
          <Ionicons name="create-outline" size={18} color="#2c3e91" />
        </TouchableOpacity>
      </View>

      {/* Phone */}
      <View style={styles.profileInfoCard}>
        <Ionicons name="call" size={20} color="#2c3e91" style={{ marginRight: 10 }} />
        {isEditing ? (
          <TextInput
            style={styles.profileInfoText}
            value={phone}
            onChangeText={setPhone}
          />
        ) : (
          <Text style={styles.profileInfoText}>{phone}</Text>
        )}
        <TouchableOpacity onPress={toggleEdit}>
          <Ionicons name="create-outline" size={18} color="#2c3e91" />
        </TouchableOpacity>
      </View>

      {/* Email */}
      <View style={styles.profileInfoCard}>
        <Ionicons name="mail" size={20} color="#2c3e91" style={{ marginRight: 10 }} />
        {isEditing ? (
          <TextInput
            style={styles.profileInfoText}
            value={email}
            onChangeText={setEmail}
          />
        ) : (
          <Text style={styles.profileInfoText}>{email}</Text>
        )}
        <TouchableOpacity onPress={toggleEdit}>
          <Ionicons name="create-outline" size={18} color="#2c3e91" />
        </TouchableOpacity>
      </View>

      {/* Notifications */}
      <View style={styles.profileInfoCard}>
        <Ionicons name="notifications" size={20} color="#2c3e91" style={{ marginRight: 10 }} />
        <Text style={styles.profileInfoText}>Notifications</Text>
        <Switch
          trackColor={{ false: "#ccc", true: "#FFD700" }}
          thumbColor="#fff"
          onValueChange={() => setIsEnabled(!isEnabled)}
          value={isEnabled}
        />
      </View>

      {/* Transaction History */}
      <TouchableOpacity
        style={styles.profileInfoCard}
        onPress={() => router.push("/Transaction")}
      >
        <Ionicons name="time" size={20} color="#2c3e91" style={{ marginRight: 10 }} />
        <Text style={styles.profileInfoText}>Transaction History</Text>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
