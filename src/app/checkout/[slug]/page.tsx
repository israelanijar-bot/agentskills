import type { Metadata } from "next";
import Link from "next/link";
import {
  products,
  categories,
  creators,
  getProductBySlug,
} from "@/data/seed";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import CheckoutPayment from "./CheckoutPayment";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
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

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const creatorName =
    creators.find((c) => c.id === product.creatorId)?.name ?? "";
  const categoryName =
    categories.find((c) => c.id === product.categoryId)?.name ?? "";
  const priceText = formatPrice(product.price);

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-ink-500 mb-8">
          <Link href="/" className="hover:text-accent-500">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/produto/${product.slug}`}
            className="hover:text-accent-500"
          >
            {product.title}
          </Link>
          <span>/</span>
          <span className="text-ink-700 font-medium">Checkout</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-8">
          Finalizar Compra
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left - Order Summary */}
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-ink-900 mb-6">
                Resumo do Pedido
              </h2>

              <div className="flex gap-4 mb-6">
                <div className="w-28 h-20 bg-sand-100 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-ink-900 mb-1">
                    {product.title}
                  </h3>
                  <p className="text-sm text-ink-500 mb-2">
                    por {creatorName}
                  </p>
                  <span
                    className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full ${typeColors[product.type]}`}
                  >
                    {typeLabels[product.type]}
                  </span>
                </div>
              </div>

              <div className="border-t border-sand-200 pt-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-ink-500">Subtotal</span>
                  <span className="font-medium text-ink-900">{priceText}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-ink-500">Desconto</span>
                  <span className="font-medium text-ink-900">R$ 0,00</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-sand-200">
                  <span className="font-bold text-ink-900 text-lg">Total</span>
                  <span className="font-bold text-ink-900 text-2xl">
                    {priceText}
                  </span>
                </div>
              </div>

              {/* O que esta incluido */}
              <div>
                <h3 className="font-semibold text-ink-900 mb-3">
                  O que esta incluido
                </h3>
                <ul className="space-y-2">
                  {product.filesIncluded.map((file) => (
                    <li
                      key={file}
                      className="flex items-center gap-2 text-sm text-ink-700"
                    >
                      <svg
                        className="w-4 h-4 text-success shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {file}
                    </li>
                  ))}
                  <li className="flex items-center gap-2 text-sm text-ink-700">
                    <svg
                      className="w-4 h-4 text-success shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Atualizacoes gratuitas
                  </li>
                  <li className="flex items-center gap-2 text-sm text-ink-700">
                    <svg
                      className="w-4 h-4 text-success shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Suporte do criador
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right - Payment */}
          <CheckoutPayment
            price={product.price}
            priceText={priceText}
            slug={product.slug}
          />
        </div>
      </div>
    </div>
  );
}
