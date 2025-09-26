import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { feedback as styles } from "./src/style";

const FeedbackScreen = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const router = useRouter();

  const submitFeedback = () => {
    console.log("Feedback submitted:", feedback, "Rating:", rating);
    router.push("/Menu");
  };

  const skipFeedback = () => {
    console.log("Skipped feedback");
    router.push("/Menu");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Check Circle */}
        <View style={styles.checkCircle}>
          <Icon name="check" size={40} color="#500099" />
        </View>

        {/* Texts */}
        <Text style={styles.thankYouText}>THANK YOU!</Text>
        <Text style={styles.orderCompletedText}>Order Completed!</Text>

        {/* Rating Stars */}
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Icon
                name="star"
                size={35}
                color={star <= rating ? "#FFCC00" : "gray"}
                style={styles.star}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback Box */}
        <View style={styles.feedbackBox}>
          <Icon
            name="edit"
            size={20}
            color="#500099"
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={styles.feedbackInput}
            placeholder="Leave feedback"
            placeholderTextColor="#500099"
            multiline
            value={feedback}
            onChangeText={setFeedback}
          />
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={submitFeedback}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipButton} onPress={skipFeedback}>
            <Text style={styles.buttonText}>SKIP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default FeedbackScreen;
