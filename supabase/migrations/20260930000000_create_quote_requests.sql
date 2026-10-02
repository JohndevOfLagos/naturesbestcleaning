CREATE TABLE IF NOT EXISTS public.quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  service text,
  plan text,
  property_type text,
  preferred_date text,
  message text,
  source text NOT NULL DEFAULT 'website',
  email_sent boolean NOT NULL DEFAULT false
);

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

GRANT ALL ON public.quote_requests TO service_role;