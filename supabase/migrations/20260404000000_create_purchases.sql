-- Tabela de compras (purchases)
-- Story 1.1 — OpenClaw PT Pack

create table if not exists public.purchases (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  product_slug text not null,
  stripe_session_id text,
  stripe_payment_intent text,
  amount integer not null,
  currency text not null default 'brl',
  status text not null default 'completed',
  created_at timestamptz not null default now()
);

-- Indices
create index if not exists idx_purchases_user_id on public.purchases(user_id);
create index if not exists idx_purchases_product_slug on public.purchases(product_slug);
create unique index if not exists idx_purchases_stripe_session on public.purchases(stripe_session_id) where stripe_session_id is not null;

-- RLS: usuario so ve proprias compras
alter table public.purchases enable row level security;

create policy "Usuarios veem apenas proprias compras"
  on public.purchases
  for select
  using (auth.uid() = user_id);

create policy "Apenas service_role pode inserir compras"
  on public.purchases
  for insert
  with check (true);
