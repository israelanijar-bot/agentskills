import Link from "next/link";

export const metadata = {
  title: "Agente Autonomo do Zero — Crie seu agente de IA autonomo por R$97",
  description:
    "Pack completo com guia PDF, SOUL.md, AGENTS.md, MEMORY.md, HEARTBEAT.md e MISSION.md para montar seu agente autonomo do zero.",
  openGraph: {
    title: "Agente Autonomo do Zero — Crie seu agente de IA autonomo por R$97",
    description:
      "Pack completo para criar e configurar seu agente de IA autonomo. 6 arquivos essenciais + guia passo a passo.",
    url: "https://agentskills.com.br",
    siteName: "AgentSkills",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Agente Autonomo do Zero — R$97",
    description:
      "Pack completo para criar seu agente de IA autonomo. Guia PDF + 5 arquivos de configuracao.",
  },
};

const incluso = [
  {
    titulo: "Guia PDF",
    descricao: "Passo a passo completo para montar seu agente autonomo do zero, mesmo sem experiencia tecnica.",
    icone: "📖",
  },
  {
    titulo: "SOUL.md",
    descricao: "Define a personalidade, tom de voz e valores do seu agente. A alma que guia todas as interacoes.",
    icone: "🧠",
  },
  {
    titulo: "AGENTS.md",
    descricao: "Configuracao de sub-agentes especializados que trabalham juntos de forma orquestrada.",
    icone: "🤖",
  },
  {
    titulo: "MEMORY.md",
    descricao: "Sistema de memoria persistente para que seu agente lembre de tudo entre sessoes.",
    icone: "💾",
  },
  {
    titulo: "HEARTBEAT.md",
    descricao: "Monitoramento automatico e health checks para manter seu agente sempre saudavel.",
    icone: "💓",
  },
  {
    titulo: "MISSION.md",
    descricao: "Define a missao, objetivos e limites do agente. O norte que direciona cada decisao.",
    icone: "🎯",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-sand-50 to-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-accent-500/10 text-accent-600 text-sm font-semibold rounded-full mb-6">
            Novo produto
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink-900 leading-tight mb-6">
            Crie seu Agente de IA{" "}
            <span className="text-accent-500">Autonomo do Zero</span>
          </h1>
          <p className="text-lg sm:text-xl text-ink-600 max-w-2xl mx-auto mb-10">
            Pack completo com guia passo a passo e 5 arquivos de configuracao
            prontos. Tudo o que voce precisa para ter um agente de IA rodando de
            forma autonoma — mesmo sem experiencia tecnica.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link
              href="/checkout/agente-autonomo-do-zero"
              className="inline-flex items-center justify-center px-10 py-4 bg-accent-500 text-white font-bold text-lg rounded-2xl hover:bg-accent-600 transition-colors shadow-lg shadow-accent-500/25"
            >
              Comprar por R$ 97,00
            </Link>
            <span className="text-sm text-ink-500">
              Pagamento unico — acesso vitalicio
            </span>
          </div>
        </div>
      </section>

      {/* O que esta incluso */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-3">
              O que esta incluso
            </h2>
            <p className="text-ink-600 max-w-xl mx-auto">
              6 itens essenciais para voce configurar e lancar seu agente
              autonomo hoje mesmo.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {incluso.map((item) => (
              <div
                key={item.titulo}
                className="bg-white rounded-2xl p-6 shadow-sm border border-sand-100 hover:shadow-md transition-shadow"
              >
                <span className="text-3xl mb-4 block">{item.icone}</span>
                <h3 className="text-lg font-bold text-ink-900 mb-2">
                  {item.titulo}
                </h3>
                <p className="text-sm text-ink-600 leading-relaxed">
                  {item.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Para quem e */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-3">
              Para quem e esse pack?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "Desenvolvedores que querem automatizar tarefas com agentes de IA",
              "Empreendedores que querem um assistente virtual inteligente",
              "Entusiastas de IA que querem sair da teoria e colocar em pratica",
              "Times que precisam de agentes autonomos para operacoes do dia a dia",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-1 shrink-0 w-6 h-6 bg-accent-500/10 text-accent-500 rounded-full flex items-center justify-center text-sm font-bold">
                  ✓
                </span>
                <p className="text-ink-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 sm:py-20 bg-accent-500">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Monte seu agente autonomo hoje
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            Pare de assistir tutoriais. Tenha em maos os arquivos prontos e o
            guia completo para colocar seu agente para rodar.
          </p>
          <Link
            href="/checkout/agente-autonomo-do-zero"
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-accent-600 font-bold text-lg rounded-2xl hover:bg-sand-50 transition-colors shadow-lg"
          >
            Comprar por R$ 97,00
          </Link>
        </div>
      </section>
    </>
  );
}
