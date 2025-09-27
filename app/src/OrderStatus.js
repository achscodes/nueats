import { StyleSheet } from "react-native";

export const ORDER_STATUS_COLORS = {
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
  orange: "#FF8C00",
  green: "#28A745",
};

const ORDER_STATUS_GLOBAL = {
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textBold: {
    fontWeight: "bold",
    color: ORDER_STATUS_COLORS.text,
  },
};

const orderStatusStyles = StyleSheet.create({
  /* ===== Main Container ===== */
  orderStatusContainer: {
    flex: 1,
    backgroundColor: ORDER_STATUS_COLORS.primary,
  },

  /* ===== Header Section ===== */
  orderStatusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    paddingTop: 50,
    backgroundColor: ORDER_STATUS_COLORS.primaryDark,
  },
  orderStatusHeaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: ORDER_STATUS_COLORS.white,
    textAlign: "center",
    flex: 1,
  },
  orderStatusSide: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  /* ===== Order Card ===== */
  orderStatusCard: {
    backgroundColor: ORDER_STATUS_COLORS.white,
    margin: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    ...ORDER_STATUS_GLOBAL.shadow,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },

  /* ===== Order Number Section ===== */
  orderNumberText: {
    fontSize: 20,
    fontWeight: "bold",
    color: ORDER_STATUS_COLORS.primary,
    textAlign: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: ORDER_STATUS_COLORS.lightBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: ORDER_STATUS_COLORS.border,
    letterSpacing: 1,
  },

  /* ===== Date Section ===== */
  orderStatusDateText: {
    fontSize: 16,
    color: ORDER_STATUS_COLORS.gray,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },

  /* ===== Items Section ===== */
  orderStatusSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: ORDER_STATUS_COLORS.text,
    marginBottom: 15,
    alignSelf: "flex-start",
  },
  orderStatusProductRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ORDER_STATUS_COLORS.lightBg,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: ORDER_STATUS_COLORS.border,
  },
  orderStatusFoodImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: ORDER_STATUS_COLORS.border,
    marginRight: 12,
  },
  orderStatusProductText: {
    fontSize: 15,
    color: ORDER_STATUS_COLORS.text,
    fontWeight: "500",
    flex: 1,
  },
  orderStatusNoItemsText: {
    fontSize: 16,
    color: ORDER_STATUS_COLORS.gray,
    textAlign: "center",
    fontStyle: "italic",
    marginVertical: 10,
  },

  /* ===== ETA Section ===== */
  orderStatusEtaText: {
    fontSize: 36,
    fontWeight: "bold",
    color: ORDER_STATUS_COLORS.primary,
    marginTop: 15,
    marginBottom: 5,
  },
  orderStatusEtaLabel: {
    fontSize: 16,
    color: ORDER_STATUS_COLORS.gray,
    marginBottom: 25,
    textAlign: "center",
  },

  /* ===== Progress Section ===== */
  orderStatusProgress: {
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
  },
  orderStatusStep: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    paddingHorizontal: 10,
    width: "100%",
  },
  orderStatusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: ORDER_STATUS_COLORS.gray,
    marginRight: 15,
  },
  orderStatusStepText: {
    fontSize: 14,
    color: ORDER_STATUS_COLORS.text,
    flex: 1,
  },

  /* ===== Payment & Total Section ===== */
  orderStatusPaymentText: {
    fontSize: 16,
    color: ORDER_STATUS_COLORS.gray,
    marginBottom: 8,
    fontWeight: "500",
  },
  orderStatusTotalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: ORDER_STATUS_COLORS.primary,
    marginBottom: 15,
  },

  /* ===== Rate Button ===== */
  orderStatusRateBtn: {
    backgroundColor: ORDER_STATUS_COLORS.accent,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
    ...ORDER_STATUS_GLOBAL.shadow,
  },
  orderStatusRateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: ORDER_STATUS_COLORS.text,
    letterSpacing: 1,
  },

  /* ===== Cancel Order Button ===== */
  cancelOrderBtn: {
    backgroundColor: ORDER_STATUS_COLORS.danger,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    ...ORDER_STATUS_GLOBAL.shadow,
  },
  cancelOrderText: {
    fontSize: 14,
    fontWeight: "bold",
    color: ORDER_STATUS_COLORS.white,
    letterSpacing: 1,
    textAlign: "center",
  },

  /* ===== Test Buttons Container ===== */
  testButtonsContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: ORDER_STATUS_COLORS.border,
    width: "100%",
    alignItems: "center",
  },
  testButtonsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: ORDER_STATUS_COLORS.gray,
    marginBottom: 15,
    textAlign: "center",
  },
  testButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  testButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginHorizontal: 5,
    ...ORDER_STATUS_GLOBAL.shadow,
  },
  testButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: ORDER_STATUS_COLORS.white,
    textAlign: "center",
  },

  /* ===== Modal Styles ===== */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: ORDER_STATUS_COLORS.white,
    borderRadius: 20,
    padding: 25,
    width: "100%",
    maxWidth: 400,
    ...ORDER_STATUS_GLOBAL.shadow,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: ORDER_STATUS_COLORS.text,
    textAlign: "center",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    color: ORDER_STATUS_COLORS.gray,
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 8,
    ...ORDER_STATUS_GLOBAL.shadow,
  },
  modalCancelButton: {
    backgroundColor: ORDER_STATUS_COLORS.lightBg,
    borderWidth: 1,
    borderColor: ORDER_STATUS_COLORS.border,
  },
  modalConfirmButton: {
    backgroundColor: ORDER_STATUS_COLORS.primary,
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: "600",
    color: ORDER_STATUS_COLORS.gray,
    textAlign: "center",
  },
  modalConfirmText: {
    fontSize: 16,
    fontWeight: "600",
    color: ORDER_STATUS_COLORS.white,
    textAlign: "center",
  },

  /* ===== Reason Selection Styles ===== */
  reasonsList: {
    maxHeight: 300,
    width: "100%",
    marginBottom: 20,
  },
  reasonItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 4,
    borderRadius: 10,
    backgroundColor: ORDER_STATUS_COLORS.lightBg,
    borderWidth: 1,
    borderColor: ORDER_STATUS_COLORS.border,
  },
  reasonItemSelected: {
    backgroundColor: ORDER_STATUS_COLORS.accent,
    borderColor: ORDER_STATUS_COLORS.primary,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: ORDER_STATUS_COLORS.gray,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: ORDER_STATUS_COLORS.primary,
  },
  reasonText: {
    fontSize: 16,
    color: ORDER_STATUS_COLORS.text,
    fontWeight: "500",
    flex: 1,
  },
});

export default orderStatusStyles;
