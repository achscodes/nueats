-- Fix RLS policy to allow users to check their suspension status
-- Drop existing SELECT policy and recreate with is_suspended access

-- Drop the old select policy
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

-- Recreate with is_suspended included
CREATE POLICY "Users can view own profile and suspension status"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Ensure admins can still see all profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (is_admin());

