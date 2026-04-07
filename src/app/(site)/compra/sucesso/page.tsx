import type { Metadata } from "next";
import Link from "next/link";
import { stripe } from "@/lib/stripe";
import DownloadButton from "@/components/DownloadButton";

export const metadata: Metadata = {
  title: "Compra realizada com sucesso!",
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function CompraSucessoPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  let productName = "Seu produto";
  let productPrice = "";
  let customerEmail = "";
  let productSlug = "";

  if (session_id && stripe) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["line_items"],
      });
      productName =
        session.line_items?.data[0]?.description || "Seu produto";
      productPrice = session.amount_total
        ? `R$ ${(session.amount_total / 100).toFixed(2).replace(".", ",")}`
        : "";
      customerEmail = session.customer_details?.email || "";
      productSlug = session.metadata?.product_slug || "";
    } catch {
      // Se nao conseguir recuperar a sessao, mostra dados genericos
    }
  }

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
        {/* Green checkmark */}
        <div className="mx-auto w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-success"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-3">
          Compra realizada com sucesso!
        </h1>
        <p className="text-ink-500 mb-8 max-w-md mx-auto">
          Obrigado pela sua compra! Sua skill ja esta disponivel para download e
          instalacao.
          {customerEmail && (
            <>
              {" "}
              Um recibo foi enviado para <strong>{customerEmail}</strong>.
            </>
          )}
        </p>

        {/* Download button autenticado via Supabase signed URLs */}
        {productSlug && (
          <div className="mb-8">
            <DownloadButton slug={productSlug} label="Baixar arquivos do produto" />
          </div>
        )}

        {/* Product summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 text-left">
          <div className="flex gap-4 items-center mb-4">
            <div className="w-16 h-12 bg-sand-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-ink-900">{productName}</h3>
              <p className="text-sm text-ink-500">Pagamento confirmado</p>
            </div>
            {productPrice && (
              <span className="ml-auto font-bold text-ink-900">
                {productPrice}
              </span>
            )}
          </div>

          <div className="border-t border-sand-200 pt-4 flex flex-col sm:flex-row gap-3">
            <Link
              href="/dashboard"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-500 text-white font-bold rounded-xl hover:bg-accent-600 transition-colors text-sm"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Ir para Minhas Compras
            </Link>
            <Link
              href="/browse"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-accent-500 text-accent-500 font-semibold rounded-xl hover:bg-accent-500 hover:text-white transition-colors text-sm"
            >
              Continuar Explorando
            </Link>
          </div>
        </div>

        {/* Installation guide */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 text-left">
          <h2 className="text-lg font-bold text-ink-900 mb-4">
            Guia rapido de instalacao
          </h2>
          <p className="text-sm text-ink-500 mb-4">
            Instale diretamente pelo terminal usando o OpenClaw CLI:
          </p>
          <div className="bg-ink-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto">
            <pre>clawhub install nome-da-skill</pre>
          </div>
          <p className="text-sm text-ink-500 mt-4">
            Apos a instalacao, reinicie seu agente para que a skill seja
            carregada automaticamente. Consulte a documentacao incluida nos
            arquivos para configuracoes avancadas.
          </p>
        </div>

        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-accent-500 font-semibold hover:text-accent-600 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Voltar ao Marketplace
        </Link>
      </div>
    </div>
  );
}
