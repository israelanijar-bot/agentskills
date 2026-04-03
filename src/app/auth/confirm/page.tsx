"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Suspense } from "react";

function ConfirmAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    async function exchangeCode() {
      if (!code) {
        router.push("/login?error=no-code");
        return;
      }

      const supabase = createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        router.push(`/login?error=${encodeURIComponent(error.message)}`);
        return;
      }

      router.push(redirect);
      router.refresh();
    }

    exchangeCode();
  }, [code, redirect, router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-ink-500">Finalizando login...</p>
      </div>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense>
      <ConfirmAuth />
    </Suspense>
  );
}
