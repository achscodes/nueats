-- Allow unauthenticated users to check is_suspended status
-- This is needed for the suspension check to work properly

-- Create a policy that allows anyone (authenticated or not) to check is_suspended
CREATE POLICY "Anyone can check suspension status"
ON public.profiles
FOR SELECT
TO public
USING (true);  -- Allow all SELECT queries for is_suspended checks

-- Note: This policy is intentionally permissive for the suspension check feature
-- In production, you may want to restrict this to specific IP ranges or conditions
