import { StyleSheet } from "react-native";

export const CHECKOUT_COLORS = {
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

const CHECKOUT_GLOBAL = {
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textBold: {
    fontWeight: "bold",
    color: CHECKOUT_COLORS.text,
  },
};

const checkoutStyles = StyleSheet.create({
  /* ===== Main Container ===== */
  container: {
    flex: 1,
    backgroundColor: CHECKOUT_COLORS.primary,
  },

  /* ===== Header Section ===== */
  checkoutHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    paddingTop: 30,
    backgroundColor: CHECKOUT_COLORS.primaryDark,
  },
  checkoutBackButton: {
    padding: 5,
    marginRight: 10,
  },
  checkoutBackArrow: {
    fontSize: 24,
    color: CHECKOUT_COLORS.white,
    fontWeight: "bold",
  },
  checkoutHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: CHECKOUT_COLORS.white,
    flex: 1,
    textAlign: "center",
    marginRight: 39, // Compensate for back button width to center text
  },

  /* ===== Items Section ===== */
  itemsCard: {
    backgroundColor: CHECKOUT_COLORS.white,
    margin: 15,
    padding: 15,
    borderRadius: 12,
    ...CHECKOUT_GLOBAL.shadow,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: CHECKOUT_COLORS.text,
    marginBottom: 15,
  },
  checkoutItemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CHECKOUT_COLORS.lightBg,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: CHECKOUT_COLORS.border,
  },
  checkoutItemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: CHECKOUT_COLORS.border,
    marginRight: 12,
  },
  checkoutItemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: CHECKOUT_COLORS.text,
    marginBottom: 2,
  },
  checkoutItemQty: {
    fontSize: 14,
    color: CHECKOUT_COLORS.gray,
  },
  checkoutItemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: CHECKOUT_COLORS.primary,
    marginLeft: "auto",
  },

  /* ===== Payment Section ===== */
  paymentSection: {
    backgroundColor: CHECKOUT_COLORS.white,
    margin: 15,
    marginTop: 0,
    padding: 15,
    borderRadius: 12,
    ...CHECKOUT_GLOBAL.shadow,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: CHECKOUT_COLORS.text,
    marginBottom: 15,
  },
  method: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: CHECKOUT_COLORS.lightBg,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: CHECKOUT_COLORS.border,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: CHECKOUT_COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: CHECKOUT_COLORS.primary,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
    resizeMode: "contain",
  },
  label: {
    fontSize: 16,
    color: CHECKOUT_COLORS.text,
    fontWeight: "500",
  },

  /* ===== Bottom Section ===== */
  bottomSection: {
    backgroundColor: CHECKOUT_COLORS.white,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: CHECKOUT_COLORS.border,
    elevation: 10,
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: CHECKOUT_COLORS.text,
  },
  orderBtn: {
    backgroundColor: CHECKOUT_COLORS.primaryDark,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 40,
    ...CHECKOUT_GLOBAL.shadow,
  },
  orderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: CHECKOUT_COLORS.white,
    letterSpacing: 1,
  },
  orderButtonDisabled: {
    backgroundColor: CHECKOUT_COLORS.gray,
    opacity: 0.6,
  },
});

export default checkoutStyles;
