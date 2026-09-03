import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client. Uses the service role key, which bypasses RLS —
 * it must never be imported into a component that ships to the browser.
 */
export function getSupabaseAdminClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "x-application-name": "portfolio-contact" } },
  });
}
