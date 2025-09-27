import { StyleSheet } from "react-native";

export const SETTINGS_COLORS = {
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
};

const SETTINGS_GLOBAL = {
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textBold: {
    fontWeight: "bold",
    color: SETTINGS_COLORS.text,
  },
};

const settingsStyles = StyleSheet.create({
  /* ===== Settings Page ===== */
  settingsContainer: {
    flex: 1,
    backgroundColor: SETTINGS_COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  settingsHeader: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: SETTINGS_COLORS.border,
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: SETTINGS_COLORS.primary,
    marginLeft: 12,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: SETTINGS_COLORS.lightBg,
    padding: 18,
    borderRadius: 12,
    marginBottom: 16,
    minHeight: 65,
    ...SETTINGS_GLOBAL.shadow,
  },
  optionLogo: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    marginRight: 15,
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "500",
    color: SETTINGS_COLORS.text,
    fontFamily: "Poppins",
  },
  logoutButton: {
    marginTop: "auto",
    backgroundColor: SETTINGS_COLORS.danger,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 50,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: SETTINGS_COLORS.white,
    letterSpacing: 1,
  },
});

export default settingsStyles;
