import type { Metadata } from "next";
import Link from "next/link";
import CreatorCard from "@/components/CreatorCard";
import { creators } from "@/data/seed";

export const metadata: Metadata = {
  title: "Venda suas Skills",
  description:
    "Transforme seu conhecimento em renda vendendo skills e personas para OpenClaw no AgentSkills. Ganhe 85% de cada venda.",
  openGraph: {
    title: "Venda suas Skills no AgentSkills",
    description:
      "Transforme seu conhecimento em renda. Ganhe 85% de cada venda de skills para agentes de IA.",
    url: "https://agentskills.com.br/criadores",
  },
};

const steps = [
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    title: "Crie",
    description:
      "Desenvolva skills e personas usando o framework OpenClaw. Use nossos templates e documentacao para criar produtos profissionais.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
    ),
    title: "Publique",
    description:
      "Envie seu produto para revisao. Nossa equipe garante a qualidade de tudo que e publicado no marketplace.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Ganhe",
    description:
      "Receba 85% de cada venda diretamente na sua conta. Pagamentos mensais via Pix ou transferencia bancaria.",
  },
];

const stats = [
  { value: "R$ 500K+", label: "Pagos a criadores" },
  { value: "250+", label: "Criadores ativos" },
  { value: "85%", label: "Comissao por venda" },
  { value: "2.000+", label: "Produtos publicados" },
];

export default function CriadoresPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-accent-500 to-accent-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Venda suas Skills no AgentSkills
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-4">
            Transforme seu conhecimento em renda. Crie skills e personas para
            OpenClaw e alcance milhares de desenvolvedores.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-10">
            <span className="text-2xl font-bold text-white">85%</span>
            <span className="text-white/80 text-sm">de comissao por venda</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-accent-600 font-bold rounded-xl hover:bg-sand-50 transition-colors text-lg"
            >
              Comecar a Vender
            </Link>
            <Link
              href="/como-funciona"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-lg"
            >
              Como Funciona
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-sand-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-ink-900">
                  {stat.value}
                </div>
                <div className="text-sm text-ink-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works for creators */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 text-center mb-4">
            Como comecar a vender
          </h2>
          <p className="text-ink-700 text-center max-w-xl mx-auto mb-12">
            Em tres passos simples voce comeca a ganhar dinheiro com suas skills
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div
                key={step.title}
                className="relative bg-white rounded-2xl p-8 shadow-sm text-center"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-accent-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </div>
                <div className="flex justify-center mb-4 text-accent-500">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-ink-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-ink-700 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured creators */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 text-center mb-4">
            Criadores em Destaque
          </h2>
          <p className="text-ink-700 text-center max-w-xl mx-auto mb-12">
            Conheca quem esta criando as melhores skills do marketplace
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {creators.map((creator) => (
              <CreatorCard key={creator.username} creator={creator} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-sand-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-4">
            Pronto para transformar conhecimento em renda?
          </h2>
          <p className="text-lg text-ink-700 max-w-xl mx-auto mb-8">
            Junte-se a mais de 250 criadores que ja estao ganhando dinheiro no
            AgentSkills.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-8 py-4 bg-accent-500 text-white font-bold rounded-xl hover:bg-accent-600 transition-colors text-lg"
          >
            Comecar a Vender Agora
          </Link>
        </div>
      </section>
    </div>
  );
}
