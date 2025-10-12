-- Create complaint_responses table for admin responses to complaints
create table if not exists public.complaint_responses (
  response_id bigint primary key generated always as identity,
  complaint_id bigint not null references public.complaints(complaint_id) on delete cascade,
  admin_id uuid not null references auth.users(id) on delete cascade,
  admin_name text,
  response_text text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create index on complaint_id for faster queries
create index if not exists complaint_responses_complaint_id_idx on public.complaint_responses(complaint_id);

-- Create index on admin_id for admin queries
create index if not exists complaint_responses_admin_id_idx on public.complaint_responses(admin_id);

-- Create index on created_at for sorting
create index if not exists complaint_responses_created_at_idx on public.complaint_responses(created_at desc);

-- Add trigger to automatically update updated_at timestamp
create trigger set_complaint_responses_updated_at
  before update on public.complaint_responses
  for each row
  execute function public.set_updated_at();

-- Enable Row Level Security
alter table public.complaint_responses enable row level security;

-- Policy 1: Users can view responses to their own complaints
drop policy if exists "Users can view responses to their complaints" on public.complaint_responses;
create policy "Users can view responses to their complaints"
  on public.complaint_responses
  for select
  to authenticated
  using (
    exists (
      select 1 from public.complaints c
      where c.complaint_id = complaint_responses.complaint_id
      and c.user_id = auth.uid()
    )
  );

-- Policy 2: Admins can view all responses
drop policy if exists "Admins can view all responses" on public.complaint_responses;
create policy "Admins can view all responses"
  on public.complaint_responses
  for select
  to authenticated
  using (is_admin());

-- Policy 3: Admins can create responses
drop policy if exists "Admins can create responses" on public.complaint_responses;
create policy "Admins can create responses"
  on public.complaint_responses
  for insert
  to authenticated
  with check (is_admin());

-- Policy 4: Admins can update their own responses
drop policy if exists "Admins can update their responses" on public.complaint_responses;
create policy "Admins can update their responses"
  on public.complaint_responses
  for update
  to authenticated
  using (is_admin() and admin_id = auth.uid())
  with check (is_admin() and admin_id = auth.uid());

-- Policy 5: Admins can delete responses
drop policy if exists "Admins can delete responses" on public.complaint_responses;
create policy "Admins can delete responses"
  on public.complaint_responses
  for delete
  to authenticated
  using (is_admin());

-- Add comment to table
comment on table public.complaint_responses is 'Admin responses to user complaints';
comment on column public.complaint_responses.response_id is 'Primary key';
comment on column public.complaint_responses.complaint_id is 'Foreign key to complaints table';
comment on column public.complaint_responses.admin_id is 'Foreign key to auth.users (admin who responded)';
comment on column public.complaint_responses.admin_name is 'Display name of admin (cached for performance)';
comment on column public.complaint_responses.response_text is 'Admin response text';
comment on column public.complaint_responses.created_at is 'When response was created';
comment on column public.complaint_responses.updated_at is 'When response was last updated';
