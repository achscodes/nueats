-- Allow users to read complaint_responses only for complaints they own

DO $$
BEGIN
  -- Ensure table exists
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'complaint_responses'
  ) THEN
    -- Enable RLS (idempotent)
    EXECUTE 'ALTER TABLE public.complaint_responses ENABLE ROW LEVEL SECURITY';

    -- Drop any previous policy with same intent to stay idempotent
    IF EXISTS (
      SELECT 1 FROM pg_policies
      WHERE schemaname = 'public'
        AND tablename = 'complaint_responses'
        AND policyname = 'Users can read responses to their complaints'
    ) THEN
      EXECUTE 'DROP POLICY "Users can read responses to their complaints" ON public.complaint_responses';
    END IF;

    -- Create SELECT policy for owners of the parent complaint
    EXECUTE 'CREATE POLICY "Users can read responses to their complaints" ON public.complaint_responses
             FOR SELECT TO authenticated
             USING (
               EXISTS (
                 SELECT 1 FROM public.complaints c
                 WHERE c.complaint_id = complaint_responses.complaint_id
                   AND c.user_id = auth.uid()
               )
             )';
  END IF;
END $$;


