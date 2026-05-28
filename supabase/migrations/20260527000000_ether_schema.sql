-- 
-- Ether — Database Schema
-- 

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- Profiles
create table profiles (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  username      text unique not null,
  display_name  text,
  bio           text,
  updated_at    timestamptz not null default now(),

  constraint profiles_user_id_key unique (user_id)
);

create index profiles_user_id_idx on profiles (user_id);


-- Media logs
create type media_type as enum ('movie', 'series', 'book', 'game');
create type log_status as enum ('in-progress', 'completed', 'dropped');

create table media_logs (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  media_type  media_type not null,
  title       text not null,
  subtitle    text,
  status      log_status not null default 'in-progress',
  logged_at   timestamptz not null default now()
);

create index media_logs_user_id_idx  on media_logs (user_id);
create index media_logs_type_idx     on media_logs (media_type);
create index media_logs_status_idx   on media_logs (status);


-- Reviews
create table reviews (
  id          uuid primary key default gen_random_uuid(),
  log_id      uuid not null references media_logs (id) on delete cascade,
  content     text,
  mood        text,
  rating      smallint check (rating >= 1 and rating <= 10),
  created_at  timestamptz not null default now(),

  constraint reviews_log_id_key unique (log_id)  -- one review per log entry
);

create index reviews_log_id_idx on reviews (log_id);


-- Tags
create type tag_category as enum ('mood', 'aesthetic', 'theme', 'genre');

create table tags (
  id        uuid primary key default gen_random_uuid(),
  name      text not null,
  category  tag_category not null,

  constraint tags_name_category_key unique (name, category)
);


-- Log tags (join) 
create table log_tags (
  log_id  uuid not null references media_logs (id) on delete cascade,
  tag_id  uuid not null references tags (id) on delete cascade,

  primary key (log_id, tag_id)
);

create index log_tags_tag_id_idx on log_tags (tag_id);


-- Favorites
create table favorites (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  log_id      uuid not null references media_logs (id) on delete cascade,
  created_at  timestamptz not null default now(),

  constraint favorites_user_log_key unique (user_id, log_id)
);

create index favorites_user_id_idx on favorites (user_id);


-- Row Level Security

alter table profiles   enable row level security;
alter table media_logs enable row level security;
alter table reviews    enable row level security;
alter table log_tags   enable row level security;
alter table favorites  enable row level security;

-- Profiles
create policy "users can view all profiles"
  on profiles for select using (true);

create policy "users can update own profile"
  on profiles for update using (auth.uid() = user_id);

-- Media logs
create policy "users can view own logs"
  on media_logs for select using (auth.uid() = user_id);

create policy "users can insert own logs"
  on media_logs for insert with check (auth.uid() = user_id);

create policy "users can update own logs"
  on media_logs for update using (auth.uid() = user_id);

create policy "users can delete own logs"
  on media_logs for delete using (auth.uid() = user_id);

-- Reviews
create policy "users can view own reviews"
  on reviews for select using (
    auth.uid() = (select user_id from media_logs where id = reviews.log_id)
  );

create policy "users can insert own reviews"
  on reviews for insert with check (
    auth.uid() = (select user_id from media_logs where id = reviews.log_id)
  );

create policy "users can update own reviews"
  on reviews for update using (
    auth.uid() = (select user_id from media_logs where id = reviews.log_id)
  );

create policy "users can delete own reviews"
  on reviews for delete using (
    auth.uid() = (select user_id from media_logs where id = reviews.log_id)
  );

-- Log tags
create policy "users can view own log tags"
  on log_tags for select using (
    auth.uid() = (select user_id from media_logs where id = log_tags.log_id)
  );

create policy "users can manage own log tags"
  on log_tags for all using (
    auth.uid() = (select user_id from media_logs where id = log_tags.log_id)
  );

-- Favorites
create policy "users can view own favorites"
  on favorites for select using (auth.uid() = user_id);

create policy "users can manage own favorites"
  on favorites for all using (auth.uid() = user_id);


-- Updated at trigger 
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on profiles
  for each row execute function update_updated_at();