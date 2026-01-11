-- ClientFlow Extension - Clients Table Schema
-- Run this in your Supabase SQL Editor

-- Create clients table
create table if not exists clients (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  color text not null default '#3b82f6',
  google_index text,
  tools jsonb not null default '[]'::jsonb
);

-- Enable Row Level Security
alter table clients enable row level security;

-- RLS Policies: Users can only access their own clients

-- Policy: Users can view their own clients
create policy "Users can view own clients"
  on clients for select
  using (auth.uid() = user_id);

-- Policy: Users can insert their own clients
create policy "Users can insert own clients"
  on clients for insert
  with check (auth.uid() = user_id);

-- Policy: Users can update their own clients  
create policy "Users can update own clients"
  on clients for update
  using (auth.uid() = user_id);

-- Policy: Users can delete their own clients
create policy "Users can delete own clients"
  on clients for delete
  using (auth.uid() = user_id);

-- Create index for faster queries by user_id
create index if not exists clients_user_id_idx on clients(user_id);

-- Create index for updated_at (useful for sorting)
create index if not exists clients_updated_at_idx on clients(updated_at desc);
