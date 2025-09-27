import { StyleSheet } from "react-native";

export const TRANSACTION_COLORS = {
  primary: "#2c3e91",
  primaryDark: "#1a237e",
  accent: "#FFD700",
  accentAlt: "#ffeb3b",
  danger: "#D32F2F",
  lightBg: "#f5f5f5",
  white: "#ffffff",
  text: "#333333",
  gray: "#666666",
  border: "#ddd",
};

const TRANSACTION_GLOBAL = {
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
};

const transactionStyles = StyleSheet.create({
  transactionMainContainer: {
    flex: 1,
    backgroundColor: TRANSACTION_COLORS.lightBg,
    paddingTop: 0,
  },
  transactionPageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    backgroundColor: TRANSACTION_COLORS.primaryDark,
    ...TRANSACTION_GLOBAL.shadow,
  },
  transactionPageHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: TRANSACTION_COLORS.accent,
    letterSpacing: 0.5,
    textAlign: "center",
    flex: 1,
  },
  transactionHistoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: TRANSACTION_COLORS.gray,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Order Card Styles
  transactionOrderCard: {
    backgroundColor: TRANSACTION_COLORS.white,
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: TRANSACTION_COLORS.border,
    ...TRANSACTION_GLOBAL.shadow,
  },
  transactionOrderHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  transactionOrderNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: TRANSACTION_COLORS.text,
  },
  transactionOrderStatus: {
    fontSize: 14,
    fontWeight: "600",
    color: TRANSACTION_COLORS.primary,
    backgroundColor: TRANSACTION_COLORS.lightBg,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  transactionOrderDate: {
    fontSize: 14,
    color: TRANSACTION_COLORS.gray,
    marginBottom: 12,
  },
  transactionOrderItemsRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  transactionOrderFoodImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: TRANSACTION_COLORS.lightBg,
  },
  transactionOrderTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: TRANSACTION_COLORS.primary,
  },

  // Modal Styles
  transactionModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  transactionModalContainer: {
    backgroundColor: TRANSACTION_COLORS.white,
    margin: 20,
    padding: 20,
    borderRadius: 16,
    maxHeight: "80%",
    width: "90%",
    ...TRANSACTION_GLOBAL.shadow,
  },
  transactionModalOrderNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: TRANSACTION_COLORS.text,
    textAlign: "center",
    marginBottom: 8,
  },
  transactionModalOrderStatus: {
    fontSize: 16,
    fontWeight: "600",
    color: TRANSACTION_COLORS.primary,
    textAlign: "center",
    backgroundColor: TRANSACTION_COLORS.lightBg,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "center",
    marginBottom: 8,
  },
  transactionModalOrderDate: {
    fontSize: 14,
    color: TRANSACTION_COLORS.gray,
    textAlign: "center",
    marginBottom: 20,
  },
  transactionModalSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: TRANSACTION_COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  transactionModalFoodRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: TRANSACTION_COLORS.border,
  },
  transactionModalFoodImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: TRANSACTION_COLORS.lightBg,
  },
  transactionModalFoodName: {
    fontSize: 16,
    fontWeight: "600",
    color: TRANSACTION_COLORS.text,
    marginBottom: 2,
  },
  transactionModalFoodQty: {
    fontSize: 14,
    color: TRANSACTION_COLORS.gray,
  },
  transactionModalFoodPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: TRANSACTION_COLORS.primary,
  },
  transactionModalAddress: {
    fontSize: 14,
    color: TRANSACTION_COLORS.text,
    marginBottom: 16,
    lineHeight: 20,
  },
  transactionModalPayment: {
    fontSize: 14,
    color: TRANSACTION_COLORS.text,
    marginBottom: 20,
  },
  transactionModalTotal: {
    fontSize: 18,
    fontWeight: "bold",
    color: TRANSACTION_COLORS.primary,
    textAlign: "center",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: TRANSACTION_COLORS.border,
  },
  transactionCloseModalBtn: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: TRANSACTION_COLORS.accent,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  // Legacy styles (keeping for compatibility with unique names)
  transactionBackArrow: {
    fontSize: 28,
    color: TRANSACTION_COLORS.accent,
    fontWeight: "bold",
    marginRight: 18,
  },
  transactionTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: TRANSACTION_COLORS.accent,
    textAlign: "center",
    letterSpacing: 1,
  },
  transactionCard: {
    backgroundColor: TRANSACTION_COLORS.white,
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: TRANSACTION_COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...TRANSACTION_GLOBAL.shadow,
    borderLeftWidth: 6,
    borderLeftColor: TRANSACTION_COLORS.primary,
    shadowColor: TRANSACTION_COLORS.primary,
  },
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  transactionImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: TRANSACTION_COLORS.lightBg,
    marginRight: 15,
  },
  transactionTextRow: {
    flex: 1,
    justifyContent: "center",
  },
  transactionItemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: TRANSACTION_COLORS.text,
    marginBottom: 4,
  },
  transactionReorderButton: {
    backgroundColor: TRANSACTION_COLORS.accent,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginLeft: 12,
  },
  transactionReorderText: {
    color: TRANSACTION_COLORS.white,
    fontWeight: "bold",
    fontSize: 14,
    letterSpacing: 1,
  },
  transactionDemoButton: {
    backgroundColor: TRANSACTION_COLORS.danger,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },

  // Filter Section Styles
  transactionFiltersContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 5,
  },

  transactionTotalOrdersText: {
    fontWeight: "bold",
    fontSize: 16,
    color: TRANSACTION_COLORS.primary,
    marginBottom: 6,
  },

  transactionFiltersRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingRight: 8,
  },

  transactionDropdownContainer: {
    flex: 1,
    marginRight: 8,
    position: "relative",
    minWidth: 100,
  },

  transactionDropdownContainerLast: {
    flex: 1,
    position: "relative",
    minWidth: 100,
  },

  transactionDropdownLabel: {
    fontSize: 12,
    color: TRANSACTION_COLORS.gray,
    marginBottom: 4,
    marginLeft: 2,
  },

  transactionDropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: TRANSACTION_COLORS.accent,
    borderRadius: 8,
    paddingHorizontal: 8,
    minHeight: 44,
    backgroundColor: TRANSACTION_COLORS.white,
    justifyContent: "space-between",
  },

  transactionDropdownButtonSort: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: TRANSACTION_COLORS.accent,
    borderRadius: 8,
    paddingHorizontal: 8,
    minHeight: 44,
    backgroundColor: TRANSACTION_COLORS.white,
    justifyContent: "center",
  },

  transactionDropdownButtonText: {
    color: TRANSACTION_COLORS.primary,
    fontWeight: "bold",
    fontSize: 12,
    flexShrink: 1,
    textAlign: "center",
  },

  transactionDropdownMenu: {
    backgroundColor: TRANSACTION_COLORS.white,
    borderWidth: 1,
    borderColor: TRANSACTION_COLORS.accent,
    borderRadius: 8,
    marginTop: 2,
    zIndex: 10,
    position: "absolute",
    width: "100%",
  },

  transactionDropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  transactionDropdownItemLast: {
    padding: 10,
  },

  transactionDropdownItemText: {
    color: TRANSACTION_COLORS.primary,
  },

  transactionDropdownItemTextSelected: {
    color: TRANSACTION_COLORS.primary,
    fontWeight: "bold",
  },

  // Header spacer
  transactionHeaderSpacer: {
    width: 24,
  },

  // Modal food details flex container
  transactionModalFoodDetails: {
    flex: 1,
  },

  // FlatList content container
  transactionOrdersList: {
    paddingBottom: 30,
  },
});

export default transactionStyles;
