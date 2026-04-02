"use client";

import { useState } from "react";
import Link from "next/link";
import { products, categories, creators } from "@/data/seed";
import { formatPrice } from "@/lib/utils";

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

// Mock: 4 favorited products from seed
const initialFavorites = [products[2], products[4], products[10], products[16]];

export default function FavoritosPage() {
  const [favorites, setFavorites] = useState(initialFavorites);

  function removeFavorite(productId: string) {
    setFavorites((prev) => prev.filter((p) => p.id !== productId));
  }

  function getCreatorName(creatorId: string) {
    return creators.find((c) => c.id === creatorId)?.name ?? "";
  }

  function getCategoryName(categoryId: string) {
    return categories.find((c) => c.id === categoryId)?.name ?? "";
  }

  return (
    <>
      <title>Meus Favoritos | AgentSkills</title>
      <meta name="robots" content="noindex, nofollow" />

      <div className="py-8 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-8">
            Meus Favoritos
          </h1>

          {favorites.length === 0 ? (
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <p className="text-ink-500 mb-4">
                Sua lista de favoritos esta vazia. Explore skills e clique no
                coracaozinho para salvar.
              </p>
              <Link
                href="/browse"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-colors"
              >
                Explorar Marketplace
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favorites.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden group"
                >
                  {/* Image */}
                  <Link
                    href={`/produto/${product.slug}`}
                    className="block aspect-video bg-sand-100 relative overflow-hidden"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-sand-100 text-ink-700">
                        {getCategoryName(product.categoryId)}
                      </span>
                      <span
                        className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full ${typeColors[product.type]}`}
                      >
                        {typeLabels[product.type]}
                      </span>
                    </div>
                    {/* Filled red heart */}
                    <div className="absolute top-3 right-3">
                      <svg
                        className="w-6 h-6 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-4">
                    <Link href={`/produto/${product.slug}`}>
                      <h3 className="font-semibold text-ink-900 text-base mb-1 line-clamp-2 group-hover:text-accent-500 transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-ink-500 mb-3">
                      {getCreatorName(product.creatorId)}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="font-bold text-ink-900">
                        {formatPrice(product.price)}
                      </span>
                      <button
                        onClick={() => removeFavorite(product.id)}
                        className="text-xs text-ink-500 hover:text-red-500 cursor-pointer transition-colors font-medium"
                      >
                        Remover
                      </button>
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
