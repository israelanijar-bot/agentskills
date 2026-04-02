"use client";

import Link from "next/link";
import CategoryBadge from "./CategoryBadge";

export interface Product {
  title: string;
  slug: string;
  price: number;
  image: string;
  creatorName: string;
  salesCount: number;
  type: "skill" | "persona" | "bundle";
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const typeLabels: Record<string, string> = {
  skill: "Skill",
  persona: "Persona",
  bundle: "Bundle",
};

function formatPrice(price: number): string {
  if (price === 0) return "Grátis";
  return `R$ ${price.toFixed(2).replace(".", ",")}`;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/produto/${product.slug}`}
      className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Image */}
      <div className="aspect-video bg-sand-100 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <CategoryBadge name={product.category} type="category" />
          <CategoryBadge name={typeLabels[product.type]} type={product.type} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-ink-900 text-base mb-1 line-clamp-2 group-hover:text-accent-500 transition-colors">
          {product.title}
        </h3>
        <p className="text-sm text-ink-700 mb-3">{product.creatorName}</p>

        <div className="flex items-center justify-between">
          <span className="font-bold text-ink-900">
            {formatPrice(product.price)}
          </span>
          <div className="flex items-center gap-3 text-sm text-ink-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {product.salesCount}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="text-ink-500 hover:text-red-500 transition-colors"
              aria-label="Favoritar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
