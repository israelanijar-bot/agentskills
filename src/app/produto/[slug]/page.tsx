import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import CategoryBadge from "@/components/CategoryBadge";
import {
  products,
  categories,
  creators,
  getProductBySlug,
} from "@/data/seed";
import { formatPrice, toCardProduct } from "@/lib/utils";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

function getCategoryName(categoryId: string) {
  return categories.find((c) => c.id === categoryId)?.name ?? "";
}

function getCategorySlug(categoryId: string) {
  return categories.find((c) => c.id === categoryId)?.slug ?? "";
}

function getCreatorName(creatorId: string) {
  return creators.find((c) => c.id === creatorId)?.name ?? "";
}

function getCreatorUsername(creatorId: string) {
  return creators.find((c) => c.id === creatorId)?.username ?? "";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Produto nao encontrado" };
  }

  const priceText =
    product.price === 0 ? "Gratis" : formatPrice(product.price);

  return {
    title: `${product.title} - ${priceText}`,
    description: product.longDescription
      ? product.longDescription.slice(0, 160)
      : product.description,
    openGraph: {
      title: `${product.title} | AgentSkills`,
      description: product.description,
      url: `https://agentskills.com.br/produto/${product.slug}`,
      siteName: "AgentSkills",
      locale: "pt_BR",
      type: "website",
      images: product.image ? [{ url: product.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | AgentSkills`,
      description: product.description,
    },
  };
}

const typeLabels: Record<string, string> = {
  skill: "Skill",
  persona: "Persona",
  bundle: "Bundle",
};

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const categoryName = getCategoryName(product.categoryId);
  const categorySlug = getCategorySlug(product.categoryId);
  const creatorName = getCreatorName(product.creatorId);
  const creatorUsername = getCreatorUsername(product.creatorId);

  const relatedProducts = products
    .filter(
      (p) => p.categoryId === product.categoryId && p.slug !== product.slug
    )
    .slice(0, 3);

  const priceText =
    product.price === 0 ? "Gratis" : formatPrice(product.price);
  const isFree = product.price === 0;

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.image,
    brand: {
      "@type": "Organization",
      name: "AgentSkills",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      url: `https://agentskills.com.br/produto/${product.slug}`,
    },
    creator: {
      "@type": "Person",
      name: creatorName,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-ink-500 mb-8">
            <Link href="/" className="hover:text-accent-500">
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/categoria/${categorySlug}`}
              className="hover:text-accent-500"
            >
              {categoryName}
            </Link>
            <span>/</span>
            <span className="text-ink-700 font-medium">{product.title}</span>
          </nav>

          {/* Product */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">
            {/* Left - Image */}
            <div className="lg:col-span-3">
              <div className="aspect-video bg-sand-100 rounded-2xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right - Info */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <CategoryBadge name={categoryName} type="category" />
                  <CategoryBadge
                    name={typeLabels[product.type]}
                    type={product.type}
                  />
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-3">
                  {product.title}
                </h1>

                <Link
                  href={`/criador/${creatorUsername}`}
                  className="inline-flex items-center gap-2 text-sm text-ink-700 hover:text-accent-500 mb-4"
                >
                  <div className="w-6 h-6 bg-sand-200 rounded-full" />
                  <span>por {creatorName}</span>
                </Link>

                <div className="flex items-center gap-4 text-sm text-ink-500 mb-6">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    {product.salesCount.toLocaleString("pt-BR")} vendas
                  </span>
                  <span className="flex items-center gap-1">
                    v{product.version}
                  </span>
                </div>

                <div className="text-3xl font-bold text-ink-900 mb-6">
                  {priceText}
                </div>

                <div className="flex items-center gap-3 mb-8">
                  <button className="flex-1 px-6 py-4 bg-accent-500 text-white font-bold rounded-xl hover:bg-accent-600 cursor-pointer transition-colors text-lg">
                    {isFree ? "Baixar Gratis" : `Comprar por ${priceText}`}
                  </button>
                  <button
                    className="p-4 border-2 border-sand-200 rounded-xl text-ink-500 hover:text-red-500 hover:border-red-200 cursor-pointer transition-colors"
                    aria-label="Favoritar"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Quick info */}
                <div className="bg-sand-50 rounded-xl p-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-ink-500">Tipo</span>
                    <span className="font-medium text-ink-900">
                      {typeLabels[product.type]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-500">Categoria</span>
                    <span className="font-medium text-ink-900">
                      {categoryName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-500">Versao</span>
                    <span className="font-medium text-ink-900">
                      {product.version}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-500">Vendas</span>
                    <span className="font-medium text-ink-900">
                      {product.salesCount.toLocaleString("pt-BR")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description sections */}
          <div className="max-w-3xl space-y-12 mb-16">
            {/* Descricao */}
            <section>
              <h2 className="text-xl font-bold text-ink-900 mb-4 pb-2 border-b border-sand-200">
                Descricao
              </h2>
              <div className="text-ink-700 leading-relaxed whitespace-pre-line">
                {product.longDescription}
              </div>
            </section>

            {/* O que esta incluido */}
            {product.filesIncluded && product.filesIncluded.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-ink-900 mb-4 pb-2 border-b border-sand-200">
                  O que esta incluido
                </h2>
                <ul className="space-y-3">
                  {product.filesIncluded.map((file) => (
                    <li key={file} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-accent-500 shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-ink-700">{file}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Como instalar */}
            {product.installInstructions && (
              <section>
                <h2 className="text-xl font-bold text-ink-900 mb-4 pb-2 border-b border-sand-200">
                  Como instalar
                </h2>
                <div className="bg-ink-900 rounded-xl p-6 font-mono text-sm text-green-400 overflow-x-auto">
                  <pre className="whitespace-pre-wrap">
                    {product.installInstructions}
                  </pre>
                </div>
              </section>
            )}
          </div>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-ink-900 mb-6">
                Mais do mesmo criador
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard
                    key={p.slug}
                    product={toCardProduct(p, categories, creators)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
