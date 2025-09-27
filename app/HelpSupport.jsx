import React, { useState } from "react";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import helpSupportStyles, { HELP_COLORS } from "./src/HelpSupport.js";
import { helpSupportDemoData } from "./demodata/helpDemoData.js";

export default function HelpSupport() {
  const router = useRouter();
  const { storeInfo, contactMethods, faqData } = helpSupportDemoData;

  // Modal state
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDetails, setIssueDetails] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Issue categories
  const issueCategories = [
    "Food Quality",
    "Service",
    "App Issue",
    "Billing",
    "Pickup Delay",
    "Other",
  ];

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

  const handleSendReport = () => {
    if (!selectedCategory || !issueTitle.trim() || !issueDetails.trim()) {
      Alert.alert(
        "Incomplete Information",
        "Please fill in all fields before sending your report."
      );
      return;
    }

    Alert.alert(
      "Report Sent Successfully!",
      `Thank you for reporting this ${selectedCategory} issue. We'll contact you during business hours.`,
      [
        {
          text: "OK",
          onPress: () => handleCloseModal(),
        },
      ]
    );
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
          <TouchableOpacity
            style={helpSupportStyles.emergencyButton}
            onPress={() => handleCall(storeInfo.emergencyNumber)}
          >
            <Text style={helpSupportStyles.emergencyButtonText}>
              Call: {storeInfo.emergencyNumber}
            </Text>
          </TouchableOpacity>
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

          <TouchableOpacity
            style={helpSupportStyles.contactOption}
            onPress={() => handleCall(contactMethods.phone.number)}
          >
            <View style={helpSupportStyles.contactIcon}>
              <Ionicons
                name={contactMethods.phone.icon}
                size={24}
                color={HELP_COLORS.success}
              />
            </View>
            <View style={helpSupportStyles.contactInfo}>
              <Text style={helpSupportStyles.contactTitle}>
                {contactMethods.phone.title}
              </Text>
              <Text style={helpSupportStyles.contactDetail}>
                {contactMethods.phone.number}
              </Text>
              <Text style={helpSupportStyles.contactDetail}>
                {contactMethods.phone.availability}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={helpSupportStyles.contactOption}
            onPress={() => handleEmail(contactMethods.email.address)}
          >
            <View style={helpSupportStyles.contactIcon}>
              <Ionicons
                name={contactMethods.email.icon}
                size={24}
                color={HELP_COLORS.primary}
              />
            </View>
            <View style={helpSupportStyles.contactInfo}>
              <Text style={helpSupportStyles.contactTitle}>
                {contactMethods.email.title}
              </Text>
              <Text style={helpSupportStyles.contactDetail}>
                {contactMethods.email.address}
              </Text>
              <Text style={helpSupportStyles.contactDetail}>
                {contactMethods.email.responseTime}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={helpSupportStyles.contactOption}>
            <View style={helpSupportStyles.contactIcon}>
              <Ionicons
                name={contactMethods.location.icon}
                size={24}
                color={HELP_COLORS.accent}
              />
            </View>
            <View style={helpSupportStyles.contactInfo}>
              <Text style={helpSupportStyles.contactTitle}>
                {contactMethods.location.title}
              </Text>
              <Text style={helpSupportStyles.contactDetail}>
                {contactMethods.location.address}
              </Text>
              <Text style={helpSupportStyles.contactDetail}>
                {contactMethods.location.city}
              </Text>
            </View>
          </View>
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
                  !issueDetails.trim()
                    ? helpSupportStyles.sendReportButtonDisabled
                    : helpSupportStyles.sendReportButtonActive,
                ]}
                onPress={handleSendReport}
                disabled={
                  !selectedCategory ||
                  !issueTitle.trim() ||
                  !issueDetails.trim()
                }
              >
                <Text style={helpSupportStyles.sendReportButtonText}>
                  Send Report
                </Text>
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
