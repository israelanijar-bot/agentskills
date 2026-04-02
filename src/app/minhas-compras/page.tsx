"use client";

import { useState } from "react";
import Link from "next/link";
import { products, categories, creators } from "@/data/seed";
import { formatPrice } from "@/lib/utils";

type FilterType = "todas" | "skill" | "persona" | "bundle";

// Mock purchased products (first 5 from seed)
const purchasedProducts = products.slice(0, 5).map((p, i) => ({
  ...p,
  purchaseDate: [
    "15/03/2026",
    "02/03/2026",
    "18/02/2026",
    "05/02/2026",
    "20/01/2026",
  ][i],
  hasUpdate: i === 1 || i === 3,
}));

const totalSpent = purchasedProducts.reduce((sum, p) => sum + p.price, 0);

const filterTabs: { label: string; value: FilterType }[] = [
  { label: "Todas", value: "todas" },
  { label: "Skills", value: "skill" },
  { label: "Personas", value: "persona" },
  { label: "Bundles", value: "bundle" },
];

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

export default function MinhasComprasPage() {
  const [filter, setFilter] = useState<FilterType>("todas");

  const filtered =
    filter === "todas"
      ? purchasedProducts
      : purchasedProducts.filter((p) => p.type === filter);

  function getCreatorName(creatorId: string) {
    return creators.find((c) => c.id === creatorId)?.name ?? "";
  }

  return (
    <>
      <title>Minhas Compras | AgentSkills</title>
      <meta name="robots" content="noindex, nofollow" />

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
            <span>{purchasedProducts.length} produtos</span>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`px-4 py-2 text-sm font-semibold rounded-xl cursor-pointer transition-all whitespace-nowrap ${
                  filter === tab.value
                    ? "bg-accent-500 text-white shadow-sm"
                    : "bg-sand-100 text-ink-500 hover:bg-sand-200 hover:text-ink-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Products list */}
          {filtered.length === 0 ? (
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
            <div className="space-y-4">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center"
                >
                  {/* Image */}
                  <div className="w-full sm:w-24 h-32 sm:h-18 bg-sand-100 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-1">
                      <h3 className="font-semibold text-ink-900 text-base">
                        {product.title}
                      </h3>
                      {product.hasUpdate && (
                        <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-warning/10 text-warning whitespace-nowrap">
                          Atualizacao disponivel
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-ink-500 mb-1">
                      por {getCreatorName(product.creatorId)}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-ink-500">
                      <span
                        className={`inline-block px-2 py-0.5 font-medium rounded-full ${typeColors[product.type]}`}
                      >
                        {typeLabels[product.type]}
                      </span>
                      <span>Comprado em {product.purchaseDate}</span>
                      <span>v{product.version}</span>
                    </div>
                  </div>

                  {/* Price + Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 shrink-0">
                    <span className="font-bold text-ink-900">
                      {formatPrice(product.price)}
                    </span>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-accent-500 text-white text-sm font-semibold rounded-lg hover:bg-accent-600 cursor-pointer transition-colors">
                        Baixar
                      </button>
                      <Link
                        href={`/produto/${product.slug}`}
                        className="px-4 py-2 border border-sand-200 text-ink-500 text-sm font-medium rounded-lg hover:bg-sand-50 hover:text-ink-700 transition-colors"
                      >
                        Ver Produto
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
