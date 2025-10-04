-- Add avatar_url column to existing profiles table
-- This migration adds the avatar_url column for storing profile pictures

-- Add avatar_url column (nullable)
alter table public.profiles 
add column if not exists avatar_url text;

