import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase'; // Your Supabase client

interface PaymentSession {
  id: string;
  order_id: string;
  status: 'pending' | 'success' | 'failed' | 'expired';
  amount: number;
  payment_method: string;
  created_at: string;
  updated_at: string;
}

interface UsePaymentPollingOptions {
  paymentSessionId: string | null;
  enabled?: boolean;
  interval?: number; // Polling interval in ms (default: 2000)
  maxAttempts?: number; // Max polling attempts (default: 60)
  onSuccess?: (session: PaymentSession) => void;
  onFailure?: (session: PaymentSession) => void;
  onExpired?: (session: PaymentSession) => void;
}

export function usePaymentPolling({
  paymentSessionId,
  enabled = true,
  interval = 2000,
  maxAttempts = 60, // 2 minutes total (60 * 2000ms)
  onSuccess,
  onFailure,
  onExpired,
}: UsePaymentPollingOptions) {
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed' | 'expired' | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const attemptCountRef = useRef(0);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    setIsPolling(false);
  };

  const checkPaymentStatus = async () => {
    if (!paymentSessionId) {
      console.log('No payment session ID provided');
      return;
    }

    try {
      const { data, error: fetchError } = await supabase
        .from('payment_sessions')
        .select('*')
        .eq('id', paymentSessionId)
        .single();

      if (fetchError) {
        console.error('Error fetching payment status:', fetchError);
        setError(fetchError.message);
        return;
      }

      if (!data) {
        console.error('Payment session not found');
        setError('Payment session not found');
        stopPolling();
        return;
      }

      console.log('Payment status:', data.status);
      setPaymentStatus(data.status);

      // Handle different statuses
      if (data.status === 'success') {
        console.log('✅ Payment successful!');
        stopPolling();
        onSuccess?.(data);
      } else if (data.status === 'failed') {
        console.log('❌ Payment failed');
        stopPolling();
        onFailure?.(data);
      } else if (data.status === 'expired') {
        console.log('⏰ Payment expired');
        stopPolling();
        onExpired?.(data);
      }

      // Check if max attempts reached
      attemptCountRef.current += 1;
      if (attemptCountRef.current >= maxAttempts) {
        console.log('Max polling attempts reached');
        stopPolling();
        setError('Payment check timeout');
      }
    } catch (err) {
      console.error('Error checking payment status:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  useEffect(() => {
    // Start polling if enabled and payment session ID is provided
    if (enabled && paymentSessionId && !isPolling) {
      console.log('Starting payment polling...');
      setIsPolling(true);
      attemptCountRef.current = 0;
      setError(null);
      setPaymentStatus('pending');

      // Initial check
      checkPaymentStatus();

      // Set up polling interval
      pollingIntervalRef.current = setInterval(checkPaymentStatus, interval);
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      stopPolling();
    };
  }, [paymentSessionId, enabled]);

  const reset = () => {
    stopPolling();
    setPaymentStatus(null);
    setError(null);
    attemptCountRef.current = 0;
  };

  return {
    paymentStatus,
    isPolling,
    error,
    stopPolling,
    reset,
  };
}
