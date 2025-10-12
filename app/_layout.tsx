import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import CartProvider from "./context/CartContext";
import OrderProvider from "./context/OrderContext";
import { AuthProvider } from "./context/AuthContext";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure navigation is ready
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#8B0000" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
              }}
            >
              <Stack.Screen name="Menu" />
              <Stack.Screen name="Login" />
              <Stack.Screen name="Signup" />
              <Stack.Screen name="Termsandconditions" />
              <Stack.Screen name="Order" />
              <Stack.Screen name="Cart" />
              <Stack.Screen name="Profile" />
              <Stack.Screen name="Checkout" />
              <Stack.Screen name="OrderStatus" />
              <Stack.Screen name="Feedback" />
              <Stack.Screen name="Receipt" />
              <Stack.Screen name="Transaction" />
              <Stack.Screen name="Complaints" />
              <Stack.Screen name="AboutPage" />
              <Stack.Screen name="Setting" />
              <Stack.Screen name="HelpSupport" />
              <Stack.Screen name="payment-success" />
              <Stack.Screen name="payment-failed" />
            </Stack>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}