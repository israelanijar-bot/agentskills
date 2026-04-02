import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { categories, products, creators } from "@/data/seed";
import { toCardProduct } from "@/lib/utils";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return { title: "Categoria nao encontrada" };
  }

  return {
    title: `Skills de ${category.name} para OpenClaw`,
    description:
      category.description ||
      `Encontre as melhores skills e personas de ${category.name} para seus agentes de IA no AgentSkills.`,
    openGraph: {
      title: `Skills de ${category.name} para OpenClaw | AgentSkills`,
      description: `Encontre as melhores skills e personas de ${category.name} para seus agentes de IA.`,
      url: `https://agentskills.com.br/categoria/${category.slug}`,
      siteName: "AgentSkills",
      locale: "pt_BR",
      type: "website",
    },
  };
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(
    (p) => p.categoryId === category.id
  );

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{category.icon}</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-ink-900">
              {category.name}
            </h1>
          </div>
          <p className="text-lg text-ink-700 max-w-2xl mb-2">
            {category.description}
          </p>
          <p className="text-sm text-ink-500">
            {categoryProducts.length}{" "}
            {categoryProducts.length === 1
              ? "produto encontrado"
              : "produtos encontrados"}
          </p>
        </div>

        {/* Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard
                key={product.slug}
                product={toCardProduct(product, categories, creators)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-lg font-semibold text-ink-900 mb-2">
              Nenhum produto nesta categoria ainda
            </h3>
            <p className="text-ink-500">
              Volte em breve! Novos produtos sao adicionados toda semana.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
