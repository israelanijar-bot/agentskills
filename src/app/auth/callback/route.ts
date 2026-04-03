import { NextResponse } from "next/server";

// Redirect to client-side handler that exchanges the code
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirect = searchParams.get("redirect") || "/";

  if (code) {
    // Pass code to client-side page that will exchange it
    const url = new URL(`${origin}/auth/confirm`);
    url.searchParams.set("code", code);
    url.searchParams.set("redirect", redirect);
    return NextResponse.redirect(url.toString());
  }

  return NextResponse.redirect(`${origin}/login?error=no-code`);
}
