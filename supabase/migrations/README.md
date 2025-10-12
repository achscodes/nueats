# Database Migrations Guide

This directory contains SQL migrations for the NuEats application.

## How to Apply Migrations

### Option 1: Using Supabase Dashboard (Recommended for Quick Setup)

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project
3. Navigate to **SQL Editor** in the left sidebar
4. Open each migration file and copy its contents
5. Paste the SQL into the editor and click **Run**

Run the migrations in this order:
1. `20250104_add_avatar_url_to_profiles.sql` - Adds avatar_url column to existing profiles table
2. `20250104_setup_profiles_rls.sql` - Sets up RLS policies for profiles table
3. `20250104_create_avatars_storage.sql` - Creates the storage bucket and RLS policies
4. `20250104_create_ratings_table.sql` - Creates ratings table with RLS policies
5. `20250105_create_complaints_table.sql` - Creates complaints table with RLS policies
6. `20250112_fix_profiles_suspension_rls.sql` - Fixes RLS to allow users to check suspension status
7. `20250112_auto_create_profiles.sql` - Auto-creates profiles for new users and backfills existing users
8. `20250112_unauthenticated_suspension_check.sql` - Allows unauthenticated users to check suspension status

### Option 2: Using Supabase CLI (Recommended for Production)

1. Install Supabase CLI if you haven't:
   ```bash
   npm install -g supabase
   ```

2. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

3. Apply the migrations:
   ```bash
   supabase db push
   ```

## What These Migrations Do

### 20250104_add_avatar_url_to_profiles.sql
- Adds `avatar_url` column (nullable) to existing `profiles` table
- Adds `phone` column if it doesn't exist (backward compatibility)
- Adds `updated_at` column with auto-update trigger
- Sets up/updates RLS policies for secure access
- **Note**: This modifies your existing table, it's safe to run

### 20250104_create_avatars_storage.sql
- Creates an `avatars` storage bucket for profile pictures
- Sets file size limit to 5MB
- Allows only image files (jpeg, jpg, png, gif, webp)
- Sets up RLS policies:
  - Users can upload/update/delete their own avatars
  - Anyone can view avatars (public bucket)

### 20250104_create_ratings_table.sql
- Creates a `ratings` table for order ratings
- Fields: rating_id, order_id, stars (1-5), feedback, created_at, updated_at
- Enforces one rating per order (UNIQUE constraint)
- Sets up RLS policies:
  - Users can view their own ratings
  - Users can rate completed orders once
  - Users can update ratings within 30 days
  - Admins can view/update/delete all ratings

### 20250105_create_complaints_table.sql
- Creates a `complaints` table for user complaints
- Fields: complaint_id, user_id, category, title, description, status, created_at, resolved_at, updated_at
- Categories: food quality, service, app issue, billing, pickup delay, other
- Status: Pending (default), Open, or Resolved
- Automatically sets resolved_at timestamp when status changes to Resolved
- Sets up RLS policies:
  - Users can view/create/update their own complaints
  - Users can only update Pending or Open complaints
  - Users cannot delete complaints
  - Admins can view/update/delete all complaints

### 20250112_fix_profiles_suspension_rls.sql
- **IMPORTANT**: Run this migration if suspension checks are hanging/timing out
- Fixes RLS policies on `profiles` table to allow users to read their own `is_suspended` status
- Required for the login suspension check to work properly
- Updates the SELECT policy to explicitly allow access to `is_suspended` column

### 20250112_auto_create_profiles.sql
- **IMPORTANT**: Run this to prevent "profile not found" errors
- Creates a database trigger that automatically creates a profile when a new user signs up
- Backfills profiles for existing users who don't have one
- Sets default values: role='customer', is_suspended=false
- Ensures all authenticated users always have a profile record

### 20250112_unauthenticated_suspension_check.sql
- **IMPORTANT**: Run this to allow suspension checks for unauthenticated users
- Creates a public RLS policy that allows anyone to SELECT from profiles table
- This is required for the suspension check to work when users are not authenticated
- Allows the frontend to check suspension status before authentication

## Storage Structure

Profile images will be stored in the following structure:
```
avatars/
  ├── {user_id}/
  │   ├── avatar_1234567890.jpg
  │   └── avatar_1234567891.png
```

Each user has their own folder identified by their UUID.

## Testing

After applying migrations, test the functionality:
1. Sign up or log in to your app
2. Navigate to Profile page
3. Click on the profile picture
4. Upload an image from camera or gallery
5. Verify the image appears and is saved

## Rollback (if needed)

If you need to rollback these changes:

```sql
-- Remove storage bucket
delete from storage.buckets where id = 'avatars';

-- Remove avatar_url column from profiles
alter table public.profiles drop column if exists avatar_url;
alter table public.profiles drop column if exists phone;
alter table public.profiles drop column if exists updated_at;
```

