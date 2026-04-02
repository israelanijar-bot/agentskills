import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import {
  creators,
  products,
  categories,
  getCreatorByUsername,
} from "@/data/seed";
import { toCardProduct } from "@/lib/utils";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return creators.map((creator) => ({
    username: creator.username,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const creator = getCreatorByUsername(username);

  if (!creator) {
    return { title: "Criador nao encontrado" };
  }

  return {
    title: `${creator.name} (@${creator.username})`,
    description: creator.bio,
    openGraph: {
      title: `${creator.name} | AgentSkills`,
      description: creator.bio,
      url: `https://agentskills.com.br/criador/${creator.username}`,
      siteName: "AgentSkills",
      locale: "pt_BR",
      type: "profile",
      images: creator.avatar ? [{ url: creator.avatar }] : [],
    },
    twitter: {
      card: "summary",
      title: `${creator.name} | AgentSkills`,
      description: creator.bio,
    },
  };
}

export default async function CriadorPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const creator = getCreatorByUsername(username);

  if (!creator) {
    notFound();
  }

  const creatorProducts = products.filter(
    (p) => p.creatorId === creator.id
  );

  const totalSales = creatorProducts.reduce(
    (sum, p) => sum + p.salesCount,
    0
  );

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Profile header */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm mb-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-sand-100"
            />

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-1">
                {creator.name}
              </h1>
              <p className="text-ink-500 mb-4">@{creator.username}</p>
              <p className="text-ink-700 leading-relaxed max-w-2xl mb-6">
                {creator.bio}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-center sm:justify-start gap-8">
                <div>
                  <div className="text-xl font-bold text-ink-900">
                    {creatorProducts.length}
                  </div>
                  <div className="text-sm text-ink-500">Produtos</div>
                </div>
                <div className="w-px h-10 bg-sand-200" />
                <div>
                  <div className="text-xl font-bold text-ink-900">
                    {totalSales.toLocaleString("pt-BR")}
                  </div>
                  <div className="text-sm text-ink-500">Vendas totais</div>
                </div>
                <div className="w-px h-10 bg-sand-200" />
                <div>
                  <div className="text-xl font-bold text-ink-900">
                    {creator.joinedAt}
                  </div>
                  <div className="text-sm text-ink-500">Membro desde</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div>
          <h2 className="text-xl font-bold text-ink-900 mb-6">
            Produtos de {creator.name}
            <span className="text-ink-500 font-normal text-base ml-2">
              ({creatorProducts.length})
            </span>
          </h2>

          {creatorProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {creatorProducts.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={toCardProduct(product, categories, creators)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl">
              <p className="text-ink-500">
                Este criador ainda nao publicou nenhum produto.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
