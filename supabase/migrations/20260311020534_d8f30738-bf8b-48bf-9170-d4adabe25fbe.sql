
ALTER TABLE public.entities
  ADD COLUMN IF NOT EXISTS declared_income bigint DEFAULT 0,
  ADD COLUMN IF NOT EXISTS known_spending bigint DEFAULT 0,
  ADD COLUMN IF NOT EXISTS known_assets bigint DEFAULT 0,
  ADD COLUMN IF NOT EXISTS wealth_source text DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS income_spending_ratio numeric(5,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS disproportionate_wealth boolean DEFAULT false;
