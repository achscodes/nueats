-- Create complaints table
create table if not exists public.complaints (
  complaint_id bigint primary key generated always as identity,
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null check (category in ('food quality', 'service', 'app issue', 'billing', 'pickup delay', 'other')),
  title text not null,
  description text not null,
  status text not null default 'Pending' check (status in ('Pending', 'Open', 'Resolved')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz,
  updated_at timestamptz not null default now()
);

-- Create index on user_id for faster queries
create index if not exists complaints_user_id_idx on public.complaints(user_id);

-- Create index on status for filtering
create index if not exists complaints_status_idx on public.complaints(status);

-- Create index on created_at for sorting
create index if not exists complaints_created_at_idx on public.complaints(created_at desc);

-- Add trigger to automatically update updated_at timestamp
create trigger set_complaints_updated_at
  before update on public.complaints
  for each row
  execute function public.set_updated_at();

-- Add trigger to set resolved_at when status changes to Resolved
create or replace function public.set_complaint_resolved_at()
returns trigger
language plpgsql
as $$
begin
  -- If status is changing to 'Resolved' and resolved_at is not set, set it
  if new.status = 'Resolved' and old.status != 'Resolved' and new.resolved_at is null then
    new.resolved_at = now();
  end if;
  
  -- If status is changing from 'Resolved' to 'Open' or 'Pending', clear resolved_at
  if new.status in ('Open', 'Pending') and old.status = 'Resolved' then
    new.resolved_at = null;
  end if;
  
  return new;
end;
$$;

create trigger set_complaint_resolved_at_trigger
  before update on public.complaints
  for each row
  execute function public.set_complaint_resolved_at();

-- Enable Row Level Security
alter table public.complaints enable row level security;

-- Policy 1: Users can view their own complaints
drop policy if exists "Users can view their own complaints" on public.complaints;
create policy "Users can view their own complaints"
  on public.complaints
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Policy 2: Users can insert their own complaints
drop policy if exists "Users can insert their own complaints" on public.complaints;
create policy "Users can insert their own complaints"
  on public.complaints
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Policy 3: Users can update their own pending/open complaints (title, description, category only)
drop policy if exists "Users can update their own open complaints" on public.complaints;
create policy "Users can update their own open complaints"
  on public.complaints
  for update
  to authenticated
  using (auth.uid() = user_id and status in ('Pending', 'Open'))
  with check (auth.uid() = user_id and status in ('Pending', 'Open'));

-- Policy 4: Users cannot delete complaints
drop policy if exists "Users cannot delete complaints" on public.complaints;
create policy "Users cannot delete complaints"
  on public.complaints
  for delete
  to public
  using (false);

-- Policy 5: Admins can view all complaints
drop policy if exists "Admins can view all complaints" on public.complaints;
create policy "Admins can view all complaints"
  on public.complaints
  for select
  to authenticated
  using (is_admin());

-- Policy 6: Admins can update all complaints (including status)
drop policy if exists "Admins can update all complaints" on public.complaints;
create policy "Admins can update all complaints"
  on public.complaints
  for update
  to authenticated
  using (is_admin())
  with check (is_admin());

-- Policy 7: Admins can delete complaints
drop policy if exists "Admins can delete complaints" on public.complaints;
create policy "Admins can delete complaints"
  on public.complaints
  for delete
  to authenticated
  using (is_admin());

-- Add comment to table
comment on table public.complaints is 'User complaints and support tickets';
comment on column public.complaints.complaint_id is 'Primary key';
comment on column public.complaints.user_id is 'Foreign key to auth.users';
comment on column public.complaints.category is 'Category of complaint: food quality, service, app issue, billing, pickup delay, other';
comment on column public.complaints.title is 'Brief title of complaint';
comment on column public.complaints.description is 'Detailed description of complaint';
comment on column public.complaints.status is 'Status: Pending (default), Open, or Resolved';
comment on column public.complaints.created_at is 'When complaint was created';
comment on column public.complaints.resolved_at is 'When complaint was resolved (nullable)';
comment on column public.complaints.updated_at is 'When complaint was last updated';
