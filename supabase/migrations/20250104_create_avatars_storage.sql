-- Create storage bucket for avatars
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars',
  'avatars',
  true,
  5242880, -- 5MB limit
  array['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
)
on conflict (id) do nothing;

-- Note: RLS is already enabled on storage.objects by default in Supabase

-- Policy: Users can upload their own avatar
drop policy if exists "Users can upload their own avatar" on storage.objects;
create policy "Users can upload their own avatar"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'avatars' 
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Users can update their own avatar
drop policy if exists "Users can update their own avatar" on storage.objects;
create policy "Users can update their own avatar"
on storage.objects for update to authenticated
using (
  bucket_id = 'avatars' 
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'avatars' 
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Users can delete their own avatar
drop policy if exists "Users can delete their own avatar" on storage.objects;
create policy "Users can delete their own avatar"
on storage.objects for delete to authenticated
using (
  bucket_id = 'avatars' 
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Anyone can view avatars (public bucket)
drop policy if exists "Anyone can view avatars" on storage.objects;
create policy "Anyone can view avatars"
on storage.objects for select
using (bucket_id = 'avatars');

