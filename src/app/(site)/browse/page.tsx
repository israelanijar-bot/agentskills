"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { products, categories, creators } from "@/data/seed";
import { toCardProduct } from "@/lib/utils";

type FilterType = "todos" | "skill" | "persona" | "bundle";
type FilterPrice = "todos" | "gratis" | "pagos";
type SortOption = "popular" | "recente" | "menor-preco" | "maior-preco";

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<FilterType>("todos");
  const [priceFilter, setPriceFilter] = useState<FilterPrice>("todos");
  const [sort, setSort] = useState<SortOption>("popular");

  const allProducts = useMemo(
    () => products.map((p) => ({ ...p, ...toCardProduct(p, categories, creators) })),
    []
  );

  const filtered = useMemo(() => {
    let result = [...allProducts];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.creatorName.toLowerCase().includes(q)
      );
    }

    // Type filter
    if (typeFilter !== "todos") {
      result = result.filter((p) => p.type === typeFilter);
    }

    // Price filter
    if (priceFilter === "gratis") {
      result = result.filter((p) => p.price === 0);
    } else if (priceFilter === "pagos") {
      result = result.filter((p) => p.price > 0);
    }

    // Sort
    switch (sort) {
      case "popular":
        result.sort((a, b) => b.salesCount - a.salesCount);
        break;
      case "recente":
        result.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
        break;
      case "menor-preco":
        result.sort((a, b) => a.price - b.price);
        break;
      case "maior-preco":
        result.sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [search, typeFilter, priceFilter, sort, allProducts]);

  const typeButtons: { value: FilterType; label: string }[] = [
    { value: "todos", label: "Todos" },
    { value: "skill", label: "Skills" },
    { value: "persona", label: "Personas" },
    { value: "bundle", label: "Bundles" },
  ];

  const priceButtons: { value: FilterPrice; label: string }[] = [
    { value: "todos", label: "Todos" },
    { value: "gratis", label: "Gratis" },
    { value: "pagos", label: "Pagos" },
  ];

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-ink-900 mb-2">
            Explorar Marketplace
          </h1>
          <p className="text-ink-700">
            Encontre a skill perfeita para seu agente de IA
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar onSearch={setSearch} className="max-w-2xl" />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          {/* Type filter */}
          <div className="flex flex-wrap gap-2">
            {typeButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => setTypeFilter(btn.value)}
                className={`px-4 py-2 text-sm font-medium rounded-xl cursor-pointer transition-colors ${
                  typeFilter === btn.value
                    ? "bg-accent-500 text-white"
                    : "bg-white text-ink-700 hover:bg-sand-100 border border-sand-200"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-sand-200" />

          {/* Price filter */}
          <div className="flex flex-wrap gap-2">
            {priceButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => setPriceFilter(btn.value)}
                className={`px-4 py-2 text-sm font-medium rounded-xl cursor-pointer transition-colors ${
                  priceFilter === btn.value
                    ? "bg-accent-500 text-white"
                    : "bg-white text-ink-700 hover:bg-sand-100 border border-sand-200"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Sort - push to right */}
          <div className="sm:ml-auto">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="px-4 py-2 text-sm font-medium bg-white border border-sand-200 rounded-xl text-ink-700 cursor-pointer focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
            >
              <option value="popular">Mais Popular</option>
              <option value="recente">Mais Recente</option>
              <option value="menor-preco">Menor Preco</option>
              <option value="maior-preco">Maior Preco</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-ink-500 mb-6">
          {filtered.length}{" "}
          {filtered.length === 1 ? "skill encontrada" : "skills encontradas"}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-ink-900 mb-2">
              Nenhum resultado encontrado
            </h3>
            <p className="text-ink-500">
              Tente ajustar os filtros ou buscar por outro termo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
