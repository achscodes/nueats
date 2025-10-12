import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Linking,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import helpSupportStyles, { HELP_COLORS } from "./src/HelpSupport.js";
import { helpSupportDemoData } from "./demodata/helpDemoData.js";
import { supabase } from "../lib/supabase";
import { useAuth } from "./context/AuthContext";

export default function HelpSupport() {
  const router = useRouter();
  const { user: authUser, isGuest } = useAuth();
  const { contactMethods, faqData } = helpSupportDemoData;
  
  // State for store settings
  const [storeSettings, setStoreSettings] = useState(null);
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);

  // Modal state
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDetails, setIssueDetails] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Issue categories
  const issueCategories = [
    "Food Quality",
    "Service",
    "App Issue",
    "Billing",
    "Pickup Delay",
    "Other",
  ];

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
            phone_number: '(+63)912 345 6789',
            email_address: 'contact@nueats.com',
            street_address: 'Sampaloc 1 Bridge, SM Dasmarinas, Governor\'s Dr',
            city: 'Dasmarinas',
            province: 'Cavite',
            zip_code: '4114'
          });
        } else {
          setStoreSettings(data);
        }
      } catch (error) {
        console.error('Error loading store settings:', error);
        // Use fallback data
        setStoreSettings({
          name: 'NU EATS',
          phone_number: '(+63)912 345 6789',
          email_address: 'contact@nueats.com',
          street_address: 'Sampaloc 1 Bridge, SM Dasmarinas, Governor\'s Dr',
          city: 'Dasmarinas',
          province: 'Cavite',
          zip_code: '4114'
        });
      } finally {
        setIsLoadingSettings(false);
      }
    };

    loadStoreSettings();
  }, []);

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleReportIssue = () => {
    console.log("Opening modal...");
    setReportModalVisible(true);
  };

  const handleCloseModal = () => {
    console.log("Closing modal...");
    setReportModalVisible(false);
    setSelectedCategory("");
    setIssueTitle("");
    setIssueDetails("");
    setShowCategoryDropdown(false);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
  };

  const handleSendReport = async () => {
    if (!selectedCategory || !issueTitle.trim() || !issueDetails.trim()) {
      Alert.alert(
        "Incomplete Information",
        "Please fill in all fields before sending your report."
      );
      return;
    }

    // Check if user is authenticated
    if (!authUser || isGuest) {
      Alert.alert(
        "Authentication Required",
        "Please log in to report an issue.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Login",
            onPress: () => {
              handleCloseModal();
              router.push("/Login");
            },
          },
        ]
      );
      return;
    }

    setIsSubmitting(true);
    try {
      // Convert category to lowercase for database
      const categoryLowercase = selectedCategory.toLowerCase();

      const { data, error } = await supabase
        .from('complaints')
        .insert({
          user_id: authUser.id,
          category: categoryLowercase,
          title: issueTitle.trim(),
          description: issueDetails.trim(),
          status: 'Pending',
        })
        .select('complaint_id')
        .single();

      if (error) throw error;

      Alert.alert(
        "Report Sent Successfully!",
        `Thank you for reporting this ${selectedCategory} issue. We'll contact you during business hours.\n\nComplaint ID: #${data.complaint_id}`,
        [
          {
            text: "OK",
            onPress: () => handleCloseModal(),
          },
        ]
      );
    } catch (error) {
      console.error('Error submitting complaint:', error);
      Alert.alert(
        "Error",
        error.message || "Failed to submit your report. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={helpSupportStyles.helpContainer}>
      {/* Header */}
      <View style={helpSupportStyles.helpHeader}>
        <View style={helpSupportStyles.helpHeaderContent}>
          <TouchableOpacity
            style={helpSupportStyles.helpBackButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color={HELP_COLORS.accent} />
          </TouchableOpacity>
          <Text style={helpSupportStyles.helpTitle}>Help & Support</Text>
        </View>
      </View>

      <ScrollView
        style={helpSupportStyles.helpContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Emergency Contact */}
        <View style={helpSupportStyles.emergencySection}>
          <Text style={helpSupportStyles.emergencyTitle}>
            🚨 Emergency Contact
          </Text>
          <Text style={helpSupportStyles.emergencyText}>
            For urgent order issues or food safety concerns during business
            hours only.
          </Text>
          {storeSettings && (
            <TouchableOpacity
              style={helpSupportStyles.emergencyButton}
              onPress={() => handleCall(storeSettings.phone_number)}
            >
              <Text style={helpSupportStyles.emergencyButtonText}>
                Call: {storeSettings.phone_number}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Quick Actions */}
        <View style={helpSupportStyles.helpSection}>
          <Text style={helpSupportStyles.helpSectionTitle}>Quick Actions</Text>

          <TouchableOpacity
            style={[
              helpSupportStyles.actionButton,
              helpSupportStyles.secondaryButton,
            ]}
            onPress={handleReportIssue}
          >
            <Text
              style={[
                helpSupportStyles.actionButtonText,
                helpSupportStyles.secondaryButtonText,
              ]}
            >
              🛠 Report an Issue
            </Text>
          </TouchableOpacity>
        </View>

        {/* Contact Information */}
        <View style={helpSupportStyles.helpSection}>
          <Text style={helpSupportStyles.helpSectionTitle}>Contact Us</Text>

          {storeSettings && (
            <>
              <TouchableOpacity
                style={helpSupportStyles.contactOption}
                onPress={() => handleCall(storeSettings.phone_number)}
              >
                <View style={helpSupportStyles.contactIcon}>
                  <Ionicons
                    name="call"
                    size={24}
                    color={HELP_COLORS.success}
                  />
                </View>
                <View style={helpSupportStyles.contactInfo}>
                  <Text style={helpSupportStyles.contactTitle}>
                    Phone
                  </Text>
                  <Text style={helpSupportStyles.contactDetail}>
                    {storeSettings.phone_number}
                  </Text>
                  <Text style={helpSupportStyles.contactDetail}>
                    Available during business hours
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={helpSupportStyles.contactOption}
                onPress={() => handleEmail(storeSettings.email_address)}
              >
                <View style={helpSupportStyles.contactIcon}>
                  <Ionicons
                    name="mail"
                    size={24}
                    color={HELP_COLORS.primary}
                  />
                </View>
                <View style={helpSupportStyles.contactInfo}>
                  <Text style={helpSupportStyles.contactTitle}>
                    Email
                  </Text>
                  <Text style={helpSupportStyles.contactDetail}>
                    {storeSettings.email_address}
                  </Text>
                  <Text style={helpSupportStyles.contactDetail}>
                    Response within 24 hours
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={helpSupportStyles.contactOption}>
                <View style={helpSupportStyles.contactIcon}>
                  <Ionicons
                    name="location"
                    size={24}
                    color={HELP_COLORS.accent}
                  />
                </View>
                <View style={helpSupportStyles.contactInfo}>
                  <Text style={helpSupportStyles.contactTitle}>
                    Location
                  </Text>
                  <Text style={helpSupportStyles.contactDetail}>
                    {storeSettings.street_address}
                  </Text>
                  <Text style={helpSupportStyles.contactDetail}>
                    {storeSettings.city}, {storeSettings.province} {storeSettings.zip_code}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Frequently Asked Questions */}
        <View style={helpSupportStyles.helpSection}>
          <Text style={helpSupportStyles.helpSectionTitle}>
            Frequently Asked Questions
          </Text>

          {faqData.map((faq, index) => (
            <View key={index} style={helpSupportStyles.faqItem}>
              <Text style={helpSupportStyles.faqQuestion}>{faq.question}</Text>
              <Text style={helpSupportStyles.faqAnswer}>{faq.answer}</Text>
            </View>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Report Issue Modal - Now using proper styles */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={reportModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={helpSupportStyles.modalOverlay}>
          <View style={helpSupportStyles.modalContainer}>
            {/* Modal Header */}
            <View style={helpSupportStyles.modalHeader}>
              <Text style={helpSupportStyles.modalTitle}>Report an Issue</Text>
              <TouchableOpacity onPress={handleCloseModal}>
                <Ionicons name="close" size={24} color={HELP_COLORS.gray} />
              </TouchableOpacity>
            </View>

            <ScrollView style={helpSupportStyles.modalScrollView}>
              {/* Category Dropdown */}
              <View
                style={
                  showCategoryDropdown
                    ? helpSupportStyles.inputGroupDropdownOpen
                    : helpSupportStyles.inputGroupDropdown
                }
              >
                <Text style={helpSupportStyles.inputLabel}>
                  Issue Category *
                </Text>
                <View style={helpSupportStyles.dropdownContainer}>
                  <TouchableOpacity
                    style={[
                      helpSupportStyles.dropdownButton,
                      showCategoryDropdown &&
                        helpSupportStyles.dropdownButtonActive,
                    ]}
                    onPress={() =>
                      setShowCategoryDropdown(!showCategoryDropdown)
                    }
                  >
                    <Text
                      style={[
                        helpSupportStyles.dropdownButtonText,
                        !selectedCategory &&
                          helpSupportStyles.dropdownPlaceholder,
                      ]}
                    >
                      {selectedCategory || "Select category..."}
                    </Text>
                    <Ionicons
                      name={
                        showCategoryDropdown ? "chevron-up" : "chevron-down"
                      }
                      size={20}
                      color={HELP_COLORS.gray}
                    />
                  </TouchableOpacity>

                  {showCategoryDropdown && (
                    <View style={helpSupportStyles.dropdownList}>
                      {issueCategories.map((category, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            helpSupportStyles.dropdownItem,
                            index === issueCategories.length - 1 &&
                              helpSupportStyles.dropdownItemLast,
                          ]}
                          onPress={() => handleSelectCategory(category)}
                        >
                          <Text style={helpSupportStyles.dropdownItemText}>
                            {category}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>

              {/* Issue Title */}
              <View style={helpSupportStyles.inputGroup}>
                <Text style={helpSupportStyles.inputLabel}>Issue Title *</Text>
                <TextInput
                  style={helpSupportStyles.textInput}
                  placeholder="Brief description of the issue..."
                  placeholderTextColor={HELP_COLORS.gray}
                  value={issueTitle}
                  onChangeText={setIssueTitle}
                  maxLength={100}
                />
              </View>

              {/* Issue Details */}
              <View style={helpSupportStyles.inputGroup}>
                <Text style={helpSupportStyles.inputLabel}>Details *</Text>
                <TextInput
                  style={[
                    helpSupportStyles.textInput,
                    helpSupportStyles.textArea,
                  ]}
                  placeholder="Please provide detailed information about your issue..."
                  placeholderTextColor={HELP_COLORS.gray}
                  value={issueDetails}
                  onChangeText={setIssueDetails}
                  multiline={true}
                  numberOfLines={6}
                  maxLength={500}
                />
                <Text style={helpSupportStyles.characterCount}>
                  {issueDetails.length}/500
                </Text>
              </View>

              {/* Send Report Button */}
              <TouchableOpacity
                style={[
                  helpSupportStyles.sendReportButton,
                  !selectedCategory ||
                  !issueTitle.trim() ||
                  !issueDetails.trim() ||
                  isSubmitting
                    ? helpSupportStyles.sendReportButtonDisabled
                    : helpSupportStyles.sendReportButtonActive,
                ]}
                onPress={handleSendReport}
                disabled={
                  !selectedCategory ||
                  !issueTitle.trim() ||
                  !issueDetails.trim() ||
                  isSubmitting
                }
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={helpSupportStyles.sendReportButtonText}>
                    Send Report
                  </Text>
                )}
              </TouchableOpacity>

              {/* Bottom spacing */}
              <View style={{ height: 20 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
