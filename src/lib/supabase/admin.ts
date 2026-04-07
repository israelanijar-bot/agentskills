import { createClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase com service_role key.
 * Bypass completo de RLS — use APENAS em contextos server-side de confianca
 * (webhooks, APIs internas autenticadas, scripts de admin).
 *
 * NUNCA use no cliente (browser) ou em rotas publicas sem autenticacao.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY nao configurado. Adicione em .env.local e no Vercel."
    );
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
