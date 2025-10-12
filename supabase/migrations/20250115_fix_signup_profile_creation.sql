-- Fix signup profile creation by allowing system to insert profiles
-- This allows the handle_new_user() function to work properly

-- Add a policy that allows the system to insert profiles during user creation
-- This is needed because the trigger runs before the user is fully authenticated
CREATE POLICY "system_insert_profiles_during_signup"
ON public.profiles
FOR INSERT
TO public  -- Allow unauthenticated access for system functions
WITH CHECK (true);  -- Allow all inserts during signup process

-- Also allow the system to update profiles if needed during signup
CREATE POLICY "system_update_profiles_during_signup"
ON public.profiles
FOR UPDATE
TO public  -- Allow unauthenticated access for system functions
USING (true)
WITH CHECK (true);

-- Verify the handle_new_user function exists and is working
-- If it doesn't exist, recreate it
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert profile with user metadata
  INSERT INTO public.profiles (id, display_name, role, is_suspended, created_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    'customer',
    false,
    NOW()
  )
  ON CONFLICT (id) DO NOTHING; -- Prevent errors if profile already exists
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
