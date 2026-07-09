import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  "https://ftljoaladpytfnuqryuq.supabase.co";

const SUPABASE_ANON_KEY =
  "TU_ANON_KEY";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);