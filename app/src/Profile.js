import { StyleSheet } from "react-native";

export const COLORS = {
  primary: "#2c3e91",
  primaryDark: "#1a237e",
  accent: "#FFD700",
  accentAlt: "#ffeb3b",
  danger: "#D32F2F",
  purpleDeep: "#500099",
  lightBg: "#f5f5f5",
  white: "#ffffff",
  text: "#333333",
  gray: "#666666",
  border: "#ddd",
  lightGray: "#f8f9fa",
  darkGray: "#495057",
};

const GLOBAL = {
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
};

const profileStyles = StyleSheet.create({
  // Main Container
  profileContainer: {
    flex: 1,
    backgroundColor: COLORS.lightBg,
  },

  // Header Section
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50, // Account for status bar
    backgroundColor: COLORS.primaryDark,
    ...GLOBAL.shadow,
  },

  profileHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.accent,
    letterSpacing: 0.5,
  },

  // Profile Card Section

  profileCard: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 15,
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderRadius: 20,
    ...GLOBAL.cardShadow,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  profileAvatar: {
    marginBottom: 12,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileAvatarImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },

  // Initials Avatar Styles
  initialsContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.primary,
  },

  initialsText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },

  editImageOverlay: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },

  profileName: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 2,
  },

  profileInputEditable: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
    paddingBottom: 5,
    marginHorizontal: 30,
    textAlign: 'center',
  },

  profileEditBtn: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: COLORS.lightBg,
  },

  // Info Cards Section
  profileInfoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 18,
    borderRadius: 12,
    ...GLOBAL.cardShadow,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  profileInfoIcon: {
    marginRight: 15,
    width: 24,
    alignItems: "center",
  },

  profileInfoContent: {
    flex: 1,
  },

  profileInfoText: {
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
    paddingRight: 10,
  },

  profileInfoTextEditable: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
    paddingBottom: 5,
  },

  // Notification Section
  notificationCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 18,
    borderRadius: 12,
    ...GLOBAL.cardShadow,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  notificationContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  notificationText: {
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 15,
  },

  // Switch Styling
  switchContainer: {
    marginLeft: "auto",
  },

  // Transaction History Section
  transactionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 18,
    borderRadius: 12,
    ...GLOBAL.cardShadow,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  transactionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  transactionText: {
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 15,
  },

  chevronIcon: {
    marginLeft: "auto",
  },

  // Edit Mode Styles
  editModeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 20,
  },

  saveButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 10,
  },

  cancelButton: {
    backgroundColor: COLORS.gray,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },

  // Loading and Error States
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightBg,
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightBg,
    paddingHorizontal: 20,
  },

  errorText: {
    fontSize: 16,
    color: COLORS.danger,
    textAlign: "center",
    marginTop: 10,
  },

  // Additional Utility Styles
  sectionSpacer: {
    height: 20,
  },

  profileSection: {
    marginTop: 10,
  },

  profileSectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.gray,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 20,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Bottom Padding for ScrollView (removed to prevent extra box at the bottom)

  // Address Section Styles
  addressCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 18,
    borderRadius: 12,
    ...GLOBAL.cardShadow,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  addressTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginLeft: 15,
  },

  addressContent: {
    marginLeft: 39,
  },

  addressText: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 20,
  },

  addressInputContainer: {
    marginBottom: 12,
  },

  addressLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  addressInput: {
    fontSize: 14,
    color: COLORS.text,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 8,
    paddingHorizontal: 0,
  },

  addressInputFocused: {
    borderBottomColor: COLORS.primary,
  },

  // Password Change Section
  passwordCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 18,
    borderRadius: 12,
    ...GLOBAL.cardShadow,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  passwordHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  passwordTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginLeft: 15,
  },

  passwordInputContainer: {
    marginLeft: 39,
    marginBottom: 15,
  },

  passwordLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 5,
  },

  passwordInput: {
    fontSize: 14,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: COLORS.lightGray,
  },

  passwordInputFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },

  // Action Buttons
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 10,
    gap: 12,
  },

  primaryActionButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  secondaryActionButton: {
    flex: 1,
    backgroundColor: COLORS.gray,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  dangerActionButton: {
    flex: 1,
    backgroundColor: COLORS.danger,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  actionButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 24,
    paddingBottom: 45,
    width: "85%",
    maxWidth: 400,
    ...GLOBAL.shadow,
  },

  modalHeader: {
    alignItems: "center",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
  },

  modalText: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: "center",
    lineHeight: 24,
    marginVertical: 10,
  },

  modalInputContainer: {
    marginVertical: 15,
  },

  modalInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: COLORS.lightGray,
  },

  modalInputFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },

  modalButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    minHeight: 50,
  },

  modalPrimaryButton: {
    backgroundColor: COLORS.primary,
  },

  modalSecondaryButton: {
    backgroundColor: COLORS.gray,
  },

  modalDangerButton: {
    backgroundColor: COLORS.danger,
  },

  modalButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },

  // Image Picker Modal Styles
  imagePickerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },

  // Success/Error Message Styles
  messageContainer: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    ...GLOBAL.cardShadow,
  },

  successMessage: {
    borderLeftColor: "#10b981",
    backgroundColor: "#ecfdf5",
  },

  errorMessage: {
    borderLeftColor: COLORS.danger,
    backgroundColor: "#fef2f2",
  },

  messageText: {
    fontSize: 14,
    fontWeight: "500",
  },

  successMessageText: {
    color: "#065f46",
  },

  errorMessageText: {
    color: COLORS.danger,
  },

  // Profile Menu Items
  profileMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginVertical: 4,
    padding: 16,
    borderRadius: 10,
    ...GLOBAL.cardShadow,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  profileMenuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  profileMenuItemIcon: {
    marginRight: 15,
    width: 24,
    alignItems: "center",
  },

  profileMenuItemText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "500",
  },

  profileMenuItemSubtext: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },

  profileMenuItemChevron: {
    marginLeft: "auto",
  },

  // Toggle Switch Styles
  customSwitch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },

  // Form Validation Styles
  inputError: {
    borderColor: COLORS.danger,
    borderWidth: 1,
  },

  errorTextInput: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: 5,
    marginLeft: 5,
  },

  // Loading Spinner Styles
  loadingSpinner: {
    marginVertical: 20,
  },
});

export default profileStyles;