import { createClient } from "@supabase/supabase-js";

// Both values are public by design (the publishable key is gated by RLS), so
// they double as fallbacks for builds that have no env configured.
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://dtsijvpwlzyfowwaqdxj.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  "sb_publishable_nwuLp74ImTYC8nLPeSEj_g_vw3zUZEG";

/** Storage bucket holding uploaded images and the CV. */
export const MEDIA_BUCKET = "media";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
