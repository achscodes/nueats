-- Setup RLS policies for profiles table
-- This creates a clean set of policies for profile access

-- Drop all existing policies
drop policy if exists "Users can view their own profile" on public.profiles;
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;
drop policy if exists "Admins can view all profiles" on public.profiles;
drop policy if exists "Admins can update all profiles" on public.profiles;

-- Ensure RLS is enabled
alter table public.profiles enable row level security;

-- Policy 1: Users can view their own profile
create policy "Users can view their own profile"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

-- Policy 2: Users can insert their own profile
create policy "Users can insert their own profile"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

-- Policy 3: Users can update their own profile
create policy "Users can update their own profile"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Policy 4: Admins can view all profiles
create policy "Admins can view all profiles"
  on public.profiles
  for select
  to authenticated
  using (is_admin());

-- Policy 5: Admins can update all profiles
create policy "Admins can update all profiles"
  on public.profiles
  for update
  to authenticated
  using (is_admin())
  with check (is_admin());

