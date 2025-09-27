import { StyleSheet } from "react-native";

export const TERMS_COLORS = {
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

const TERMS_GLOBAL = {
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textBold: {
    fontWeight: "bold",
    color: TERMS_COLORS.text,
  },
};

const termsStyles = StyleSheet.create({
  /* ===== Terms and Conditions Page ===== */
  termsContainer: {
    flex: 1,
    backgroundColor: TERMS_COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 50,
  },

  termsLogo: {
    width: 180,
    height: 90,
    alignSelf: "center",
    marginBottom: 25,
    resizeMode: "contain",
  },

  termsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: TERMS_COLORS.white,
    textAlign: "center",
    marginBottom: 20,
  },

  termsCard: {
    flex: 1,
    backgroundColor: TERMS_COLORS.white,
    borderRadius: 15,
    padding: 20,
    ...TERMS_GLOBAL.shadow,
  },

  termsScroll: {
    flex: 1,
    marginBottom: 20,
  },

  termsText: {
    fontSize: 14,
    lineHeight: 22,
    color: TERMS_COLORS.text,
    textAlign: "justify",
  },

  termsCheckboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 10,
  },

  termsCheckboxText: {
    fontSize: 16,
    color: TERMS_COLORS.text,
    marginLeft: 12,
    flex: 1,
    fontWeight: "500",
  },

  termsAcceptBtn: {
    backgroundColor: TERMS_COLORS.primary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    ...TERMS_GLOBAL.shadow,
  },

  termsAcceptText: {
    fontSize: 16,
    fontWeight: "bold",
    color: TERMS_COLORS.white,
    letterSpacing: 1,
  },
});

export default termsStyles;
