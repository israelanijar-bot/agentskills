/**
 * Funções de query para o Supabase
 * AgentSkills.com.br
 */

import { createClient } from '@supabase/supabase-js'
import type { Category, Product, ProductCard, ProductType } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// ---------------------------------------------------------------------------
// Categorias
// ---------------------------------------------------------------------------

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) throw error
  return data || []
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
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

  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(id, name, slug, icon),
      creator:profiles(id, name, username, avatar_url)
    `)
    .eq('status', 'published')

  if (categorySlug) {
    // Busca pelo slug da categoria via join
    const { data: cat } = await supabase
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
  const { data, error } = await supabase
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
  const { data, error } = await supabase
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
  const { data, error } = await supabase
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
// Helpers
// ---------------------------------------------------------------------------

export function productToCard(product: Product): ProductCard {
  const cat = product.category as Category | undefined
  const creator = product.creator as { name: string; username: string | null; avatar_url: string | null } | undefined

  return {
    id: product.id,
    title: product.title,
    slug: product.slug,
    description: product.description,
    type: product.type,
    price: product.price,
    image_url: product.image_url,
    sales_count: product.sales_count,
    favorites_count: product.favorites_count,
    tags: product.tags,
    category: cat?.name || '',
    category_slug: cat?.slug || '',
    creator_name: creator?.name || '',
    creator_username: creator?.username || '',
    creator_avatar: creator?.avatar_url || null,
  }
}
