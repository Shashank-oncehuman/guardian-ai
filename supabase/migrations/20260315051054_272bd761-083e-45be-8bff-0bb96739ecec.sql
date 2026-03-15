
-- Create timeline_events table
CREATE TABLE public.timeline_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL DEFAULT 'scandal',
  risk_level public.risk_level NOT NULL DEFAULT 'medium',
  entities text[] NOT NULL DEFAULT '{}'::text[],
  proof text,
  source text,
  linked_entity_ids uuid[] DEFAULT '{}'::uuid[],
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Anyone can read timeline_events" ON public.timeline_events
  FOR SELECT TO public USING (true);

-- Public insert for seeding
CREATE POLICY "Anyone can insert timeline_events" ON public.timeline_events
  FOR INSERT TO public WITH CHECK (true);
