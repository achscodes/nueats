-- =============================================
-- Update RLS Policies for Order Cancellation
-- =============================================
-- This migration allows users to cancel their own orders
-- when status is Pending, Preparing, or Ready

-- 1. Update Orders Table Policy
-- Drop existing policy
DROP POLICY IF EXISTS orders_update_own ON public.orders;

-- Create new policy allowing updates on Pending, Preparing, or Ready orders
CREATE POLICY orders_update_own ON public.orders
FOR UPDATE TO authenticated
USING (
  user_id = auth.uid() 
  AND status IN ('Pending', 'Preparing', 'Ready')
)
WITH CHECK (
  user_id = auth.uid()
);

-- 2. Update Payments Table Policy
-- Drop existing policy
DROP POLICY IF EXISTS payments_update_own_pending ON public.payments;

-- Create new policy allowing updates on pending, processing, paid, or failed payments
CREATE POLICY payments_update_own_pending ON public.payments
FOR UPDATE TO authenticated
USING (
  user_id = auth.uid() 
  AND status IN ('pending', 'processing', 'paid', 'failed')
)
WITH CHECK (
  user_id = auth.uid()
);

-- =============================================
-- Verification Query (Optional)
-- =============================================
-- Run this to verify the policies were created:
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
-- FROM pg_policies
-- WHERE tablename IN ('orders', 'payments')
-- AND policyname IN ('orders_update_own', 'payments_update_own_pending');

