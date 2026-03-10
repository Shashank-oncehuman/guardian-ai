
-- Entity types enum
CREATE TYPE public.entity_type AS ENUM ('officer', 'politician', 'contractor', 'company', 'celebrity', 'business_magnate');
CREATE TYPE public.risk_level AS ENUM ('low', 'medium', 'high');
CREATE TYPE public.complaint_status AS ENUM ('pending', 'investigating', 'resolved');

-- Entities table
CREATE TABLE public.entities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type entity_type NOT NULL,
  department TEXT,
  designation TEXT,
  location TEXT NOT NULL,
  risk_score INTEGER DEFAULT 0 CHECK (risk_score >= 0 AND risk_score <= 100),
  risk_level risk_level DEFAULT 'low',
  complaints_count INTEGER DEFAULT 0,
  contracts_count INTEGER DEFAULT 0,
  news_hits INTEGER DEFAULT 0,
  political_connections INTEGER DEFAULT 0,
  dark_web_signals INTEGER DEFAULT 0,
  financial_anomalies INTEGER DEFAULT 0,
  prediction_score INTEGER DEFAULT 0,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Complaints table
CREATE TABLE public.complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id TEXT UNIQUE NOT NULL,
  reporter_name TEXT,
  entity_name TEXT NOT NULL,
  entity_id UUID REFERENCES public.entities(id) ON DELETE SET NULL,
  department TEXT,
  location TEXT,
  description TEXT NOT NULL,
  amount BIGINT,
  status complaint_status DEFAULT 'pending',
  anonymous BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- News reports table
CREATE TABLE public.news_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  headline TEXT NOT NULL,
  source TEXT NOT NULL,
  published_date DATE,
  linked_entities TEXT[] DEFAULT '{}',
  keywords TEXT[] DEFAULT '{}',
  risk_level risk_level DEFAULT 'low',
  content TEXT,
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Relationships (for network graph)
CREATE TABLE public.relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_entity_id UUID REFERENCES public.entities(id) ON DELETE CASCADE,
  target_entity_id UUID REFERENCES public.entities(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL,
  description TEXT,
  strength INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- AI predictions log
CREATE TABLE public.predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID REFERENCES public.entities(id) ON DELETE CASCADE,
  prediction_score INTEGER NOT NULL,
  risk_factors JSONB DEFAULT '[]',
  model_used TEXT,
  ai_analysis TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Audit logs
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Public read policies (this is a public intelligence platform)
CREATE POLICY "Anyone can read entities" ON public.entities FOR SELECT USING (true);
CREATE POLICY "Anyone can read news" ON public.news_reports FOR SELECT USING (true);
CREATE POLICY "Anyone can read relationships" ON public.relationships FOR SELECT USING (true);
CREATE POLICY "Anyone can read predictions" ON public.predictions FOR SELECT USING (true);
CREATE POLICY "Anyone can submit complaints" ON public.complaints FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read complaints" ON public.complaints FOR SELECT USING (true);
CREATE POLICY "Anyone can read audit_logs" ON public.audit_logs FOR SELECT USING (true);
CREATE POLICY "Anyone can insert audit_logs" ON public.audit_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert predictions" ON public.predictions FOR INSERT WITH CHECK (true);

-- Indexes
CREATE INDEX idx_entities_name ON public.entities USING gin (to_tsvector('english', name));
CREATE INDEX idx_entities_type ON public.entities (type);
CREATE INDEX idx_entities_risk ON public.entities (risk_score DESC);
CREATE INDEX idx_complaints_entity ON public.complaints (entity_id);
CREATE INDEX idx_predictions_entity ON public.predictions (entity_id);
