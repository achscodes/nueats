import { StyleSheet } from "react-native";
import { SETTINGS_COLORS } from "./Setting.js";

const complaintsStyles = StyleSheet.create({
  // Main container
  complaintsContainer: {
    flex: 1,
    backgroundColor: SETTINGS_COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  // Header styles
  complaintsHeader: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: SETTINGS_COLORS.border,
    marginBottom: 20,
  },
  complaintsHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  complaintsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: SETTINGS_COLORS.primary,
    marginLeft: 12,
  },

  // Statistics section
  complaintsStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: SETTINGS_COLORS.lightBg,
    paddingVertical: 15,
    marginHorizontal: -20,
    marginBottom: 20,
  },
  complaintsStatItem: {
    alignItems: "center",
  },
  complaintsStatNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: SETTINGS_COLORS.primary,
  },
  complaintsStatLabel: {
    fontSize: 12,
    color: SETTINGS_COLORS.gray,
    marginTop: 2,
  },

  // Filters section
  complaintsFiltersContainer: {
    flexDirection: "row",
    marginBottom: 15,
    gap: 10,
  },
  complaintsFilterButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: SETTINGS_COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: SETTINGS_COLORS.border,
  },
  complaintsFilterButtonText: {
    fontSize: 14,
    color: SETTINGS_COLORS.text,
    fontWeight: "500",
    flex: 1,
  },

  // Complaints list
  complaintsListContainer: {
    flex: 1,
  },
  complaintCard: {
    backgroundColor: SETTINGS_COLORS.white,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  complaintCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  complaintCardHeaderLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  complaintCardHeaderText: {
    marginLeft: 12,
    flex: 1,
  },
  complaintCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: SETTINGS_COLORS.text,
    marginBottom: 6,
    lineHeight: 22,
  },
  complaintCardMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  complaintStatusBadge: {
    fontSize: 9,
    color: SETTINGS_COLORS.white,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    fontWeight: "bold",
    marginRight: 8,
  },
  complaintCardDate: {
    fontSize: 11,
    color: SETTINGS_COLORS.gray,
  },

  // Complaint details (expanded view)
  complaintDetailsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderTopColor: SETTINGS_COLORS.border,
  },
  complaintDetailLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: SETTINGS_COLORS.gray,
    marginTop: 12,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  complaintDetailText: {
    fontSize: 14,
    color: SETTINGS_COLORS.text,
  },
  complaintDescriptionText: {
    fontSize: 14,
    color: SETTINGS_COLORS.text,
    lineHeight: 20,
  },

  // Admin response section
  complaintAdminResponseContainer: {
    backgroundColor: "#f0f9ff",
    borderRadius: 8,
    padding: 12,
    marginTop: 15,
    borderLeftWidth: 3,
    borderLeftColor: "#51cf66",
  },
  complaintAdminResponseHeader: {
    fontSize: 14,
    fontWeight: "600",
    color: "#065f46",
    marginBottom: 8,
  },
  complaintAdminResponseText: {
    fontSize: 14,
    color: "#065f46",
    lineHeight: 18,
    marginBottom: 8,
  },
  complaintAdminResponseDate: {
    fontSize: 12,
    color: "#059669",
    fontStyle: "italic",
  },

  // Status message
  complaintStatusMessage: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef3cd",
    padding: 10,
    borderRadius: 6,
    marginTop: 12,
  },
  complaintStatusMessageText: {
    fontSize: 12,
    color: "#92400e",
    marginLeft: 6,
    flex: 1,
  },

  // Empty state
  complaintsEmptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  complaintsEmptyText: {
    fontSize: 16,
    color: SETTINGS_COLORS.gray,
    marginTop: 15,
    textAlign: "center",
  },

  // Modal styles
  complaintsModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  complaintsPickerContainer: {
    backgroundColor: SETTINGS_COLORS.white,
    borderRadius: 12,
    marginHorizontal: 30,
    maxHeight: 400,
  },
  complaintsPickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: SETTINGS_COLORS.border,
  },
  complaintsPickerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: SETTINGS_COLORS.text,
  },
  complaintsPicker: {
    marginHorizontal: 10,
  },

  // Additional utility styles
  complaintsFlexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  complaintsTextBold: {
    fontWeight: "bold",
  },
  complaintsTextCenter: {
    textAlign: "center",
  },
  complaintsMarginTop: {
    marginTop: 10,
  },
  complaintsMarginBottom: {
    marginBottom: 10,
  },
});

export default complaintsStyles;
