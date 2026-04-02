/**
 * Utilitarios gerais do AgentSkills.com.br
 */

/**
 * Formata preco em reais brasileiros.
 * Retorna "Gratis" para preco 0.
 */
export function formatPrice(price: number): string {
  if (price === 0) return 'Gratis';
  const formatted = price.toFixed(2).replace('.', ',');
  return `R$ ${formatted}`;
}

/**
 * Formata numero com separador de milhar (ponto).
 * Ex: 1234 -> "1.234"
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('pt-BR');
}

/**
 * Mescla nomes de classes CSS, filtrando valores falsy.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Calcula tempo estimado de leitura de um texto.
 * Considera ~200 palavras por minuto (media em portugues).
 */
export function getReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min de leitura`;
}

/**
 * Converte texto em slug URL-friendly.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Trunca texto no comprimento maximo, adicionando "..." se necessario.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}

/**
 * Converte um produto do seed (com categoryId/creatorId) para o formato
 * esperado pelo ProductCard (com category/creatorName).
 */
export function toCardProduct(
  product: {
    title: string;
    slug: string;
    price: number;
    image: string;
    salesCount: number;
    type: 'skill' | 'persona' | 'bundle';
    categoryId: string;
    creatorId: string;
  },
  categoriesList: { id: string; name: string }[],
  creatorsList: { id: string; name: string }[],
) {
  const category = categoriesList.find((c) => c.id === product.categoryId);
  const creator = creatorsList.find((c) => c.id === product.creatorId);
  return {
    title: product.title,
    slug: product.slug,
    price: product.price,
    image: product.image,
    salesCount: product.salesCount,
    type: product.type,
    category: category?.name ?? '',
    creatorName: creator?.name ?? '',
  };
}
