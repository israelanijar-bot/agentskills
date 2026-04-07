"use client";

import { useState } from "react";

interface CheckoutPaymentProps {
  price: number;
  priceText: string;
  slug: string;
}

export default function CheckoutPayment({
  price,
  priceText,
  slug,
}: CheckoutPaymentProps) {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  async function handlePay() {
    setProcessing(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Se nao autenticado, redireciona para login
        if (response.status === 401 && data.redirect) {
          window.location.href = data.redirect;
          return;
        }
        throw new Error(data.error || "Erro ao processar pagamento");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
      setProcessing(false);
    }
  }

  return (
    <div>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-ink-900 mb-6">Pagamento</h2>

        <p className="text-sm text-ink-500 mb-6">
          Voce sera redirecionado para o ambiente seguro do Stripe para concluir
          o pagamento com cartao de credito ou debito.
        </p>

        {/* Metodos aceitos */}
        <div className="flex items-center gap-3 mb-6 p-4 bg-sand-50 rounded-xl">
          <span className="text-sm text-ink-500">Aceitamos:</span>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-white rounded text-xs font-bold text-blue-700 border border-sand-200">
              VISA
            </span>
            <span className="px-2 py-1 bg-white rounded text-xs font-bold text-red-600 border border-sand-200">
              Master
            </span>
            <span className="px-2 py-1 bg-white rounded text-xs font-bold text-blue-500 border border-sand-200">
              Amex
            </span>
            <span className="px-2 py-1 bg-white rounded text-xs font-bold text-green-700 border border-sand-200">
              Elo
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-xl">
            {error}
          </div>
        )}

        {/* Pay button */}
        <button
          onClick={handlePay}
          disabled={processing}
          className="w-full px-6 py-4 bg-success text-white font-bold rounded-xl hover:bg-green-600 cursor-pointer transition-colors text-lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {processing ? "Redirecionando ao Stripe..." : `Pagar ${priceText}`}
        </button>

        {/* Security badges */}
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-ink-500">
          <span className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Pagamento seguro
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            Stripe Checkout
          </span>
        </div>
      </div>
    </div>
  );
}
