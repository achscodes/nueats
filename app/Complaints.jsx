import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SETTINGS_COLORS } from "./src/Setting.js";
import { userComplaintsHelpers } from "./demodata/complaintsDemoData.js";
import complaintsStyles from "./src/Complaints.js";

export default function Complaints() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // State management
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showStatusPicker, setShowStatusPicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [expandedComplaint, setExpandedComplaint] = useState(null);

  // Filter options
  const statusOptions = [
    { label: "All", value: "all" },
    { label: "Open", value: "open" },
    { label: "Resolved", value: "resolved" },
    { label: "Pending", value: "pending" },
  ];

  const categoryOptions = [
    { label: "All Categories", value: "all" },
    { label: "Food Quality", value: "Food Quality" },
    { label: "Service", value: "Service" },
    { label: "App Issue", value: "App Issue" },
    { label: "Billing", value: "Billing" },
    { label: "Pickup Delay", value: "Pickup Delay" },
    { label: "Other", value: "Other" },
  ];

  // Load complaints on component mount
  useEffect(() => {
    loadComplaints();
  }, [params.userId]);

  // Apply filters when complaints or filter values change
  useEffect(() => {
    applyFilters();
  }, [complaints, selectedStatus, selectedCategory]);

  const loadComplaints = () => {
    try {
      if (params.userId) {
        const userComplaints = userComplaintsHelpers.getUserComplaints(
          params.userId
        );
        setComplaints(userComplaints);
      } else {
        Alert.alert("Error", "User ID not found");
      }
    } catch (error) {
      console.error("Error loading complaints:", error);
      Alert.alert("Error", "Failed to load complaints");
    }
  };

  const applyFilters = () => {
    let filtered = complaints;
    filtered = userComplaintsHelpers.filterByStatus(filtered, selectedStatus);
    filtered = userComplaintsHelpers.filterByCategory(
      filtered,
      selectedCategory
    );
    setFilteredComplaints(filtered);
  };

  const toggleComplaintExpansion = (complaintId) => {
    setExpandedComplaint(
      expandedComplaint === complaintId ? null : complaintId
    );
  };

  const renderComplaintCard = ({ item }) => {
    const isExpanded = expandedComplaint === item.complaint_id;
    const statusColor = userComplaintsHelpers.getStatusColor(item.status);
    const categoryIcon = userComplaintsHelpers.getCategoryIcon(item.category);

    return (
      <View
        style={[
          complaintsStyles.complaintCard,
          { borderLeftColor: statusColor },
        ]}
      >
        {/* Header */}
        <TouchableOpacity
          style={complaintsStyles.complaintCardHeader}
          onPress={() => toggleComplaintExpansion(item.complaint_id)}
        >
          <View style={complaintsStyles.complaintCardHeaderLeft}>
            <Ionicons
              name={categoryIcon}
              size={20}
              color={SETTINGS_COLORS.primary}
            />
            <View style={complaintsStyles.complaintCardHeaderText}>
              <Text
                style={complaintsStyles.complaintCardTitle}
                numberOfLines={isExpanded ? 0 : 1}
              >
                {item.title}
              </Text>
              <View style={complaintsStyles.complaintCardMeta}>
                <Text
                  style={[
                    complaintsStyles.complaintStatusBadge,
                    { backgroundColor: statusColor },
                  ]}
                >
                  {item.status.toUpperCase()}
                </Text>
                <Text style={complaintsStyles.complaintCardDate}>
                  {userComplaintsHelpers.formatDate(item.created_date)}
                </Text>
              </View>
            </View>
          </View>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={20}
            color={SETTINGS_COLORS.gray}
          />
        </TouchableOpacity>

        {/* Expanded Content */}
        {isExpanded && (
          <View style={complaintsStyles.complaintDetailsContainer}>
            <Text style={complaintsStyles.complaintDetailLabel}>Category:</Text>
            <Text style={complaintsStyles.complaintDetailText}>
              {item.category}
            </Text>

            <Text style={complaintsStyles.complaintDetailLabel}>
              Description:
            </Text>
            <Text style={complaintsStyles.complaintDescriptionText}>
              {item.description}
            </Text>

            {/* Admin Response for Resolved Complaints */}
            {item.status === "resolved" && item.admin_response && (
              <View style={complaintsStyles.complaintAdminResponseContainer}>
                <View style={complaintsStyles.complaintsFlexRow}>
                  <Ionicons name="checkmark-circle" size={16} color="#51cf66" />
                  <Text
                    style={[
                      complaintsStyles.complaintAdminResponseHeader,
                      { marginLeft: 6, marginBottom: 0 },
                    ]}
                  >
                    Admin Response
                  </Text>
                </View>
                <Text
                  style={[
                    complaintsStyles.complaintAdminResponseText,
                    { marginTop: 8 },
                  ]}
                >
                  {item.admin_response.response_text}
                </Text>
                <Text style={complaintsStyles.complaintAdminResponseDate}>
                  Resolved on{" "}
                  {userComplaintsHelpers.formatDate(
                    item.admin_response.response_date
                  )}
                </Text>
              </View>
            )}

            {/* Status-specific messages */}
            {item.status === "open" && (
              <View
                style={[
                  complaintsStyles.complaintStatusMessage,
                  { backgroundColor: "#fee2e2" },
                ]}
              >
                <Ionicons name="time-outline" size={16} color="#dc2626" />
                <Text
                  style={[
                    complaintsStyles.complaintStatusMessageText,
                    { color: "#dc2626" },
                  ]}
                >
                  Your complaint is being reviewed. We'll respond soon.
                </Text>
              </View>
            )}

            {item.status === "pending" && (
              <View style={complaintsStyles.complaintStatusMessage}>
                <Ionicons name="hourglass-outline" size={16} color="#d97706" />
                <Text
                  style={[
                    complaintsStyles.complaintStatusMessageText,
                    { color: "#d97706" },
                  ]}
                >
                  We're working on resolving your complaint. Please wait for
                  updates.
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  const renderFilterPicker = (
    title,
    options,
    selectedValue,
    onValueChange,
    isVisible,
    onClose
  ) => (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={complaintsStyles.complaintsModalOverlay}>
        <View style={complaintsStyles.complaintsPickerContainer}>
          <View style={complaintsStyles.complaintsPickerHeader}>
            <Text style={complaintsStyles.complaintsPickerTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons
                name="close"
                size={24}
                color={SETTINGS_COLORS.primary}
              />
            </TouchableOpacity>
          </View>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => {
              onValueChange(itemValue);
              onClose();
            }}
            style={complaintsStyles.complaintsPicker}
          >
            {options.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        </View>
      </View>
    </Modal>
  );

  // Get stats for display
  const stats = userComplaintsHelpers.getComplaintStats(params.userId);

  return (
    <View style={complaintsStyles.complaintsContainer}>
      {/* Header */}
      <View style={complaintsStyles.complaintsHeader}>
        <View style={complaintsStyles.complaintsHeaderContent}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={SETTINGS_COLORS.accent}
            />
          </TouchableOpacity>
          <Text style={complaintsStyles.complaintsTitle}>My Complaints</Text>
        </View>
      </View>

      {/* Stats Summary */}
      <View style={complaintsStyles.complaintsStatsContainer}>
        <View style={complaintsStyles.complaintsStatItem}>
          <Text style={complaintsStyles.complaintsStatNumber}>
            {stats.total}
          </Text>
          <Text style={complaintsStyles.complaintsStatLabel}>Total</Text>
        </View>
        <View style={complaintsStyles.complaintsStatItem}>
          <Text
            style={[
              complaintsStyles.complaintsStatNumber,
              { color: "#ff6b6b" },
            ]}
          >
            {stats.open}
          </Text>
          <Text style={complaintsStyles.complaintsStatLabel}>Open</Text>
        </View>
        <View style={complaintsStyles.complaintsStatItem}>
          <Text
            style={[
              complaintsStyles.complaintsStatNumber,
              { color: "#51cf66" },
            ]}
          >
            {stats.resolved}
          </Text>
          <Text style={complaintsStyles.complaintsStatLabel}>Resolved</Text>
        </View>
        <View style={complaintsStyles.complaintsStatItem}>
          <Text
            style={[
              complaintsStyles.complaintsStatNumber,
              { color: "#ffd43b" },
            ]}
          >
            {stats.pending}
          </Text>
          <Text style={complaintsStyles.complaintsStatLabel}>Pending</Text>
        </View>
      </View>

      {/* Filters */}
      <View style={complaintsStyles.complaintsFiltersContainer}>
        <TouchableOpacity
          style={complaintsStyles.complaintsFilterButton}
          onPress={() => setShowStatusPicker(true)}
        >
          <Text style={complaintsStyles.complaintsFilterButtonText}>
            Status:{" "}
            {statusOptions.find((opt) => opt.value === selectedStatus)?.label}
          </Text>
          <Ionicons
            name="chevron-down"
            size={16}
            color={SETTINGS_COLORS.gray}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={complaintsStyles.complaintsFilterButton}
          onPress={() => setShowCategoryPicker(true)}
        >
          <Text
            style={complaintsStyles.complaintsFilterButtonText}
            numberOfLines={1}
          >
            {
              categoryOptions.find((opt) => opt.value === selectedCategory)
                ?.label
            }
          </Text>
          <Ionicons
            name="chevron-down"
            size={16}
            color={SETTINGS_COLORS.gray}
          />
        </TouchableOpacity>
      </View>

      {/* Complaints List */}
      {filteredComplaints.length === 0 ? (
        <View style={complaintsStyles.complaintsEmptyContainer}>
          <Ionicons name="chatbubble-outline" size={60} color="#ccc" />
          <Text style={complaintsStyles.complaintsEmptyText}>
            {complaints.length === 0
              ? "No complaints submitted yet"
              : "No complaints match your current filters"}
          </Text>
          {complaints.length === 0 && (
            <Text
              style={[
                complaintsStyles.complaintsEmptyText,
                { fontSize: 14, marginTop: 5 },
              ]}
            >
              Submit your first complaint through Help & Support
            </Text>
          )}
        </View>
      ) : (
        <FlatList
          data={filteredComplaints}
          renderItem={renderComplaintCard}
          keyExtractor={(item) => item.complaint_id}
          style={complaintsStyles.complaintsListContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Filter Modals */}
      {renderFilterPicker(
        "Filter by Status",
        statusOptions,
        selectedStatus,
        setSelectedStatus,
        showStatusPicker,
        () => setShowStatusPicker(false)
      )}

      {renderFilterPicker(
        "Filter by Category",
        categoryOptions,
        selectedCategory,
        setSelectedCategory,
        showCategoryPicker,
        () => setShowCategoryPicker(false)
      )}
    </View>
  );
}
