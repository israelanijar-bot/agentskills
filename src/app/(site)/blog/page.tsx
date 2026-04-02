import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artigos, tutoriais e novidades sobre OpenClaw, agentes de IA, skills e automacao. Tudo em portugues.",
  openGraph: {
    title: "Blog | AgentSkills",
    description:
      "Artigos, tutoriais e novidades sobre OpenClaw, agentes de IA, skills e automacao.",
    url: "https://agentskills.com.br/blog",
  },
};

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "como-instalar-openclaw",
    title: "Como Instalar o OpenClaw no seu Computador em 10 Minutos",
    excerpt:
      "Guia passo a passo para instalar e configurar o OpenClaw no macOS, Windows e Linux. Do zero ate seu primeiro agente funcionando.",
    date: "28 Mar 2026",
    readingTime: "8 min de leitura",
    category: "Tutorial",
    image: "/images/blog/instalar-openclaw.jpg",
  },
  {
    slug: "5-skills-essenciais",
    title: "5 Skills Essenciais para Todo Agente de IA",
    excerpt:
      "Descubra quais sao as skills mais importantes para equipar seus agentes de IA e como elas podem transformar sua produtividade.",
    date: "25 Mar 2026",
    readingTime: "6 min de leitura",
    category: "Dicas",
    image: "/images/blog/skills-essenciais.jpg",
  },
  {
    slug: "criando-primeira-skill",
    title: "Guia Completo: Criando sua Primeira Skill para OpenClaw",
    excerpt:
      "Aprenda a criar, testar e publicar sua primeira skill no marketplace do AgentSkills. Inclui exemplos de codigo e melhores praticas.",
    date: "20 Mar 2026",
    readingTime: "12 min de leitura",
    category: "Tutorial",
    image: "/images/blog/criando-skill.jpg",
  },
  {
    slug: "ganhar-dinheiro-vendendo-skills",
    title: "Como Ganhar Dinheiro Vendendo Skills de IA",
    excerpt:
      "Estrategias comprovadas para monetizar seu conhecimento criando e vendendo skills no AgentSkills. Criadores ja faturaram mais de R$ 500K.",
    date: "15 Mar 2026",
    readingTime: "10 min de leitura",
    category: "Negocios",
    image: "/images/blog/ganhar-dinheiro.jpg",
  },
  {
    slug: "openclaw-vs-outras-plataformas",
    title: "OpenClaw vs Outras Plataformas de Agentes: Comparativo 2026",
    excerpt:
      "Analise comparativa entre OpenClaw, LangChain, AutoGPT e CrewAI. Veja qual framework e melhor para cada caso de uso.",
    date: "10 Mar 2026",
    readingTime: "15 min de leitura",
    category: "Analise",
    image: "/images/blog/comparativo.jpg",
  },
  {
    slug: "automacao-com-ia",
    title: "Automacao com IA: Como Agentes Estao Revolucionando Negocios",
    excerpt:
      "Cases reais de empresas brasileiras que estao usando agentes de IA para automatizar processos e reduzir custos em ate 60%.",
    date: "5 Mar 2026",
    readingTime: "9 min de leitura",
    category: "Tendencias",
    image: "/images/blog/automacao.jpg",
  },
];

const categoryColors: Record<string, string> = {
  Tutorial: "bg-accent-500/10 text-accent-600",
  Dicas: "bg-green-100 text-green-700",
  Negocios: "bg-amber-100 text-amber-700",
  Analise: "bg-purple-100 text-purple-700",
  Tendencias: "bg-blue-100 text-blue-700",
};

export default function BlogPage() {
  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-ink-900 mb-4">
            Blog AgentSkills
          </h1>
          <p className="text-lg text-ink-700 max-w-2xl mx-auto">
            Artigos, tutoriais e novidades sobre OpenClaw, agentes de IA e o
            futuro da automacao.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Image */}
              <div className="aspect-video bg-gradient-to-br from-sand-100 to-sand-200 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-sand-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full ${
                      categoryColors[post.category] || categoryColors.Dicas
                    }`}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-ink-500">
                    {post.readingTime}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-ink-900 mb-2 group-hover:text-accent-500 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-ink-700 line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <span className="text-xs text-ink-500">{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
