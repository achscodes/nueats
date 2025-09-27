import { StyleSheet } from "react-native";

export const RECEIPT_COLORS = {
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
};

const RECEIPT_GLOBAL = {
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
    color: RECEIPT_COLORS.text,
  },
};

const receiptStyles = StyleSheet.create({
  /* ===== Receipt Container ===== */
  receiptContainer: {
    flex: 1,
    backgroundColor: RECEIPT_COLORS.primary,
  },

  /* ===== Receipt Header ===== */
  receiptHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    paddingTop: 50,
    backgroundColor: RECEIPT_COLORS.primaryDark,
  },
  receiptHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: RECEIPT_COLORS.white,
    textAlign: "center",
    flex: 1,
  },

  /* ===== Receipt Card Container ===== */
  receiptCardContainer: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  /* ===== Receipt Capture Area ===== */
  receiptCaptureArea: {
    alignItems: "center",
    backgroundColor: RECEIPT_COLORS.white,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 30,
    borderRadius: 10,
  },

  /* ===== Receipt Success Circle ===== */
  receiptCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: RECEIPT_COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    ...RECEIPT_GLOBAL.shadowStrong,
    elevation: 8,
  },

  /* ===== Receipt Card ===== */
  receiptCard: {
    backgroundColor: RECEIPT_COLORS.white,
    borderRadius: 20,
    padding: 25,
    width: "100%",
    maxWidth: 400,
    ...RECEIPT_GLOBAL.shadowStrong,
    elevation: 8,
  },

  /* ===== Receipt Store Info ===== */
  receiptStoreName: {
    fontSize: 24,
    fontWeight: "bold",
    color: RECEIPT_COLORS.primary,
    textAlign: "center",
    marginBottom: 8,
  },
  receiptPaymentMethod: {
    fontSize: 16,
    color: RECEIPT_COLORS.gray,
    textAlign: "center",
    marginBottom: 25,
    fontWeight: "500",
  },

  /* ===== Receipt Items ===== */
  receiptItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  receiptItemText: {
    fontSize: 16,
    color: RECEIPT_COLORS.text,
    flex: 1,
    fontWeight: "500",
  },
  receiptItemPrice: {
    fontSize: 16,
    color: RECEIPT_COLORS.text,
    fontWeight: "600",
    marginLeft: 10,
  },

  /* ===== Receipt Separator ===== */
  receiptSeparator: {
    height: 1,
    backgroundColor: RECEIPT_COLORS.border,
    marginVertical: 15,
    width: "100%",
  },

  /* ===== Receipt Info Block ===== */
  receiptInfoBlock: {
    marginVertical: 8,
  },
  receiptLabel: {
    fontSize: 14,
    color: RECEIPT_COLORS.gray,
    fontWeight: "500",
    marginBottom: 4,
  },
  receiptValue: {
    fontSize: 16,
    color: RECEIPT_COLORS.text,
    fontWeight: "600",
  },

  /* ===== Receipt Download Button ===== */
  receiptDownloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: RECEIPT_COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    ...RECEIPT_GLOBAL.shadow,
    elevation: 5,
  },
  receiptDownloadText: {
    fontSize: 16,
    fontWeight: "bold",
    color: RECEIPT_COLORS.accent,
    marginLeft: 8,
    letterSpacing: 1,
  },
});

export default receiptStyles;
