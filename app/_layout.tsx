import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CartProvider from "./context/CartContext";
import OrderProvider from "./context/OrderContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
            {/* ✅ Add Feedback screen */}
            <Stack.Screen name="Feedback" />
            {/* ✅ Add About screen if you want it accessible */}
            <Stack.Screen name="AboutPage" />
            {/* ✅ Add Settings screen since Menu links to it */}
            <Stack.Screen name="Setting" />
            {/* ✅ Add Help & Support screen */}
            <Stack.Screen name="HelpSupport" />
          </Stack>
        </OrderProvider>
      </CartProvider>
    </GestureHandlerRootView>
  );
}
