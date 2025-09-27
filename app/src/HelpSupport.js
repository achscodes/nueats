import { StyleSheet } from "react-native";

export const HELP_COLORS = {
  primary: "#2c3e91",
  primaryDark: "#1a237e",
  accent: "#FFD700",
  accentAlt: "#ffeb3b",
  danger: "#D32F2F",
  success: "#4CAF50",
  purpleDeep: "#500099",
  lightBg: "#f5f5f5",
  white: "#ffffff",
  text: "#333333",
  textLight: "#666666",
  gray: "#666666",
  border: "#ddd",
  lightGray: "#f8f9fa",
};

const HELP_GLOBAL = {
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shadowStrong: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};

const helpSupportStyles = StyleSheet.create({
  /* ===== Main Container ===== */
  helpContainer: {
    flex: 1,
    backgroundColor: HELP_COLORS.lightBg,
  },

  /* ===== Header ===== */
  helpHeader: {
    backgroundColor: HELP_COLORS.primaryDark,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  helpHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  helpBackButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 215, 0, 0.1)",
  },

  helpTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: HELP_COLORS.white,
    fontFamily: "Poppins",
    flex: 1,
    textAlign: "center",
    marginRight: 40, // Balance the back button
  },

  /* ===== Content Container ===== */
  helpContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  /* ===== Section Styles ===== */
  helpSection: {
    backgroundColor: HELP_COLORS.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
    ...HELP_GLOBAL.shadow,
  },

  helpSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: HELP_COLORS.primary,
    fontFamily: "Poppins",
    marginBottom: 15,
    textAlign: "center",
  },

  /* ===== FAQ Styles ===== */
  faqItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: HELP_COLORS.lightGray,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: HELP_COLORS.accent,
  },

  faqQuestion: {
    fontSize: 16,
    fontWeight: "600",
    color: HELP_COLORS.text,
    fontFamily: "Poppins",
    marginBottom: 8,
  },

  faqAnswer: {
    fontSize: 14,
    color: HELP_COLORS.textLight,
    fontFamily: "Poppins",
    lineHeight: 20,
  },

  /* ===== Contact Options ===== */
  contactOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: HELP_COLORS.lightGray,
    borderRadius: 12,
    marginBottom: 12,
    ...HELP_GLOBAL.shadow,
  },

  contactIcon: {
    marginRight: 15,
    width: 24,
    alignItems: "center",
  },

  contactInfo: {
    flex: 1,
  },

  contactTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: HELP_COLORS.text,
    fontFamily: "Poppins",
  },

  contactDetail: {
    fontSize: 14,
    color: HELP_COLORS.textLight,
    fontFamily: "Poppins",
    marginTop: 2,
  },

  /* ===== Action Buttons ===== */
  actionButton: {
    backgroundColor: HELP_COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    ...HELP_GLOBAL.shadowStrong,
  },

  actionButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: HELP_COLORS.white,
    fontFamily: "Poppins",
    textAlign: "center",
  },

  secondaryButton: {
    backgroundColor: HELP_COLORS.white,
    borderWidth: 2,
    borderColor: HELP_COLORS.primary,
  },

  secondaryButtonText: {
    color: HELP_COLORS.primary,
  },

  /* ===== Emergency Contact ===== */
  emergencySection: {
    backgroundColor: HELP_COLORS.danger,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    ...HELP_GLOBAL.shadowStrong,
  },

  emergencyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: HELP_COLORS.white,
    fontFamily: "Poppins",
    textAlign: "center",
    marginBottom: 10,
  },

  emergencyText: {
    fontSize: 14,
    color: HELP_COLORS.white,
    fontFamily: "Poppins",
    textAlign: "center",
    lineHeight: 20,
  },

  emergencyButton: {
    backgroundColor: HELP_COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15,
  },

  emergencyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: HELP_COLORS.danger,
    fontFamily: "Poppins",
    textAlign: "center",
  },

  /* ===== Modal Styles ===== */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    backgroundColor: HELP_COLORS.white,
    margin: 20,
    borderRadius: 20,
    padding: 20,
    minHeight: 400,
    width: "90%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: HELP_COLORS.primary,
  },

  modalScrollView: {
    flex: 1,
  },

  /* ===== Form Input Styles ===== */
  inputGroup: {
    marginBottom: 20,
  },

  inputGroupDropdown: {
    marginBottom: 20,
    zIndex: 2000,
    elevation: 2000,
  },

  inputGroupDropdownOpen: {
    marginBottom: 160, // Space for all 6 dropdown items (6 * 48px = 288px, but we use 160 for better spacing)
    zIndex: 2000,
    elevation: 2000,
  },

  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: HELP_COLORS.text,
    marginBottom: 8,
  },

  dropdownContainer: {
    position: "relative",
    zIndex: 2000,
    elevation: 2000,
  },

  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: HELP_COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: HELP_COLORS.white,
    zIndex: 1,
  },

  dropdownButtonActive: {
    borderColor: HELP_COLORS.primary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    zIndex: 2,
  },

  dropdownButtonText: {
    fontSize: 16,
    color: HELP_COLORS.text,
  },

  dropdownPlaceholder: {
    color: HELP_COLORS.gray,
  },

  dropdownList: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: HELP_COLORS.primary,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: HELP_COLORS.white,
    zIndex: 3000,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  dropdownItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: HELP_COLORS.lightGray,
    minHeight: 48,
    justifyContent: "center",
  },

  dropdownItemLast: {
    borderBottomWidth: 0,
  },

  dropdownItemText: {
    fontSize: 16,
    color: HELP_COLORS.text,
  },

  textInput: {
    borderWidth: 1,
    borderColor: HELP_COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: HELP_COLORS.text,
    backgroundColor: HELP_COLORS.white,
  },

  textArea: {
    height: 120,
    textAlignVertical: "top",
  },

  characterCount: {
    fontSize: 12,
    color: HELP_COLORS.gray,
    textAlign: "right",
    marginTop: 5,
  },

  sendReportButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 10,
  },

  sendReportButtonActive: {
    backgroundColor: HELP_COLORS.primary,
  },

  sendReportButtonDisabled: {
    backgroundColor: HELP_COLORS.gray,
    opacity: 0.6,
  },

  sendReportButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: HELP_COLORS.white,
    textAlign: "center",
  },
});

export default helpSupportStyles;
