import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { usePaymentPolling } from './context/usePaymentPolling';
import { supabase } from '../lib/supabase';

export default function PaymentScreen({ route, navigation }) {
  const { orderId, amount, userId } = route.params;
  const [paymentSessionId, setPaymentSessionId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isInitiating, setIsInitiating] = useState(false);

  const { paymentStatus, isPolling, error } = usePaymentPolling({
    paymentSessionId,
    enabled: !!paymentSessionId,
    interval: 2000,
    maxAttempts: 60,
    onSuccess: (session) => {
      Alert.alert(
        'Payment Successful! 🎉',
        `Your payment of ₱${session.amount} has been processed.`,
        [
          {
            text: 'View Order',
            onPress: () => navigation.navigate('OrderDetails', { orderId }),
          },
        ]
      );
    },
    onFailure: (session) => {
      Alert.alert(
        'Payment Failed',
        'Your payment could not be processed. Please try again.',
        [
          {
            text: 'Try Again',
            onPress: () => handlePayment('paymongo'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]
      );
    },
    onExpired: (session) => {
      Alert.alert(
        'Payment Expired',
        'Your payment session has expired. Please try again.',
        [
          {
            text: 'Try Again',
            onPress: () => handlePayment('paymongo'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    },
  });

  const handlePayment = async (paymentMethod: 'cash' | 'paymongo') => {
    setIsInitiating(true);

    try {
      const { data, error } = await supabase.functions.invoke('payment-redirect', {
        body: {
          amount,
          payment_method_type: paymentMethod,
          order_id: orderId,
          user_id: userId,
        },
      });

      if (error) {
        console.error('Payment error:', error);
        Alert.alert('Error', 'Failed to initiate payment. Please try again.');
        setIsInitiating(false);
        return;
      }

      if (paymentMethod === 'cash') {
        Alert.alert(
          'Order Placed! 💵',
          'Your order has been placed. Pay with cash on delivery.',
          [
            {
              text: 'View Order',
              onPress: () => navigation.navigate('OrderDetails', { orderId }),
            },
          ]
        );
        setIsInitiating(false);
      } else if (paymentMethod === 'paymongo') {
        const { redirect_url, payment_session_id } = data;

        if (!redirect_url || !payment_session_id) {
          Alert.alert('Error', 'Invalid payment response');
          setIsInitiating(false);
          return;
        }

        setPaymentSessionId(payment_session_id);
        setCheckoutUrl(redirect_url);

        const canOpen = await Linking.canOpenURL(redirect_url);
        if (canOpen) {
          await Linking.openURL(redirect_url);
          setIsInitiating(false);
        } else {
          Alert.alert('Error', 'Cannot open payment page');
          setIsInitiating(false);
        }
      }
    } catch (err) {
      console.error('Payment error:', err);
      Alert.alert('Error', 'An unexpected error occurred');
      setIsInitiating(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Payment</Text>

      {/* Order Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        <Text style={styles.orderId}>Order ID: {orderId}</Text>
        <Text style={styles.totalAmount}>Total: ₱{amount.toFixed(2)}</Text>
      </View>

      {/* Payment Status */}
      {isPolling && (
        <View style={styles.pollingCard}>
          <ActivityIndicator size="large" color="#0284c7" />
          <Text style={styles.pollingText}>Waiting for payment confirmation...</Text>
          <Text style={styles.statusText}>Status: {paymentStatus || 'checking'}</Text>
        </View>
      )}

      {/* Error Display */}
      {error && (
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      )}

      {/* Payment Methods */}
      <View style={styles.paymentMethodsSection}>
        <Text style={styles.sectionTitle}>Select Payment Method</Text>

        {/* Cash Payment */}
        <TouchableOpacity
          style={[styles.paymentButton, styles.cashButton]}
          onPress={() => handlePayment('cash')}
          disabled={isInitiating || isPolling}
          activeOpacity={0.8}
        >
          <Text style={styles.paymentButtonIcon}>💵</Text>
          <View style={styles.paymentButtonContent}>
            <Text style={styles.paymentButtonTitle}>Cash on Delivery</Text>
            <Text style={styles.paymentButtonSubtitle}>Pay when you receive your order</Text>
          </View>
        </TouchableOpacity>

        {/* Online Payment */}
        <TouchableOpacity
          style={[styles.paymentButton, styles.onlineButton]}
          onPress={() => handlePayment('paymongo')}
          disabled={isInitiating || isPolling}
          activeOpacity={0.8}
        >
          <Text style={styles.paymentButtonIcon}>💳</Text>
          <View style={styles.paymentButtonContent}>
            <Text style={[styles.paymentButtonTitle, styles.onlineButtonText]}>
              Pay Online
            </Text>
            <Text style={[styles.paymentButtonSubtitle, styles.onlineButtonSubtext]}>
              GCash, Card, or PayMaya
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {isInitiating && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#0284c7" />
          <Text style={styles.loadingText}>Initiating payment...</Text>
        </View>
      )}

      {/* Reopen Payment Button */}
      {checkoutUrl && isPolling && (
        <TouchableOpacity
          style={styles.reopenButton}
          onPress={() => Linking.openURL(checkoutUrl)}
          activeOpacity={0.8}
        >
          <Text style={styles.reopenButtonText}>🔄 Reopen Payment Page</Text>
        </TouchableOpacity>
      )}

      {/* Debug Info */}
      {__DEV__ && paymentSessionId && (
        <View style={styles.debugCard}>
          <Text style={styles.debugTitle}>Debug Info:</Text>
          <Text style={styles.debugText}>Payment Session ID: {paymentSessionId}</Text>
          <Text style={styles.debugText}>Status: {paymentStatus || 'none'}</Text>
          <Text style={styles.debugText}>Polling: {isPolling ? 'Yes' : 'No'}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0284c7',
    marginTop: 8,
  },
  pollingCard: {
    backgroundColor: '#f0f9ff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  pollingText: {
    marginTop: 12,
    color: '#0284c7',
    fontWeight: '600',
    fontSize: 16,
  },
  statusText: {
    marginTop: 6,
    color: '#64748b',
    fontSize: 12,
  },
  errorCard: {
    backgroundColor: '#fef2f2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  errorText: {
    color: '#dc2626',
    fontWeight: '600',
    fontSize: 14,
  },
  paymentMethodsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cashButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  onlineButton: {
    backgroundColor: '#0284c7',
    borderWidth: 0,
  },
  paymentButtonIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  paymentButtonContent: {
    flex: 1,
  },
  paymentButtonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  paymentButtonSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  onlineButtonText: {
    color: '#fff',
  },
  onlineButtonSubtext: {
    color: '#e0f2fe',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 20,
    padding: 16,
  },
  loadingText: {
    marginTop: 8,
    color: '#6b7280',
    fontSize: 14,
  },
  reopenButton: {
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  reopenButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  debugCard: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  debugTitle: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
    marginBottom: 8,
  },
  debugText: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 4,
  },
});