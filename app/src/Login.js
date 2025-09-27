import { StyleSheet } from "react-native";

const COLORS = {
  primary: "#2c3e91",
  primaryDark: "#1a237e",
  accent: "#FFD700",
  white: "#ffffff",
  text: "#333333",
  gray: "#666666",
};

const loginStyles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  bgImage: {
    resizeMode: "cover",
  },

  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  logo: {
    width: 200,
    height: 100,
    marginBottom: 30,
  },

  loginCard: {
    backgroundColor: "rgba(44, 62, 145, 0.9)",
    borderRadius: 20,
    padding: 30,
    width: "100%",
    maxWidth: 350,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },

  loginHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 25,
    textAlign: "center",
  },

  loginWelcome: {
    color: COLORS.accent,
  },

  loginInput: {
    width: "100%",
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  passwordInputContainer: {
    position: "relative",
    width: "100%",
  },

  passwordInput: {
    width: "100%",
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingRight: 50,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 7,
    padding: 5,
  },

  loginOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 25,
  },

  remember: {
    color: COLORS.white,
    fontSize: 14,
  },

  forgot: {
    color: COLORS.accent,
    fontSize: 14,
    textDecorationLine: "underline",
  },

  loginBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  loginBtnText: {
    color: COLORS.primaryDark,
    fontSize: 18,
    fontWeight: "bold",
  },

  loginSignupRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  loginSignupLink: {
    color: COLORS.accent,
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  guestOption: {
    marginTop: 15,
    alignItems: "center",
  },

  guestText: {
    color: COLORS.accent,
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default loginStyles;
