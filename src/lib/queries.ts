/**
 * Funções de query para o Supabase
 * AgentSkills.com.br
 */

import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { Category, Product, ProductType } from '@/types/database'

function getClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// ---------------------------------------------------------------------------
// Categorias
// ---------------------------------------------------------------------------

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await getClient()
    .from('categories')
    .select('*')
    .order('name')

  if (error) throw error
  return data || []
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await getClient()
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data
}

// ---------------------------------------------------------------------------
// Produtos
// ---------------------------------------------------------------------------

interface GetProductsOptions {
  categorySlug?: string
  type?: ProductType
  search?: string
  limit?: number
  offset?: number
  sort?: 'popular' | 'recent' | 'price_asc' | 'price_desc'
}

export async function getProducts(options: GetProductsOptions = {}): Promise<Product[]> {
  const {
    categorySlug,
    type,
    search,
    limit = 20,
    offset = 0,
    sort = 'popular',
  } = options

  let query = getClient()
    .from('products')
    .select(`
      *,
      category:categories(id, name, slug, icon),
      creator:profiles(id, name, username, avatar_url)
    `)
    .eq('status', 'published')

  if (categorySlug) {
    // Busca pelo slug da categoria via join
    const { data: cat } = await getClient()
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single()
    if (cat) query = query.eq('category_id', cat.id)
  }

  if (type) {
    query = query.eq('type', type)
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
  }

  // Ordenação
  switch (sort) {
    case 'popular':
      query = query.order('sales_count', { ascending: false })
      break
    case 'recent':
      query = query.order('created_at', { ascending: false })
      break
    case 'price_asc':
      query = query.order('price', { ascending: true })
      break
    case 'price_desc':
      query = query.order('price', { ascending: false })
      break
  }

  query = query.range(offset, offset + limit - 1)

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await getClient()
    .from('products')
    .select(`
      *,
      category:categories(id, name, slug, icon),
      creator:profiles(id, name, username, avatar_url, bio, total_sales)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) return null
  return data
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  const { data, error } = await getClient()
    .from('products')
    .select(`
      *,
      category:categories(id, name, slug, icon),
      creator:profiles(id, name, username, avatar_url)
    `)
    .eq('status', 'published')
    .order('sales_count', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}

export async function getProductsByCreator(creatorId: string): Promise<Product[]> {
  const { data, error } = await getClient()
    .from('products')
    .select(`
      *,
      category:categories(id, name, slug, icon)
    `)
    .eq('creator_id', creatorId)
    .eq('status', 'published')
    .order('sales_count', { ascending: false })

  if (error) throw error
  return data || []
}

// ---------------------------------------------------------------------------
// Purchases
// ---------------------------------------------------------------------------

export async function getUserPurchases(userId: string) {
  const { data, error } = await getClient()
    .from('purchases')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'completed')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getUserPurchase(userId: string, productSlug: string) {
  const { data, error } = await getClient()
    .from('purchases')
    .select('*')
    .eq('user_id', userId)
    .eq('product_slug', productSlug)
    .eq('status', 'completed')
    .limit(1)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function createPurchase(purchase: {
  user_id: string
  product_slug: string
  stripe_session_id: string
  stripe_payment_intent: string | null
  amount: number
  currency?: string
}) {
  const { data, error } = await getClient()
    .from('purchases')
    .insert({
      ...purchase,
      currency: purchase.currency || 'brl',
      status: 'completed',
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Tipo compatível com o componente ProductCard
export interface ProductCardLegacy {
  title: string
  slug: string
  price: number
  image: string
  creatorName: string
  salesCount: number
  type: 'skill' | 'persona' | 'bundle'
  category: string
}

export function productToCard(product: Product): ProductCardLegacy {
  const cat = product.category as Category | undefined
  const creator = product.creator as { name: string; username: string | null; avatar_url: string | null } | undefined

  return {
    title: product.title,
    slug: product.slug,
    price: product.price,
    image: product.image_url || `https://placehold.co/400x300/1a1a2e/e0e0e0?text=${encodeURIComponent(product.title)}`,
    creatorName: creator?.name || '',
    salesCount: product.sales_count,
    type: product.type,
    category: cat?.name || '',
  }
}
