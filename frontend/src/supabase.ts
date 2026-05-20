import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config.js";
import type { Database } from "./database.types.js";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Missing Supabase configuration. Set window.__P11_CONFIG__.supabaseUrl and supabaseAnonKey, or configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
  );
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

const ACCESS_COOKIE_KEY = "p11_access_token";

function writeAccessCookie(accessToken: string) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  if (!accessToken) {
    document.cookie = `${ACCESS_COOKIE_KEY}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
    return;
  }
  document.cookie =
    `${ACCESS_COOKIE_KEY}=${encodeURIComponent(accessToken)}; ` +
    `Path=/; Max-Age=3600; SameSite=Lax${secure}`;
}

async function syncAccessCookieFromSession() {
  try {
    const { data } = await supabase.auth.getSession();
    writeAccessCookie(data?.session?.access_token || "");
  } catch (_error) {
    writeAccessCookie("");
  }
}

supabase.auth.onAuthStateChange((_event, session) => {
  writeAccessCookie(session?.access_token || "");
});

syncAccessCookieFromSession();
