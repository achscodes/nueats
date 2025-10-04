# Profile Picture Implementation Guide

This document describes the complete implementation of profile picture upload functionality using Supabase Storage.

## 🎯 What Was Implemented

### 1. Database Schema (`supabase/migrations/20250104_add_avatar_url_to_profiles.sql`)
- ✅ Adds `avatar_url` column (text, **nullable**) to existing `profiles` table
- ✅ Adds `phone` column if not exists (backward compatibility)
- ✅ Adds `updated_at` column with auto-update trigger
- ✅ Sets up/updates Row Level Security (RLS) policies for secure access
- ✅ Safe to run on existing `profiles` table with data

### 2. Storage Bucket (`supabase/migrations/20250104_create_avatars_storage.sql`)
- ✅ Created `avatars` storage bucket with:
  - Public access (readable by anyone)
  - 5MB file size limit
  - Allowed file types: jpeg, jpg, png, gif, webp
- ✅ RLS policies for storage:
  - Users can upload their own avatars
  - Users can update their own avatars
  - Users can delete their own avatars
  - Anyone can view avatars (public bucket)

### 3. Profile.jsx Updates
The following functionality was added:

#### Upload to Supabase Storage (`uploadImageToSupabase`)
```javascript
- Converts image URI to ArrayBuffer
- Uploads to Supabase Storage bucket
- Automatically deletes old avatar when uploading new one
- Returns public URL of uploaded image
- Stores images in user-specific folders: avatars/{user_id}/avatar_{timestamp}.{ext}
```

#### Camera Capture (`handleCameraCapture`)
- Opens device camera
- Allows user to take photo with editing
- Uploads to Supabase Storage
- Saves avatar_url to profiles table
- Updates local state with new image URL

#### Photo Library (`handlePhotoLibrary`)
- Opens device photo library
- Allows user to select photo with editing
- Uploads to Supabase Storage
- Saves avatar_url to profiles table
- Updates local state with new image URL

#### Load User Data (`loadUserData`)
- Fetches avatar_url from profiles table
- Displays stored avatar on profile page
- Falls back to user_metadata if profiles table empty

#### Save Profile (`handleSaveProfile`)
- Updates both auth.users metadata AND profiles table
- Saves avatar_url to profiles table on every profile save
- Syncs data across the app via AuthContext

## 🔐 Security Features

### Row Level Security (RLS)
1. **Profiles Table**:
   - Users can only read/write their own profile
   - Admins can access all profiles

2. **Storage Bucket**:
   - Users can only upload/modify/delete files in their own folder
   - All avatars are publicly viewable (read-only)

### File Validation
- Only image files allowed (jpeg, jpg, png, gif, webp)
- Maximum file size: 5MB
- Files stored in user-specific folders for isolation

## 📁 File Structure

```
supabase/
├── migrations/
│   ├── 20250104_add_avatar_url_to_profiles.sql   # Add avatar_url column + RLS
│   ├── 20250104_create_avatars_storage.sql       # Storage bucket + RLS
│   └── README.md                                  # Migration instructions
app/
└── Profile.jsx                                     # Updated with upload functionality
```

## 🚀 How to Deploy

### Step 1: Apply Database Migrations

**Using Supabase Dashboard:**
1. Go to https://app.supabase.com
2. Select your project
3. Navigate to SQL Editor
4. Run `20250104_add_avatar_url_to_profiles.sql` (adds column to existing table)
5. Run `20250104_create_avatars_storage.sql` (creates storage bucket)

**Using Supabase CLI:**
```bash
supabase db push
```

### Step 2: Verify Storage Bucket
1. Go to Supabase Dashboard → Storage
2. You should see an `avatars` bucket
3. Check bucket settings:
   - Public: ✅ Yes
   - File size limit: 5MB
   - Allowed MIME types: image/*

### Step 3: Test the Functionality
1. Run your app
2. Log in with a user account
3. Navigate to Profile page
4. Click on profile picture
5. Upload an image (camera or gallery)
6. Verify:
   - Image uploads successfully
   - Image appears on profile
   - Image is saved to Supabase Storage
   - avatar_url is saved in profiles table

## 🧪 Testing Checklist

- [ ] Apply both migrations successfully
- [ ] Verify `profiles` table exists in Supabase
- [ ] Verify `avatars` bucket exists in Storage
- [ ] Test camera capture upload
- [ ] Test gallery photo upload
- [ ] Verify image appears immediately after upload
- [ ] Verify image persists after app restart
- [ ] Test uploading multiple times (old image should be deleted)
- [ ] Verify file size limit (try uploading >5MB image)
- [ ] Test with different image formats (jpg, png, gif, webp)

## 📊 Database Schema

### profiles table
| Column        | Type         | Nullable | Default |
|---------------|--------------|----------|---------|
| id            | uuid         | NO       | -       |
| display_name  | text         | YES      | NULL    |
| phone         | text         | YES      | NULL    |
| avatar_url    | text         | YES      | NULL    |
| created_at    | timestamptz  | NO       | now()   |
| updated_at    | timestamptz  | NO       | now()   |

### Storage: avatars bucket
- **Bucket ID**: avatars
- **Public**: Yes
- **File Size Limit**: 5,242,880 bytes (5MB)
- **Allowed MIME Types**: image/jpeg, image/jpg, image/png, image/gif, image/webp

## 🔄 Data Flow

1. **Upload Process**:
   ```
   User selects image → 
   Convert to ArrayBuffer → 
   Upload to Supabase Storage (avatars/{user_id}/avatar_{timestamp}.ext) → 
   Get public URL → 
   Save URL to profiles.avatar_url → 
   Update local state → 
   Display image
   ```

2. **Load Process**:
   ```
   User opens profile → 
   Fetch from profiles table → 
   Get avatar_url → 
   Display image from Supabase CDN
   ```

3. **Update Process**:
   ```
   User uploads new image → 
   Delete old image from storage → 
   Upload new image → 
   Update profiles.avatar_url → 
   Display new image
   ```

## 🐛 Troubleshooting

### Issue: Image not uploading
- Check internet connection
- Verify Supabase credentials in `.env`
- Check file size (must be < 5MB)
- Verify bucket exists and is public
- Check RLS policies are applied

### Issue: Image uploads but doesn't appear
- Check if avatar_url is saved in profiles table
- Verify public URL is accessible
- Check if user is authenticated
- Clear app cache and reload

### Issue: Permission denied
- Verify RLS policies are applied correctly
- Check user is authenticated
- Verify user ID matches folder name in storage

### Issue: Old images not being deleted
- Check storage delete permissions
- Verify old avatar_url contains valid path
- Check console for error messages

## 📝 Notes

- Images are stored permanently unless manually deleted
- Each user can only have one "active" avatar (old ones are auto-deleted)
- Avatar URLs are public and can be accessed by anyone
- Images are served via Supabase CDN for fast loading
- Consider implementing image optimization for better performance
- Consider adding image compression before upload to reduce file size

## 🎨 UI/UX Features

- ✅ Loading indicator during upload ("Uploading image...")
- ✅ Success/error messages
- ✅ Image preview before upload (via ImagePicker editing)
- ✅ Fallback to initials if no avatar
- ✅ Camera or gallery selection modal
- ✅ Immediate visual feedback after upload

## 🔮 Future Enhancements

- [ ] Add image compression before upload
- [ ] Add image cropping tool
- [ ] Support multiple profile pictures
- [ ] Add avatar history/gallery
- [ ] Implement image optimization (WebP conversion)
- [ ] Add ability to remove avatar (set to null)
- [ ] Add progress indicator for large uploads
- [ ] Implement retry logic for failed uploads

