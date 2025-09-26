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
};

const GLOBAL = {
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textBold: {
    fontWeight: "bold",
    color: COLORS.text,
  },
};

const styles = StyleSheet.create({
  /* ===== Global ===== */
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: COLORS.primaryDark,
  },

  logoSmall: {
    width: 80,
    height: 40,
    resizeMode: "contain",
  },

  /* ===== Cart Page ===== */
  cartContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  cartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: COLORS.primaryDark,
  },
  cartHeaderTitle: {
    fontSize: 20,
    ...GLOBAL.textBold,
    color: COLORS.white,
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 18,
    color: COLORS.gray,
    marginTop: 10,
  },
  cartCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...GLOBAL.shadow,
  },
  cartFoodImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: COLORS.lightBg,
  },
  cartFoodName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
  },
  cartFoodServing: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 2,
  },
  qtyControls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  qtyBtn: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 6,
    padding: 4,
    marginHorizontal: 6,
    backgroundColor: COLORS.white,
  },
  qtyText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
    minWidth: 25,
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  removeBtn: {
    marginTop: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  removeText: {
    fontSize: 13,
    color: COLORS.danger,
  },
  checkoutContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    padding: 15,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  checkoutBtn: {
    backgroundColor: COLORS.primaryDark,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
  },

  /* ===== Menu Page ===== */
  menuContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: COLORS.lightBg,
  },
  menuLogo: {
    width: 120,
    height: 50,
    resizeMode: "contain",
  },
  menuSettingsWrapper: {
    padding: 5,
  },
  menuWelcome: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
    marginLeft: 15,
    color: COLORS.text,
  },
  menuSubText: {
    fontSize: 16,
    marginLeft: 15,
    marginBottom: 10,
    color: COLORS.gray,
  },
  menuSearchBar: {
    marginHorizontal: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  menuSearchInput: {
    height: 40,
    fontSize: 16,
    color: COLORS.text,
  },
  menuOfferTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginVertical: 10,
    color: COLORS.primaryDark,
  },
  menuFoodItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightBg,
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  menuFoodImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: COLORS.border,
    marginRight: 10,
  },
  menuFoodName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
  },
  menuFoodDesc: {
    fontSize: 14,
    color: COLORS.gray,
  },
  menuEmptyText: {
    textAlign: "center",
    marginTop: 20,
    color: COLORS.gray,
  },

  /* ===== Settings Page ===== */
  settingsContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  settingsHeader: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
    marginLeft: 12,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightBg,
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    ...GLOBAL.shadow,
  },
  optionLogo: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    marginRight: 10,
  },
  optionIcon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text,
  },
  logoutButton: {
    marginTop: "auto",
    backgroundColor: COLORS.danger,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
    letterSpacing: 1,
  },
});

export default styles;
