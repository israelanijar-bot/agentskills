import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Como Funciona",
  description:
    "Aprenda como explorar, comprar e instalar skills e personas para OpenClaw no AgentSkills. Guia completo passo a passo.",
  openGraph: {
    title: "Como Funciona o AgentSkills",
    description:
      "Aprenda como explorar, comprar e instalar skills e personas para OpenClaw no AgentSkills.",
    url: "https://agentskills.com.br/como-funciona",
  },
};

const steps = [
  {
    number: "01",
    title: "Explore",
    subtitle: "Encontre a skill perfeita",
    description:
      "Navegue pelo nosso marketplace com mais de 2.000 skills e personas. Use filtros por categoria, tipo, preco e popularidade para encontrar exatamente o que precisa.",
    details: [
      "Busque por nome, categoria ou criador",
      "Filtre por tipo: Skills, Personas ou Bundles",
      "Veja avaliacoes e numero de vendas",
      "Compare opcoes similares lado a lado",
      "Confira a descricao detalhada e arquivos incluidos",
    ],
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
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Compre",
    subtitle: "Pagamento rapido e seguro",
    description:
      "Faca sua compra em segundos com os metodos de pagamento mais populares do Brasil. Sem burocracia, sem complicacao.",
    details: [
      "Pague com Pix - aprovacao instantanea",
      "Cartao de credito em ate 12x sem juros",
      "Boleto bancario com vencimento em 3 dias",
      "Garantia de 7 dias - reembolso sem perguntas",
      "Nota fiscal emitida automaticamente",
    ],
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
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Instale",
    subtitle: "Configure em minutos",
    description:
      "Instale suas skills diretamente no OpenClaw com um simples comando. Nenhuma configuracao complexa necessaria.",
    details: [
      "Copie o comando de instalacao da pagina do produto",
      "Execute no terminal do seu computador",
      "A skill e configurada automaticamente no OpenClaw",
      "Teste com um prompt simples para verificar",
      "Pronto! Seu agente agora tem uma nova habilidade",
    ],
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
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

const faqs = [
  {
    q: "O que e o OpenClaw?",
    a: "OpenClaw e uma plataforma open-source para criar e gerenciar agentes de IA. Ele permite que voce instale skills (habilidades) e personas (personalidades) para personalizar o comportamento dos seus agentes.",
  },
  {
    q: "Preciso saber programar para usar as skills?",
    a: "Nao! A maioria das skills e instalada com um simples comando no terminal. Basta copiar e colar o comando da pagina do produto e seu agente ja estara configurado.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Aceitamos Pix (aprovacao instantanea), cartao de credito em ate 12x sem juros e boleto bancario. Todas as transacoes sao processadas com seguranca pela nossa plataforma de pagamento.",
  },
  {
    q: "Posso pedir reembolso?",
    a: "Sim! Oferecemos garantia de 7 dias para todas as compras. Se a skill nao atender suas expectativas, basta solicitar o reembolso e devolvemos 100% do valor.",
  },
  {
    q: "Posso vender minhas proprias skills?",
    a: "Com certeza! Qualquer pessoa pode se cadastrar como criador e vender skills no AgentSkills. Voce ganha 85% de cada venda. Visite a pagina de Criadores para saber mais.",
  },
  {
    q: "As skills funcionam com qualquer agente de IA?",
    a: "As skills do AgentSkills sao projetadas especificamente para o OpenClaw. Algumas podem ser adaptadas para outros frameworks, mas recomendamos usar com o OpenClaw para melhor compatibilidade.",
  },
  {
    q: "Quanto custa para comecar?",
    a: "Temos diversas skills gratuitas para voce comecar. As skills pagas variam de R$ 9,90 a R$ 199,90, dependendo da complexidade e funcionalidades incluidas.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-sand-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 mb-6">
            Como Funciona o AgentSkills
          </h1>
          <p className="text-lg sm:text-xl text-ink-700 max-w-2xl mx-auto">
            Em tres passos simples, voce turbina seus agentes de IA com skills
            profissionais criadas por especialistas.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {steps.map((step, idx) => (
              <div
                key={step.number}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center w-12 h-12 bg-accent-500/10 text-accent-500 rounded-2xl">
                      {step.icon}
                    </span>
                    <span className="text-sm font-bold text-accent-500 uppercase tracking-wider">
                      Passo {step.number}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-2">
                    {step.title}
                  </h2>
                  <p className="text-lg font-medium text-ink-700 mb-4">
                    {step.subtitle}
                  </p>
                  <p className="text-ink-700 mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  <ul className="space-y-3">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3">
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
                        <span className="text-ink-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual placeholder */}
                <div className="flex-1 w-full">
                  <div className="aspect-video bg-gradient-to-br from-sand-100 to-sand-200 rounded-2xl flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4 text-accent-500/30">
                        {step.icon}
                      </div>
                      <p className="text-sm text-ink-500 font-medium">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Install example */}
      <section className="py-16 sm:py-20 bg-ink-900">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
            Instalacao Simples via Terminal
          </h2>
          <p className="text-white/60 text-center mb-8">
            Veja como e facil instalar uma skill no OpenClaw
          </p>
          <div className="bg-black/40 rounded-2xl p-6 font-mono text-sm overflow-x-auto">
            <div className="text-white/40 mb-4"># 1. Instale o OpenClaw (se ainda nao tiver)</div>
            <div className="text-green-400 mb-6">$ npm install -g openclaw</div>

            <div className="text-white/40 mb-4"># 2. Instale a skill do marketplace</div>
            <div className="text-green-400 mb-6">$ openclaw install @agentskills/atendimento-smart</div>

            <div className="text-white/40 mb-4"># 3. Verifique a instalacao</div>
            <div className="text-green-400 mb-2">$ openclaw skills list</div>
            <div className="text-white/60 mb-1">Skill instalada: atendimento-smart v2.1.0</div>
            <div className="text-white/60 mb-1">Criador: @maria-tech</div>
            <div className="text-white/60 mb-6">Status: Ativa</div>

            <div className="text-white/40 mb-4"># 4. Teste com um prompt</div>
            <div className="text-green-400 mb-2">$ openclaw chat &quot;Ola, preciso de ajuda com meu pedido&quot;</div>
            <div className="text-white/60">Agente: Ola! Claro, ficarei feliz em ajudar. Qual e o numero do seu pedido?</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 text-center mb-12">
            Perguntas Frequentes
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h3 className="font-semibold text-ink-900 text-lg mb-3">
                  {faq.q}
                </h3>
                <p className="text-ink-700 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-accent-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Pronto para comecar?
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            Explore nosso marketplace e encontre a skill perfeita para seus
            agentes de IA.
          </p>
          <Link
            href="/browse"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-accent-600 font-bold rounded-xl hover:bg-sand-50 transition-colors text-lg"
          >
            Explorar Marketplace
          </Link>
        </div>
      </section>
    </div>
  );
}
