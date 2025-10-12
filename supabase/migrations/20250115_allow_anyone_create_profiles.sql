-- Allow anyone to create profiles during signup
-- This allows frontend to create profiles after user signup

-- Remove any existing trigger (if it exists)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Grant necessary permissions for frontend profile creation
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON public.profiles TO postgres, anon, authenticated, service_role;

-- Add policy to allow anyone (authenticated or unauthenticated) to insert profiles
-- This allows the frontend to create profiles after user signup
CREATE POLICY "anyone_can_create_profiles"
ON public.profiles
FOR INSERT
TO public  -- public means both authenticated and unauthenticated users
WITH CHECK (true);  -- Allow all profile creation

-- Also allow anyone to update profiles if needed
CREATE POLICY "anyone_can_update_profiles"
ON public.profiles
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Ensure RLS is still enabled (this doesn't disable it, just adds permissive policies)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
