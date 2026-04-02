import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import CreatorCard from "@/components/CreatorCard";
import HowItWorks from "@/components/HowItWorks";
import NewsletterSection from "@/components/NewsletterSection";
import {
  getPopularSkills,
  getPopularPersonas,
  creators,
  categories,
} from "@/data/seed";
import { toCardProduct } from "@/lib/utils";

export const metadata = {
  title: "AgentSkills - O Marketplace de Skills para seus Agentes de IA",
  description:
    "Descubra, compre e instale skills e personas prontas para OpenClaw. Criado por especialistas, pronto para producao. O maior marketplace brasileiro de IA.",
  openGraph: {
    title: "AgentSkills - O Marketplace de Skills para seus Agentes de IA",
    description:
      "Descubra, compre e instale skills e personas prontas para OpenClaw. O maior marketplace brasileiro de habilidades para agentes de IA.",
    url: "https://agentskills.com.br",
    siteName: "AgentSkills",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "AgentSkills - O Marketplace de Skills para seus Agentes de IA",
    description:
      "Descubra, compre e instale skills e personas prontas para OpenClaw.",
  },
};

export default function HomePage() {
  const popularSkills = getPopularSkills().slice(0, 6);
  const popularPersonas = getPopularPersonas().slice(0, 4);
  const featuredCreators = creators.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Skills Mais Populares */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink-900">
                Skills Mais Populares
              </h2>
              <p className="text-ink-700 mt-2">
                As skills mais baixadas pela comunidade
              </p>
            </div>
            <Link
              href="/browse?tipo=skill"
              className="hidden sm:inline-flex text-sm font-semibold text-accent-500 hover:text-accent-600"
            >
              Ver todas &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularSkills.map((product) => (
              <ProductCard
                key={product.slug}
                product={toCardProduct(product, categories, creators)}
              />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/browse?tipo=skill"
              className="text-sm font-semibold text-accent-500 hover:text-accent-600"
            >
              Ver todas as skills &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Personas Mais Populares */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink-900">
                Personas Mais Populares
              </h2>
              <p className="text-ink-700 mt-2">
                Personas prontas para turbinar seus agentes
              </p>
            </div>
            <Link
              href="/browse?tipo=persona"
              className="hidden sm:inline-flex text-sm font-semibold text-accent-500 hover:text-accent-600"
            >
              Ver todas &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularPersonas.map((product) => (
              <ProductCard
                key={product.slug}
                product={toCardProduct(product, categories, creators)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <HowItWorks />

      {/* Criadores em Destaque */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink-900">
                Criadores em Destaque
              </h2>
              <p className="text-ink-700 mt-2">
                Conheca os melhores criadores da plataforma
              </p>
            </div>
            <Link
              href="/criadores"
              className="hidden sm:inline-flex text-sm font-semibold text-accent-500 hover:text-accent-600"
            >
              Ver todos &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredCreators.map((creator) => (
              <CreatorCard key={creator.username} creator={creator} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Venda suas Skills */}
      <section className="py-16 sm:py-20 bg-accent-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Venda suas Skills no AgentSkills
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Transforme seu conhecimento em renda. Crie skills e personas para
            OpenClaw e ganhe 85% de cada venda.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/criadores"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-accent-600 font-bold rounded-xl hover:bg-sand-50 transition-colors text-lg"
            >
              Comecar a Vender
            </Link>
            <Link
              href="/como-funciona"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-lg"
            >
              Saiba Mais
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />
    </>
  );
}
