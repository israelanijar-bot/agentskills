import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirect = searchParams.get("redirect") || "/";

  if (code) {
    const response = NextResponse.redirect(`${origin}${redirect}`);
    const cookiesSet: string[] = [];

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            const cookieHeader = request.headers.get("cookie") || "";
            if (!cookieHeader) return [];
            return cookieHeader.split("; ").map((c) => {
              const [name, ...rest] = c.split("=");
              return { name, value: rest.join("=") };
            });
          },
          setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookiesSet.push(name);
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      // Debug: mostrar o erro na URL
      const errorUrl = new URL(`${origin}/login`);
      errorUrl.searchParams.set("error", error.message);
      return NextResponse.redirect(errorUrl.toString());
    }

    // Debug: se nenhum cookie foi setado, algo está errado
    if (cookiesSet.length === 0) {
      const errorUrl = new URL(`${origin}/login`);
      errorUrl.searchParams.set("error", "no-cookies-set");
      return NextResponse.redirect(errorUrl.toString());
    }

    return response;
  }

  return NextResponse.redirect(`${origin}/login?error=no-code`);
}
