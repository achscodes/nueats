import { StyleSheet } from "react-native";

// Color constants for feedback screen
const FEEDBACK_COLORS = {
  primary: "#500099",
  accent: "#FFCC00",
  white: "#ffffff",
  gray: "#666666",
  lightGray: "#f5f5f5",
  text: "#333333",
  placeholder: "#500099",
};

export const feedbackStyles = StyleSheet.create({
  // Main container styles
  feedbackScrollContainer: {
    flexGrow: 1,
    backgroundColor: FEEDBACK_COLORS.white,
  },

  feedbackMainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 40,
    backgroundColor: FEEDBACK_COLORS.white,
  },

  // Check circle icon container
  feedbackCheckCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: FEEDBACK_COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Text styles
  feedbackThankYouText: {
    fontSize: 28,
    fontWeight: "bold",
    color: FEEDBACK_COLORS.primary,
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: 1.5,
  },

  feedbackOrderCompletedText: {
    fontSize: 18,
    color: FEEDBACK_COLORS.text,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "500",
  },

  // Order number text
  feedbackOrderNumberText: {
    fontSize: 16,
    color: FEEDBACK_COLORS.primary,
    textAlign: "center",
    marginBottom: 40,
    fontWeight: "bold",
    backgroundColor: FEEDBACK_COLORS.lightGray,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: FEEDBACK_COLORS.primary,
    letterSpacing: 1,
  },

  // Rating stars container
  feedbackRatingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },

  feedbackStar: {
    marginHorizontal: 5,
    padding: 5,
  },

  // Feedback input container
  feedbackInputBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: FEEDBACK_COLORS.lightGray,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 40,
    width: "100%",
    minHeight: 100,
    borderWidth: 1,
    borderColor: FEEDBACK_COLORS.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  feedbackTextInput: {
    flex: 1,
    fontSize: 16,
    color: FEEDBACK_COLORS.text,
    textAlignVertical: "top",
    minHeight: 60,
    paddingTop: 0,
    lineHeight: 22,
  },

  // Button container (kept for backward compatibility but not used)
  feedbackButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 15,
  },

  // Submit button (original flex style)
  feedbackSubmitButton: {
    flex: 1,
    backgroundColor: FEEDBACK_COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  // Full width submit button (new style)
  feedbackSubmitButtonFull: {
    backgroundColor: FEEDBACK_COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 200,
  },

  // Skip button (kept for backward compatibility but not used in new version)
  feedbackSkipButton: {
    flex: 1,
    backgroundColor: FEEDBACK_COLORS.gray,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  // Button text
  feedbackButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: FEEDBACK_COLORS.white,
    letterSpacing: 0.5,
  },
});
