"use client";

import Link from "next/link";

export default function CompraCanceladoPage() {
  return (
    <>
      <title>Pagamento cancelado | AgentSkills</title>
      <meta name="robots" content="noindex, nofollow" />

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
          {/* Warning icon */}
          <div className="mx-auto w-20 h-20 bg-warning/10 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-warning"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-3">
            Pagamento cancelado
          </h1>
          <p className="text-ink-500 mb-8 max-w-md mx-auto">
            Seu pagamento nao foi processado. Nenhuma cobranca foi realizada.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent-500 text-white font-bold rounded-xl hover:bg-accent-600 cursor-pointer transition-colors"
            >
              Tentar Novamente
            </button>
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 text-ink-500 font-semibold hover:text-accent-500 transition-colors"
            >
              Voltar ao Marketplace
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
