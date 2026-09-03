import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser-side Supabase client (anon key, subject to Row Level Security).
 * Returns null when the project isn't configured yet, so the UI can degrade
 * gracefully instead of throwing during render.
 */
let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowserClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;
  if (browserClient) return browserClient;

  browserClient = createClient(url, key, {
    auth: { persistSession: false },
  });
  return browserClient;
}
