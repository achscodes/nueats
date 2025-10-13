-- Enable RLS on menu_items and allow public read access (anon and authenticated)

-- Ensure table exists before applying (won't error if absent in local dev)
DO $$
BEGIN
  -- Enable RLS if table exists
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'menu_items'
  ) THEN
    EXECUTE 'ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY';

    -- Drop existing select policy if present to avoid duplicates during re-runs
    IF EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE schemaname = 'public' AND tablename = 'menu_items' AND policyname = 'Allow public read on menu_items'
    ) THEN
      EXECUTE 'DROP POLICY "Allow public read on menu_items" ON public.menu_items';
    END IF;

    -- Create policy to allow anyone (anon or authenticated) to read menu_items
    EXECUTE 'CREATE POLICY "Allow public read on menu_items" ON public.menu_items
             FOR SELECT TO anon, authenticated
             USING (true)';
  END IF;
END $$;


