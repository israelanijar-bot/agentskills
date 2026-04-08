import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Assistente Pessoal IA — Template Wendy | AgentSkills",
  description:
    "Sua assistente pessoal inteligente em portugues. Conhece sua rotina, rastreia seus projetos, envia briefings diarios e esta presente quando voce precisa. Inspirada em Wendy Rhoades (Billions).",
  openGraph: {
    title: "Assistente Pessoal IA — Template Wendy | AgentSkills",
    description:
      "Uma assistente pessoal de verdade — nao um chatbot generico. Briefings diarios, rastreamento de projetos e coaching integrado.",
    url: "https://agentskills.com.br/skills/assistente-pessoal-wendy",
    siteName: "AgentSkills",
    locale: "pt_BR",
    type: "website",
  },
};

const packFiles = [
  {
    name: "SOUL.md",
    description: "Caráter, tom e anti-patterns — a personalidade da assistente",
    icon: "✨",
  },
  {
    name: "IDENTITY.md",
    description: "Identificacao, canal de comunicacao e limites de acesso",
    icon: "🪪",
  },
  {
    name: "MISSION.md",
    description: "Missao, protocolo de projeto parado e mapa de pessoas",
    icon: "🎯",
  },
  {
    name: "HEARTBEAT.md",
    description: "Briefing matinal, resumo diario 17h15 e visao de domingo",
    icon: "💓",
  },
  {
    name: "BOOT.md",
    description: "Rotina de inicializacao a cada nova sessao",
    icon: "🚀",
  },
  {
    name: "USER.md",
    description: "Perfil completo do usuario (preenchido no onboarding)",
    icon: "👤",
  },
  {
    name: "MEMORY.md",
    description: "Memoria de longo prazo — projetos, pessoas, decisoes",
    icon: "🧠",
  },
  {
    name: "SKILL.md",
    description: "Roteiro de onboarding em 5 blocos + comportamento diario + coach TCC",
    icon: "📘",
  },
  {
    name: "INSTALL.md",
    description: "Guia passo a passo de instalacao (30-60 minutos)",
    icon: "⚙️",
  },
  {
    name: "README.md",
    description: "Visao geral do produto e requisitos",
    icon: "📄",
  },
  {
    name: "skill.yaml",
    description: "Metadata da skill + comandos disponiveis",
    icon: "🗂️",
  },
];

const capabilities = [
  {
    title: "Onboarding profundo",
    description:
      "Na primeira conversa, ela te entrevista em 5 blocos: identidade, projetos, rotina, pessoas importantes e estilo de comunicacao. Tudo vira memoria permanente.",
    icon: "🎬",
  },
  {
    title: "Briefing matinal automatico",
    description:
      "Todo dia no horario que voce escolheu: agenda, foco do dia, pendentes e alertas de projetos parados ha mais de 7 dias.",
    icon: "🌅",
  },
  {
    title: "Resumo do dia as 17h15",
    description:
      "O que foi resolvido, o que ficou para amanha, duvidas para confirmar e pessoas novas identificadas nas conversas.",
    icon: "🌇",
  },
  {
    title: "Mapa de pessoas",
    description:
      "Constroi continuamente quem e quem na sua vida — familia, socios, clientes, prioridades — e associa a projetos.",
    icon: "🗺️",
  },
  {
    title: "Coach TCC integrado",
    description:
      "Quando voce quer conversar, ela entra naturalmente. Usa tecnicas de TCC sem jargao clinico. Nunca invalida o que voce sente.",
    icon: "🧘",
  },
  {
    title: "Nunca invasiva",
    description:
      "Respeita horarios protegidos. Nunca responde mensagens por voce sem pedido explicito. Nunca inventa informacoes.",
    icon: "🛡️",
  },
];

const benefits = [
  "100% em portugues brasileiro, tom proximo e direto",
  "Zero exposicao pessoal — template puro, pronto para personalizar",
  "Onboarding guiado coleta tudo em 5-10 minutos",
  "Inspirada em Wendy Rhoades (Billions): direta, perceptiva, leal",
  "Protocolo de seguranca com CVV para momentos de crise",
  "Funciona no WhatsApp ou Telegram via OpenClaw",
];

export default function AssistentePessoalWendyPage() {
  return (
    <div className="py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">
          {/* Left - Visual */}
          <div className="lg:col-span-3">
            <div className="aspect-video bg-gradient-to-br from-ink-900 via-ink-700 to-accent-500 rounded-2xl overflow-hidden flex items-center justify-center relative">
              <div className="text-center px-8">
                <div className="text-6xl mb-4">🤖</div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  Assistente Pessoal IA
                </h2>
                <p className="text-white/70 text-lg">
                  A secretaria que conhece voce de verdade
                </p>
              </div>
              <div className="absolute top-4 left-4 text-white/10 text-8xl font-mono">
                {"{"}
              </div>
              <div className="absolute bottom-4 right-4 text-white/10 text-8xl font-mono">
                {"}"}
              </div>
            </div>

            {/* Description */}
            <div className="mt-8 space-y-6">
              <section>
                <h2 className="text-xl font-bold text-ink-900 mb-4 pb-2 border-b border-sand-200">
                  Nao e um chatbot generico
                </h2>
                <div className="text-ink-700 leading-relaxed space-y-4">
                  <p>
                    E uma assistente pessoal de verdade. Ela conhece sua rotina,
                    rastreia seus projetos, sabe quem sao as pessoas importantes
                    na sua vida e garante que nada importante se perca.
                  </p>
                  <p>
                    Inspirada em <strong>Wendy Rhoades (Billions)</strong>:
                    direta, perceptiva, leal. Nunca intrusiva, nunca omissa.
                    Combina tres papeis em um — assistente que organiza, coach
                    que observa padroes, e suporte emocional quando voce quer
                    conversar.
                  </p>
                  <p>
                    Este pack e um <strong>template puro</strong>. Zero
                    exposicao pessoal. Voce instala, ela te entrevista em 5-10
                    minutos e passa a conhecer voce.
                  </p>
                </div>
              </section>

              {/* Capabilities */}
              <section>
                <h2 className="text-xl font-bold text-ink-900 mb-4 pb-2 border-b border-sand-200">
                  O que ela faz no dia a dia
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {capabilities.map((c) => (
                    <div
                      key={c.title}
                      className="flex items-start gap-3 p-4 bg-sand-50 rounded-xl"
                    >
                      <span className="text-2xl shrink-0">{c.icon}</span>
                      <div>
                        <h3 className="font-semibold text-ink-900 text-sm">
                          {c.title}
                        </h3>
                        <p className="text-sm text-ink-500 mt-0.5">
                          {c.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Files included */}
              <section>
                <h2 className="text-xl font-bold text-ink-900 mb-4 pb-2 border-b border-sand-200">
                  O que esta incluido (11 arquivos)
                </h2>
                <div className="space-y-3">
                  {packFiles.map((file) => (
                    <div
                      key={file.name}
                      className="flex items-start gap-3 p-3 bg-sand-50 rounded-xl"
                    >
                      <span className="text-2xl shrink-0">{file.icon}</span>
                      <div>
                        <h3 className="font-semibold text-ink-900 font-mono text-sm">
                          {file.name}
                        </h3>
                        <p className="text-sm text-ink-500 mt-0.5">
                          {file.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Requirements */}
              <section>
                <h2 className="text-xl font-bold text-ink-900 mb-4 pb-2 border-b border-sand-200">
                  Requisitos
                </h2>
                <ul className="space-y-2 text-ink-700">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-500 font-bold">•</span>
                    <span>
                      OpenClaw instalado (guia incluido — pode usar Hostinger
                      VPS)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-500 font-bold">•</span>
                    <span>WhatsApp ou Telegram conectado ao OpenClaw</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-500 font-bold">•</span>
                    <span>API key da Anthropic (ou creditos Nexos)</span>
                  </li>
                </ul>
              </section>

              {/* Safety disclaimer */}
              <section className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <h3 className="font-semibold text-amber-900 text-sm mb-1">
                  Aviso importante
                </h3>
                <p className="text-sm text-amber-800">
                  E uma ferramenta de organizacao e suporte de performance.
                  Nao substitui terapia ou acompanhamento profissional. Em
                  momentos de crise, ela indica o CVV (188, 24h, gratuito).
                </p>
              </section>
            </div>
          </div>

          {/* Right - Purchase card */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700">
                  Template
                </span>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent-500/10 text-accent-600">
                  Portugues BR
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-3">
                Assistente Pessoal IA — Template Wendy
              </h1>

              <p className="text-sm text-ink-500 mb-2">por AgentSkills</p>

              <div className="flex items-center gap-4 text-sm text-ink-500 mb-6">
                <span>v1.0.0</span>
                <span>11 arquivos</span>
              </div>

              <div className="text-3xl font-bold text-ink-900 mb-6">
                R$ 97,00
              </div>

              <Link
                href="/checkout/assistente-pessoal-wendy"
                className="block w-full px-6 py-4 bg-accent-500 text-white font-bold rounded-xl hover:bg-accent-600 transition-colors text-lg text-center mb-4"
              >
                Comprar Agora
              </Link>

              <p className="text-xs text-ink-500 text-center mb-8">
                Pagamento seguro via Stripe. Acesso imediato apos a compra.
              </p>

              {/* Benefits */}
              <div className="bg-sand-50 rounded-xl p-4 space-y-3">
                <h3 className="font-semibold text-ink-900 text-sm">
                  Por que este template?
                </h3>
                <ul className="space-y-2">
                  {benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2 text-sm"
                    >
                      <svg
                        className="w-5 h-5 text-success shrink-0 mt-0.5"
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
                      <span className="text-ink-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick info */}
              <div className="mt-4 bg-sand-50 rounded-xl p-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-ink-500">Formato</span>
                  <span className="font-medium text-ink-900">
                    Markdown + YAML
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-500">Idioma</span>
                  <span className="font-medium text-ink-900">Portugues BR</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-500">Entrega</span>
                  <span className="font-medium text-ink-900">
                    Download imediato
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-500">Canal</span>
                  <span className="font-medium text-ink-900">
                    WhatsApp / Telegram
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-500">Setup</span>
                  <span className="font-medium text-ink-900">30-60 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
