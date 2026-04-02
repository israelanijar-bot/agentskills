"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
  const [tab, setTab] = useState<"pix" | "cartao">("pix");
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  function handlePay() {
    setProcessing(true);
    setTimeout(() => {
      router.push("/compra/sucesso");
    }, 1500);
  }

  return (
    <div>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-ink-900 mb-6">Pagamento</h2>

        {/* Tabs */}
        <div className="flex rounded-xl bg-sand-100 p-1 mb-6">
          <button
            onClick={() => setTab("pix")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg cursor-pointer transition-all ${
              tab === "pix"
                ? "bg-white text-ink-900 shadow-sm"
                : "text-ink-500 hover:text-ink-700"
            }`}
          >
            PIX
          </button>
          <button
            onClick={() => setTab("cartao")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg cursor-pointer transition-all ${
              tab === "cartao"
                ? "bg-white text-ink-900 shadow-sm"
                : "text-ink-500 hover:text-ink-700"
            }`}
          >
            Cartao de Credito
          </button>
        </div>

        {/* PIX Tab */}
        {tab === "pix" && (
          <div className="space-y-4">
            {/* QR Code placeholder */}
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 bg-sand-100 rounded-xl flex items-center justify-center border-2 border-dashed border-sand-200 mb-4">
                <span className="text-sm text-ink-500 text-center font-medium">
                  QR Code PIX
                </span>
              </div>
            </div>

            {/* PIX copy-paste code */}
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                Codigo PIX (copiar e colar)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value="00020126580014br.gov.bcb.pix0136agentskills-checkout-mock-pix-code5204000053039865802BR5925AGENTSKILLS6009SAO PAULO"
                  className="flex-1 px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm text-ink-700 font-mono truncate"
                />
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(
                      "00020126580014br.gov.bcb.pix0136agentskills-checkout-mock-pix-code5204000053039865802BR5925AGENTSKILLS6009SAO PAULO"
                    );
                  }}
                  className="px-4 py-2.5 bg-sand-100 text-ink-700 rounded-xl text-sm font-medium hover:bg-sand-200 cursor-pointer transition-colors shrink-0"
                >
                  Copiar
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-ink-500 bg-sand-50 rounded-xl p-3">
              <svg
                className="w-5 h-5 text-warning shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Aguardando pagamento... O codigo PIX expira em 30 minutos.</span>
            </div>
          </div>
        )}

        {/* Cartao Tab */}
        {tab === "cartao" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                Numero do cartao
              </label>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                maxLength={19}
                className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-500/50 focus:border-accent-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1.5">
                  Validade
                </label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  maxLength={5}
                  className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-500/50 focus:border-accent-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1.5">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="000"
                  maxLength={4}
                  className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-500/50 focus:border-accent-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                Nome no cartao
              </label>
              <input
                type="text"
                placeholder="Como esta impresso no cartao"
                className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-500/50 focus:border-accent-500"
              />
            </div>
          </div>
        )}

        {/* Pay button */}
        <button
          onClick={handlePay}
          disabled={processing}
          className="w-full mt-6 px-6 py-4 bg-success text-white font-bold rounded-xl hover:bg-green-600 cursor-pointer transition-colors text-lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {processing ? "Processando..." : `Pagar ${priceText}`}
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
            Dados criptografados
          </span>
        </div>
      </div>
    </div>
  );
}
