import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { products, creators } from "@/data/seed";
import { formatPrice } from "@/lib/utils";
import DownloadButton from "@/components/DownloadButton";

export const metadata: Metadata = {
  title: "Minhas Compras | AgentSkills",
  robots: { index: false, follow: false },
};

interface PurchaseRow {
  id: string;
  product_slug: string;
  amount: number;
  currency: string;
  created_at: string;
}

const typeLabels: Record<string, string> = {
  skill: "Skill",
  persona: "Persona",
  bundle: "Bundle",
};

const typeColors: Record<string, string> = {
  skill: "bg-accent-500/10 text-accent-600",
  persona: "bg-purple-100 text-purple-700",
  bundle: "bg-amber-100 text-amber-700",
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("pt-BR");
  } catch {
    return iso;
  }
}

export default async function MinhasComprasPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/minhas-compras");
  }

  // Busca purchases reais do Supabase
  const { data: purchases, error } = await supabase
    .from("purchases")
    .select("id, product_slug, amount, currency, created_at")
    .eq("user_id", user.id)
    .eq("status", "completed")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar compras:", error);
  }

  const purchaseRows: PurchaseRow[] = purchases || [];

  // Cruza com metadata dos produtos do seed
  const enrichedPurchases = purchaseRows
    .map((p) => {
      const product = products.find((prod) => prod.slug === p.product_slug);
      if (!product) return null;
      return {
        ...p,
        product,
        purchaseDate: formatDate(p.created_at),
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  const totalSpent = enrichedPurchases.reduce(
    (sum, p) => sum + p.amount / 100,
    0
  );

  function getCreatorName(creatorId: string) {
    return creators.find((c) => c.id === creatorId)?.name ?? "";
  }

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-2">
          Minhas Compras
        </h1>

        {/* Summary */}
        <div className="flex items-center gap-3 text-sm text-ink-500 mb-8">
          <span className="font-semibold text-ink-700">
            Total investido: {formatPrice(totalSpent)}
          </span>
          <span className="text-sand-200">|</span>
          <span>
            {enrichedPurchases.length}{" "}
            {enrichedPurchases.length === 1 ? "produto" : "produtos"}
          </span>
        </div>

        {/* Empty state */}
        {enrichedPurchases.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-16 h-16 bg-sand-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-ink-500"
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
            </div>
            <p className="text-ink-500 mb-4">
              Voce ainda nao comprou nenhuma skill. Explore o marketplace!
            </p>
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-colors"
            >
              Explorar Marketplace
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {enrichedPurchases.map(({ id, product, purchaseDate, amount }) => (
              <div
                key={id}
                className="bg-white rounded-2xl shadow-sm p-4 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center mb-4">
                  {/* Image */}
                  <div className="w-full sm:w-24 h-32 sm:h-18 bg-sand-100 rounded-xl overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-ink-900 text-base mb-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-ink-500 mb-1">
                      por {getCreatorName(product.creatorId)}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-ink-500 flex-wrap">
                      <span
                        className={`inline-block px-2 py-0.5 font-medium rounded-full ${typeColors[product.type] || ""}`}
                      >
                        {typeLabels[product.type] || product.type}
                      </span>
                      <span>Comprado em {purchaseDate}</span>
                      <span>v{product.version}</span>
                    </div>
                  </div>

                  {/* Price + View link */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 shrink-0">
                    <span className="font-bold text-ink-900">
                      {formatPrice(amount / 100)}
                    </span>
                    <Link
                      href={`/produto/${product.slug}`}
                      className="px-4 py-2 border border-sand-200 text-ink-500 text-sm font-medium rounded-lg hover:bg-sand-50 hover:text-ink-700 transition-colors"
                    >
                      Ver Produto
                    </Link>
                  </div>
                </div>

                {/* Download autenticado via API */}
                <DownloadButton slug={product.slug} label="Baixar arquivos" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
