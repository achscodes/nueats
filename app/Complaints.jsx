import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import { SETTINGS_COLORS } from "./src/Setting.js";
import { userComplaintsHelpers } from "./demodata/complaintsDemoData.js";
import complaintsStyles from "./src/Complaints.js";
import { useAuth } from "./context/AuthContext";
import { supabase } from "../lib/supabase";

export default function Complaints() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user: authUser, isGuest } = useAuth();

  // State management
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showStatusPicker, setShowStatusPicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [expandedComplaint, setExpandedComplaint] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState({ total: 0, open: 0, resolved: 0, pending: 0 });

  // Filter options
  const statusOptions = [
    { label: "All", value: "all" },
    { label: "Open", value: "open" },
    { label: "Resolved", value: "resolved" },
    { label: "Pending", value: "pending" },
  ];

  const categoryOptions = [
    { label: "All Categories", value: "all" },
    { label: "Food Quality", value: "food quality" },
    { label: "Service", value: "service" },
    { label: "App Issue", value: "app issue" },
    { label: "Billing", value: "billing" },
    { label: "Pickup Delay", value: "pickup delay" },
    { label: "Other", value: "other" },
  ];

  // Load complaints when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadComplaints();
    }, [authUser])
  );

  // Apply filters when complaints or filter values change
  useEffect(() => {
    applyFilters();
    calculateStats();
  }, [complaints, selectedStatus, selectedCategory]);

  // Debug: Log modal state changes
  useEffect(() => {
    console.log('Status Picker visible:', showStatusPicker);
  }, [showStatusPicker]);

  useEffect(() => {
    console.log('Category Picker visible:', showCategoryPicker);
  }, [showCategoryPicker]);

  // Debug: Log options on mount
  useEffect(() => {
    console.log('Status Options:', statusOptions);
    console.log('Category Options:', categoryOptions);
  }, []);

  const loadComplaints = async () => {
    if (!authUser || isGuest) {
      setIsLoading(false);
      setComplaints([]);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('complaints')
        .select('*')
        .eq('user_id', authUser.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to match existing component structure
      const transformedComplaints = data.map(complaint => ({
        complaint_id: complaint.complaint_id.toString(),
        title: complaint.title,
        category: complaint.category,
        description: complaint.description,
        status: complaint.status.toLowerCase(),
        created_date: complaint.created_at,
        resolved_date: complaint.resolved_at,
      }));

      setComplaints(transformedComplaints);
    } catch (error) {
      console.error("Error loading complaints:", error);
      Alert.alert("Error", "Failed to load complaints");
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await loadComplaints();
    setIsRefreshing(false);
  };

  const calculateStats = () => {
    const total = complaints.length;
    const open = complaints.filter(c => c.status === 'open').length;
    const resolved = complaints.filter(c => c.status === 'resolved').length;
    const pending = complaints.filter(c => c.status === 'pending').length;
    setStats({ total, open, resolved, pending });
  };

  const applyFilters = () => {
    let filtered = [...complaints];
    
    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(c => c.status === selectedStatus);
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }
    
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
                  {new Date(item.created_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
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
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
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
  ) => {
    console.log(`Rendering ${title} modal. Visible: ${isVisible}, Options count: ${options.length}`);
    
    return (
      <Modal 
        visible={isVisible} 
        transparent={true} 
        animationType="slide" 
        onRequestClose={onClose}
      >
        <View style={complaintsStyles.complaintsModalOverlay}>
          <View style={complaintsStyles.complaintsPickerContainer}>
            <View style={complaintsStyles.complaintsPickerHeader}>
              <Text style={complaintsStyles.complaintsPickerTitle}>{title}</Text>
              <TouchableOpacity onPress={() => {
                console.log(`Closing ${title} via X button`);
                onClose();
              }}>
                <Ionicons
                  name="close"
                  size={24}
                  color={SETTINGS_COLORS.primary}
                />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={{ maxHeight: 300 }}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={{
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#eee',
                    backgroundColor: selectedValue === option.value ? '#f0f0f0' : '#fff',
                  }}
                  onPress={() => {
                    console.log(`${title} value changed to:`, option.value);
                    onValueChange(option.value);
                    onClose();
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ 
                      fontSize: 16, 
                      color: SETTINGS_COLORS.text,
                      fontWeight: selectedValue === option.value ? 'bold' : 'normal'
                    }}>
                      {option.label}
                    </Text>
                    {selectedValue === option.value && (
                      <Ionicons name="checkmark" size={20} color={SETTINGS_COLORS.primary} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  // Show loading state
  if (isLoading) {
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={SETTINGS_COLORS.primary} />
          <Text style={{ marginTop: 10, color: SETTINGS_COLORS.gray }}>
            Loading complaints...
          </Text>
        </View>
      </View>
    );
  }

  // Show guest message
  if (!authUser || isGuest) {
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Ionicons name="lock-closed-outline" size={60} color="#ccc" />
          <Text style={{ marginTop: 10, fontSize: 16, color: SETTINGS_COLORS.gray, textAlign: 'center' }}>
            Please log in to view your complaints
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: SETTINGS_COLORS.primary,
              paddingHorizontal: 30,
              paddingVertical: 12,
              borderRadius: 8,
            }}
            onPress={() => router.push('/Login')}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

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
          onPress={() => {
            console.log('Opening status picker...');
            setShowStatusPicker(true);
          }}
        >
          <Text style={complaintsStyles.complaintsFilterButtonText}>
            Status:{" "}
            {statusOptions.find((opt) => opt.value === selectedStatus)?.label || "All"}
          </Text>
          <Ionicons
            name="chevron-down"
            size={16}
            color={SETTINGS_COLORS.gray}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={complaintsStyles.complaintsFilterButton}
          onPress={() => {
            console.log('Opening category picker...');
            setShowCategoryPicker(true);
          }}
        >
          <Text
            style={complaintsStyles.complaintsFilterButtonText}
            numberOfLines={1}
          >
            {
              categoryOptions.find((opt) => opt.value === selectedCategory)
                ?.label || "All Categories"
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
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={[SETTINGS_COLORS.primary]}
            />
          }
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
