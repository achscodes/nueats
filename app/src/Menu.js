import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const MENU_COLORS = {
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
  success: "#4CAF50",
  lightGray: "#f8f9fa",
  darkGray: "#999",
};

const MENU_GLOBAL = {
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
    elevation: 6,
  },
  textBold: {
    fontWeight: "bold",
    color: MENU_COLORS.text,
  },
};

const menuStyles = StyleSheet.create({
  /* ===== Menu Container ===== */
  menuContainer: {
    flex: 1,
    backgroundColor: MENU_COLORS.white,
  },

  /* ===== Menu Header ===== */
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingTop: 30,
    backgroundColor: MENU_COLORS.primary,
  },
  menuLogo: {
    width: 120,
    height: 50,
    resizeMode: "contain",
  },
  menuSettingsWrapper: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 215, 0, 0.1)",
  },

  /* ===== Welcome Section ===== */
  menuWelcome: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 15,
    color: MENU_COLORS.text,
  },
  menuSubText: {
    fontSize: 16,
    marginLeft: 15,
    marginBottom: 15,
    color: MENU_COLORS.gray,
  },

  /* ===== Search Bar ===== */
  menuSearchContainer: {
    marginHorizontal: 15,
    marginBottom: 15,
    position: "relative",
  },
  menuSearchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: MENU_COLORS.lightGray,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    ...MENU_GLOBAL.shadow,
  },
  menuSearchIcon: {
    marginRight: 10,
  },
  menuSearchInput: {
    flex: 1,
    fontSize: 16,
    color: MENU_COLORS.text,
  },

  /* ===== Category Filters ===== */
  menuFilterContainer: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  menuFilterScroll: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  menuFilterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: MENU_COLORS.lightGray,
    borderWidth: 1,
    borderColor: MENU_COLORS.border,
    ...MENU_GLOBAL.shadow,
  },
  menuFilterButtonActive: {
    backgroundColor: MENU_COLORS.primary,
    borderColor: MENU_COLORS.primary,
    transform: [{ scale: 1.05 }],
  },
  menuFilterText: {
    fontSize: 14,
    color: MENU_COLORS.gray,
    fontWeight: "600",
  },
  menuFilterTextActive: {
    color: MENU_COLORS.white,
    fontWeight: "bold",
  },

  /* ===== Today's Offer Section with Toggle ===== */
  menuOfferHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 15,
  },
  menuOfferTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: MENU_COLORS.primaryDark,
  },
  menuLayoutToggle: {
    flexDirection: "row",
    backgroundColor: MENU_COLORS.lightGray,
    borderRadius: 20,
    padding: 2,
    ...MENU_GLOBAL.shadow,
  },
  menuToggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    marginHorizontal: 1,
  },
  menuToggleButtonActive: {
    backgroundColor: MENU_COLORS.primary,
    ...MENU_GLOBAL.shadow,
  },

  /* ===== List Layout Food Items ===== */
  menuFoodItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: MENU_COLORS.white,
    marginHorizontal: 15,
    marginVertical: 6,
    padding: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: MENU_COLORS.border,
    ...MENU_GLOBAL.shadowStrong,
  },
  menuFoodItemPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.8,
  },
  menuFoodImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: MENU_COLORS.border,
    marginRight: 12,
  },
  menuFoodContent: {
    flex: 1,
    paddingRight: 10,
  },
  menuFoodName: {
    fontSize: 16,
    fontWeight: "bold",
    color: MENU_COLORS.text,
    marginBottom: 4,
  },
  menuFoodDesc: {
    fontSize: 13,
    color: MENU_COLORS.gray,
    lineHeight: 18,
    marginBottom: 6,
  },
  menuFoodCategory: {
    fontSize: 11,
    color: MENU_COLORS.primary,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  menuFoodPrice: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  menuFoodPriceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: MENU_COLORS.primary,
  },
  menuFoodCurrency: {
    fontSize: 14,
    color: MENU_COLORS.gray,
    marginTop: 2,
  },

  /* ===== Grid Layout Food Items ===== */
  menuGridRow: {
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  menuGridItem: {
    width: (width - 45) / 2, // Account for margins and padding
    marginVertical: 6,
  },
  menuGridItemContent: {
    backgroundColor: MENU_COLORS.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: MENU_COLORS.border,
    overflow: "hidden",
    ...MENU_GLOBAL.shadowStrong,
  },
  menuGridImage: {
    width: "100%",
    height: 120,
    backgroundColor: MENU_COLORS.border,
  },
  menuGridContent: {
    padding: 12,
  },
  menuGridName: {
    fontSize: 14,
    fontWeight: "bold",
    color: MENU_COLORS.text,
    marginBottom: 4,
  },
  menuGridDesc: {
    fontSize: 11,
    color: MENU_COLORS.gray,
    lineHeight: 16,
    marginBottom: 8,
    minHeight: 32, // Consistent height for description
  },
  menuGridFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuGridCategory: {
    fontSize: 9,
    color: MENU_COLORS.primary,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.3,
    flex: 1,
  },
  menuGridPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: MENU_COLORS.primary,
  },

  /* ===== Empty States ===== */
  menuEmptyText: {
    textAlign: "center",
    marginTop: 40,
    color: MENU_COLORS.gray,
    fontSize: 16,
    fontStyle: "italic",
  },
  menuEmptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  menuEmptyIcon: {
    marginBottom: 15,
    opacity: 0.5,
  },

  /* ===== Loading States ===== */
  menuLoadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  menuLoadingText: {
    marginTop: 10,
    color: MENU_COLORS.gray,
    fontSize: 16,
  },

  /* ===== Floating Cart Button ===== */
  menuCartButton: {
    position: "absolute",
    bottom: 50,
    right: 20,
    backgroundColor: MENU_COLORS.primary,
    borderRadius: 30,
    padding: 15,
    ...MENU_GLOBAL.shadowStrong,
    elevation: 10,
  },
  menuCartButtonPressed: {
    transform: [{ scale: 0.9 }],
  },
  menuCartIcon: {
    width: 24,
    height: 24,
    tintColor: MENU_COLORS.white,
  },
  menuCartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: MENU_COLORS.danger,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  menuCartBadgeText: {
    color: MENU_COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
  },

  /* ===== Order Status Button ===== */
  menuStatusButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: MENU_COLORS.accent,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: "center",
    ...MENU_GLOBAL.shadowStrong,
    elevation: 8,
  },
  menuStatusButtonPressed: {
    transform: [{ scale: 0.98 }],
  },
  menuStatusBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: MENU_COLORS.text,
    textAlign: "center",
  },

  /* ===== Animation Helpers ===== */
  fadeIn: {
    opacity: 1,
  },
  fadeOut: {
    opacity: 0,
  },
});

export default menuStyles;
