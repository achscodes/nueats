import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CartProvider from "./context/CartContext";
import OrderProvider from "./context/OrderContext";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <Stack
              screenOptions={{
                headerShown: false, // hide headers globally
                animation: "slide_from_right", // smoother navigation
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
