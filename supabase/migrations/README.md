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

