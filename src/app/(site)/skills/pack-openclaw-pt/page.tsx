import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OpenClaw PT Pack — Configure seu Agente em Portugues | AgentSkills",
  description:
    "Pack completo com 7 arquivos para configurar seu agente OpenClaw em portugues brasileiro. SOUL, AGENTS, BOOT, HEARTBEAT, MEMORY, IDENTITY e guia de setup.",
  openGraph: {
    title: "OpenClaw PT Pack | AgentSkills",
    description:
      "Pack completo para configurar seu agente OpenClaw em portugues brasileiro.",
    url: "https://agentskills.com.br/skills/pack-openclaw-pt",
    siteName: "AgentSkills",
    locale: "pt_BR",
    type: "website",
  },
};

const packFiles = [
  {
    name: "SOUL.md",
    description: "Define a alma e personalidade do agente — tom de voz, valores e estilo de comunicacao",
    icon: "✨",
  },
  {
    name: "AGENTS.md",
    description: "Configuracao de sub-agentes especializados que trabalham em conjunto",
    icon: "🤖",
  },
  {
    name: "BOOT.md",
    description: "Instrucoes de inicializacao — o que o agente faz ao ser ligado",
    icon: "🚀",
  },
  {
    name: "HEARTBEAT.md",
    description: "Sistema de monitoramento e health checks automaticos",
    icon: "💓",
  },
  {
    name: "MEMORY.md",
    description: "Arquitetura de memoria persistente em 3 camadas para contexto entre sessoes",
    icon: "🧠",
  },
  {
    name: "IDENTITY.md",
    description: "Identidade completa — nome, papel, contexto e limitacoes do agente",
    icon: "🪪",
  },
  {
    name: "SETUP-GUIDE.md",
    description: "Guia passo-a-passo para instalar e configurar tudo em 30 minutos",
    icon: "📖",
  },
];

const benefits = [
  "100% em portugues brasileiro — sem traducoes genericas",
  "Pronto para usar — copie os arquivos e configure em minutos",
  "Personalizavel — cada arquivo pode ser ajustado ao seu projeto",
  "Documentado — guia de setup completo com exemplos praticos",
  "Compativel com qualquer framework de agentes baseado em Markdown",
];

export default function PackOpenClawPtPage() {
  return (
    <div className="py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-ink-500 mb-8">
          <Link href="/" className="hover:text-accent-500">
            Home
          </Link>
          <span>/</span>
          <Link href="/browse" className="hover:text-accent-500">
            Marketplace
          </Link>
          <span>/</span>
          <span className="text-ink-700 font-medium">OpenClaw PT Pack</span>
        </nav>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">
          {/* Left - Visual */}
          <div className="lg:col-span-3">
            <div className="aspect-video bg-gradient-to-br from-ink-900 via-ink-700 to-accent-500 rounded-2xl overflow-hidden flex items-center justify-center relative">
              <div className="text-center px-8">
                <div className="text-6xl mb-4">🐾</div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  OpenClaw PT Pack
                </h2>
                <p className="text-white/70 text-lg">
                  7 arquivos essenciais para seu agente em portugues
                </p>
              </div>
              {/* Decorative elements */}
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
                  Sobre o Pack
                </h2>
                <div className="text-ink-700 leading-relaxed space-y-4">
                  <p>
                    O OpenClaw PT Pack e o kit definitivo para quem quer
                    configurar um agente OpenClaw totalmente em portugues
                    brasileiro, pronto para operar de forma autonoma e
                    inteligente.
                  </p>
                  <p>
                    Este pack inclui 7 arquivos essenciais que definem a
                    personalidade, comportamento, memoria e identidade do seu
                    agente. Cada arquivo foi cuidadosamente escrito em portugues,
                    seguindo as melhores praticas do ecossistema OpenClaw.
                  </p>
                  <p>
                    Ideal para desenvolvedores brasileiros que querem um agente
                    que realmente entende e se comunica em portugues nativo, sem
                    traducoes genericas.
                  </p>
                </div>
              </section>

              {/* Files included */}
              <section>
                <h2 className="text-xl font-bold text-ink-900 mb-4 pb-2 border-b border-sand-200">
                  O que esta incluido
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
            </div>
          </div>

          {/* Right - Purchase card */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700">
                  Bundle
                </span>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent-500/10 text-accent-600">
                  Portugues BR
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-3">
                OpenClaw PT Pack
              </h1>

              <p className="text-sm text-ink-500 mb-2">
                por Lucas Ferreira
              </p>

              <div className="flex items-center gap-4 text-sm text-ink-500 mb-6">
                <span>v1.0.0</span>
                <span>7 arquivos</span>
              </div>

              <div className="text-3xl font-bold text-ink-900 mb-6">
                R$ 97,00
              </div>

              <Link
                href="/checkout/pack-openclaw-pt"
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
                  Por que este pack?
                </h3>
                <ul className="space-y-2">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm">
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
                    Markdown (.md)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-500">Idioma</span>
                  <span className="font-medium text-ink-900">
                    Portugues BR
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-500">Entrega</span>
                  <span className="font-medium text-ink-900">
                    Download imediato
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-500">Licenca</span>
                  <span className="font-medium text-ink-900">
                    Uso pessoal e comercial
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
