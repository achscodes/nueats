import { StyleSheet } from "react-native";

export const SIGNUP_COLORS = {
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
  transparent: "rgba(255, 255, 255, 0.9)",
};

const SIGNUP_GLOBAL = {
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textBold: {
    fontWeight: "bold",
    color: SIGNUP_COLORS.text,
  },
};

const signupStyles = StyleSheet.create({
  /* ===== Background ===== */
  background: {
    flex: 1,
  },
  bgImage: {
    opacity: 0.8,
  },

  /* ===== Main Container ===== */
  signupContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: "30%",
    paddingBottom: 40,
    flexGrow: 1,
    justifyContent: "flex-start",
  },

  /* ===== Logo ===== */
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain",
  },

  /* ===== Signup Card ===== */
  signupCard: {
    backgroundColor: "rgba(44, 62, 145, 0.9)",
    borderRadius: 15,
    padding: 25,
    width: "100%",
    maxWidth: 350,
    ...SIGNUP_GLOBAL.shadow,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    marginBottom: 70,
  },

  signupHeader: {
    fontSize: 28,
    fontWeight: "bold",
    color: SIGNUP_COLORS.accent,
    textAlign: "center",
    marginBottom: 20,
  },

  /* ===== Login Link Row ===== */
  loginSignupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  loginSignupLink: {
    color: SIGNUP_COLORS.accent,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  /* ===== Input Fields ===== */
  signupRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  signupInput: {
    backgroundColor: SIGNUP_COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: SIGNUP_COLORS.border,
    color: SIGNUP_COLORS.text,
    ...SIGNUP_GLOBAL.shadow,
  },

  signupPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: SIGNUP_COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: SIGNUP_COLORS.border,
    ...SIGNUP_GLOBAL.shadow,
  },

  signupPasswordInput: {
    flex: 1,
    fontSize: 16,
    color: SIGNUP_COLORS.text,
  },

  eyeIcon: {
    padding: 5,
    marginLeft: 10,
  },

  signupInputHalf: {
    backgroundColor: SIGNUP_COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: SIGNUP_COLORS.border,
    color: SIGNUP_COLORS.text,
    width: "48%",
    ...SIGNUP_GLOBAL.shadow,
  },

  /* ===== Button ===== */
  signupBtn: {
    backgroundColor: SIGNUP_COLORS.accent,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
    ...SIGNUP_GLOBAL.shadow,
    marginBottom: 20,
  },

  signupBtnText: {
    color: SIGNUP_COLORS.primaryDark,
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default signupStyles;
