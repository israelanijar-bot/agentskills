import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compra realizada com sucesso!",
  robots: { index: false, follow: false },
};

export default function CompraSucessoPage() {
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
        </p>

        {/* Product summary mock */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 text-left">
          <div className="flex gap-4 items-center mb-4">
            <div className="w-16 h-12 bg-sand-100 rounded-xl overflow-hidden shrink-0">
              <img
                src="https://placehold.co/400x300/1a1a2e/e0e0e0?text=Skill"
                alt="Produto"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-ink-900">
                Sistema de Memoria 3 Camadas
              </h3>
              <p className="text-sm text-ink-500">por Rafael Oliveira</p>
            </div>
            <span className="ml-auto font-bold text-ink-900">R$ 79,90</span>
          </div>

          <div className="border-t border-sand-200 pt-4 flex flex-col sm:flex-row gap-3">
            <Link
              href="#"
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
              Baixar Arquivos
            </Link>
            <Link
              href="#instrucoes"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-accent-500 text-accent-500 font-semibold rounded-xl hover:bg-accent-500 hover:text-white transition-colors text-sm"
            >
              Ver instrucoes de instalacao
            </Link>
          </div>
        </div>

        {/* Installation guide */}
        <div
          id="instrucoes"
          className="bg-white rounded-2xl p-6 shadow-sm mb-8 text-left"
        >
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
          Continuar Explorando
        </Link>
      </div>
    </div>
  );
}
