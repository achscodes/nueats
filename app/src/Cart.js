import { StyleSheet } from "react-native";

export const CART_COLORS = {
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

const CART_GLOBAL = {
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textBold: {
    fontWeight: "bold",
    color: CART_COLORS.text,
  },
};

export const cartStyles = StyleSheet.create({
  // Cart Container
  cartContainer: {
    flex: 1,
    backgroundColor: CART_COLORS.white,
  },

  // Header
  cartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    paddingTop: 50,
    backgroundColor: CART_COLORS.primary,
  },
  cartHeaderTitle: {
    fontSize: 20,
    ...CART_GLOBAL.textBold,
    color: CART_COLORS.white,
  },

  // Empty Cart
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 18,
    color: CART_COLORS.gray,
    marginTop: 10,
  },

  // Cart Items
  cartCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CART_COLORS.white,
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: CART_COLORS.border,
    ...CART_GLOBAL.shadow,
  },
  cartFoodImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: CART_COLORS.lightBg,
  },
  cartFoodName: {
    fontSize: 16,
    fontWeight: "bold",
    color: CART_COLORS.text,
  },
  cartFoodServing: {
    fontSize: 14,
    color: CART_COLORS.gray,
    marginTop: 2,
  },

  // Quantity Controls
  qtyControls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  qtyBtn: {
    borderWidth: 1,
    borderColor: CART_COLORS.primary,
    borderRadius: 6,
    padding: 4,
    marginHorizontal: 6,
    backgroundColor: CART_COLORS.white,
  },
  qtyText: {
    fontSize: 15,
    fontWeight: "600",
    color: CART_COLORS.text,
    minWidth: 25,
    textAlign: "center",
  },

  // Price and Remove
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: CART_COLORS.primary,
  },
  removeBtn: {
    marginTop: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  removeText: {
    fontSize: 13,
    color: CART_COLORS.danger,
  },

  // Checkout Section
  checkoutContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: CART_COLORS.white,
    padding: 15,
    paddingBottom: 50,
    borderTopWidth: 1,
    borderColor: CART_COLORS.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: CART_COLORS.text,
  },
  checkoutBtn: {
    backgroundColor: CART_COLORS.primaryDark,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: CART_COLORS.white,
  },
});

export default cartStyles;
