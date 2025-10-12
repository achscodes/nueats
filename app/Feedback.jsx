import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter, useLocalSearchParams } from "expo-router";
import { feedbackStyles } from "./src/Feedback.js";
import { supabase } from "../lib/supabase";
import { useAuth } from "./context/AuthContext";

const FeedbackScreen = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useAuth();

  // Get order details from params
  const {
    orderNumber = "N/A",
    orderId,
    orderItems,
    orderTotal,
    paymentMethod,
    orderTime,
  } = params;

  // Debug: Log the parameters received
  console.log('Feedback screen params:', params);

  const submitFeedback = async () => {
    console.log('Feedback submission started:', { rating, feedback, orderId, user: user?.id });
    
    // Validate required fields
    if (rating === 0) {
      Alert.alert(
        "Rating Required",
        "Please select a star rating before submitting."
      );
      return;
    }

    if (feedback.trim() === "") {
      Alert.alert(
        "Feedback Required",
        "Please provide your feedback before submitting."
      );
      return;
    }

    if (!user?.id || !orderId) {
      console.log('Missing user or orderId:', { userId: user?.id, orderId });
      Alert.alert(
        "Error",
        "Unable to submit feedback. Please try again."
      );
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('Saving feedback to database...');
      // Save feedback to database
      const { error } = await supabase
        .from('ratings')
        .insert({
          order_id: Number(orderId),
          stars: rating,
          feedback: feedback.trim(),
        });

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      console.log('Feedback saved successfully, showing success alert...');
      // Show success message
      Alert.alert(
        "Success", 
        "Thank you for your feedback!",
        [
          {
            text: "OK",
            onPress: () => {
              console.log('Navigating to Receipt page...');
              // Navigate to Receipt page with order details
              router.push({
                pathname: "/Receipt",
                params: {
                  items: orderItems,
                  amount: orderTotal,
                  paymentMethod: paymentMethod || "Cash",
                  date: orderTime
                    ? new Date(orderTime).toLocaleDateString()
                    : new Date().toLocaleDateString(),
                  refNo: orderNumber,
                  orderNumber: orderNumber,
                },
              });
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Alert.alert(
        "Error", 
        error.message || "Failed to submit feedback. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={feedbackStyles.feedbackScrollContainer}>
      <View style={feedbackStyles.feedbackMainContainer}>
        {/* Check Circle */}
        <View style={feedbackStyles.feedbackCheckCircle}>
          <Icon name="check" size={40} color="#500099" />
        </View>

        {/* Texts */}
        <Text style={feedbackStyles.feedbackThankYouText}>THANK YOU!</Text>
        <Text style={feedbackStyles.feedbackOrderCompletedText}>
          Order Completed!
        </Text>
        <Text style={feedbackStyles.feedbackOrderNumberText}>
          Order #{orderNumber}
        </Text>

        {/* Rating Stars */}
        <View style={feedbackStyles.feedbackRatingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Icon
                name="star"
                size={35}
                color={star <= rating ? "#FFCC00" : "gray"}
                style={feedbackStyles.feedbackStar}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback Box */}
        <View style={feedbackStyles.feedbackInputBox}>
          <Icon
            name="edit"
            size={20}
            color="#500099"
            style={{ marginRight: 8, marginTop: 2 }}
          />
          <TextInput
            style={feedbackStyles.feedbackTextInput}
            placeholder="Leave feedback"
            placeholderTextColor="#500099"
            multiline
            value={feedback}
            onChangeText={setFeedback}
            numberOfLines={4}
          />
        </View>

        {/* Submit Button Only */}
        <TouchableOpacity
          style={[
            feedbackStyles.feedbackSubmitButtonFull,
            isSubmitting && { opacity: 0.6 }
          ]}
          onPress={submitFeedback}
          activeOpacity={0.8}
          disabled={isSubmitting}
        >
          <Text style={feedbackStyles.feedbackButtonText}>
            {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FeedbackScreen;
