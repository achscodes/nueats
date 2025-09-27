import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const ORDER_COLORS = {
  primary: "#2c3e91",
  primaryDark: "#1a237e",
  accent: "#FFD700",
  accentAlt: "#ffeb3b",
  titlecolor: "#FFD33A",
  danger: "#D32F2F",
  purpleDeep: "#500099",
  lightBg: "#f5f5f5",
  white: "#ffffff",
  text: "#333333",
  textLight: "#666666",
  gray: "#666666",
  border: "#ddd",
  success: "#4CAF50",
  lightGray: "#f8f9fa",
  darkGray: "#999",
  overlay: "rgba(0,0,0,0.5)",
};

const ORDER_GLOBAL = {
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  shadowStrong: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  shadowSoft: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
};

const orderStyles = StyleSheet.create({
  /* ===== Main Container ===== */
  orderContainer: {
    flex: 1,
    backgroundColor: ORDER_COLORS.lightBg,
  },

  /* ===== Header Container ===== */
  orderHeaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: ORDER_COLORS.primaryDark,
  },

  /* ===== Header ===== */
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 30,
    backgroundColor: ORDER_COLORS.primaryDark,
  },

  orderLogoSmall: {
    width: 80,
    height: 40,
    resizeMode: "contain",
  },

  orderBackButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 215, 0, 0.1)",
  },

  orderProfileButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 215, 0, 0.1)",
  },

  /* ===== Image Container ===== */
  orderImageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: screenHeight * 0.4,
    overflow: "hidden",
    zIndex: 1,
  },

  orderBackgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  orderImageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  orderTitleOverlay: {
    position: "absolute",
    top: "50%",
    left: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    transform: [{ translateY: -30 }],
  },

  orderFoodTitleLarge: {
    fontSize: 48,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: ORDER_COLORS.titlecolor,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2,
  },

  /* ===== Scroll Container ===== */
  orderScrollContainer: {
    flex: 1,
    zIndex: 2,
  },

  /* ===== Content Container with Curved Top ===== */
  orderContentContainer: {
    backgroundColor: ORDER_COLORS.lightBg,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 50,
    minHeight: screenHeight * 0.5,
    ...ORDER_GLOBAL.shadowStrong,
    shadowOffset: { width: 0, height: -5 },
    elevation: 10,
  },

  /* ===== Details Card ===== */
  orderDetailsCard: {
    backgroundColor: ORDER_COLORS.white,
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    ...ORDER_GLOBAL.shadowStrong,
  },

  orderDetailsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  orderDetailsLeft: {
    flex: 1,
    paddingRight: 15,
  },

  orderFoodName: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: ORDER_COLORS.primary,
    marginBottom: 8,
    textAlign: "left",
  },

  orderFoodDescription: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: ORDER_COLORS.textLight,
    lineHeight: 20,
    textAlign: "left",
  },

  orderPriceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "flex-end",
  },

  orderCurrencySymbol: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: ORDER_COLORS.primary,
  },

  orderPriceNumber: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: ORDER_COLORS.primary,
    marginLeft: 2,
  },

  /* ===== Quantity Card ===== */
  orderQuantityCard: {
    backgroundColor: ORDER_COLORS.white,
    borderRadius: 20,
    padding: 25,
    marginBottom: 25,
    marginTop: 10,
    ...ORDER_GLOBAL.shadow,
  },

  orderQuantityLabel: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: ORDER_COLORS.text,
    textAlign: "center",
    marginBottom: 20,
  },

  orderQuantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  orderQuantityButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    ...ORDER_GLOBAL.shadow,
  },

  orderQuantityButtonDisabled: {
    opacity: 0.5,
  },

  orderQuantityButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  orderQuantityDisplay: {
    backgroundColor: ORDER_COLORS.lightBg,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: ORDER_COLORS.primary,
    ...ORDER_GLOBAL.shadowSoft,
  },

  orderQuantityNumber: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: ORDER_COLORS.primary,
    textAlign: "center",
    minWidth: 40,
  },

  /* ===== Add to Cart Button ===== */
  orderAddToCartButton: {
    borderRadius: 25,
    overflow: "hidden",
    ...ORDER_GLOBAL.shadowStrong,
    marginTop: 10,
    marginBottom: 30,
  },

  orderAddToCartGradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 30,
  },

  orderAddToCartText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: ORDER_COLORS.white,
    letterSpacing: 1,
    marginRight: 10,
  },

  orderCartIcon: {
    marginLeft: 5,
  },

  /* ===== Guest Mode Modal ===== */
  orderModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  orderModalContainer: {
    backgroundColor: ORDER_COLORS.white,
    borderRadius: 25,
    padding: 30,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    ...ORDER_GLOBAL.shadowStrong,
    elevation: 10,
  },

  orderModalHeader: {
    alignItems: "center",
    marginBottom: 20,
  },

  orderModalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: ORDER_COLORS.primary,
    marginTop: 10,
    textAlign: "center",
  },

  orderModalText: {
    fontSize: 16,
    color: ORDER_COLORS.gray,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
  },

  orderModalButtons: {
    width: "100%",
    marginBottom: 20,
  },

  orderModalLoginButton: {
    backgroundColor: ORDER_COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
    ...ORDER_GLOBAL.shadow,
  },

  orderModalLoginText: {
    color: ORDER_COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  orderModalSignUpButton: {
    backgroundColor: ORDER_COLORS.accent,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    ...ORDER_GLOBAL.shadow,
  },

  orderModalSignUpText: {
    color: ORDER_COLORS.primaryDark,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  orderModalCloseButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  orderModalCloseText: {
    color: ORDER_COLORS.gray,
    fontSize: 14,
    textAlign: "center",
    textDecorationLine: "underline",
  },

  /* ===== Additional Styles for Effects ===== */
  orderGlowEffect: {
    shadowColor: ORDER_COLORS.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 12,
  },

  orderPulseAnimation: {
    transform: [{ scale: 1.05 }],
  },

  orderFadeIn: {
    opacity: 1,
  },

  orderSlideUp: {
    transform: [{ translateY: 0 }],
  },

  orderScaleIn: {
    transform: [{ scale: 1 }],
  },
});

export default orderStyles;
