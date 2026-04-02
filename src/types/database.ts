/**
 * Tipos TypeScript gerados a partir do schema do Supabase
 * AgentSkills.com.br
 */

export type ProductType = 'skill' | 'persona' | 'bundle'
export type ProductStatus = 'draft' | 'in_review' | 'published' | 'rejected' | 'suspended'
export type UserRole = 'buyer' | 'creator' | 'admin'
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded'

export interface Profile {
  id: string
  name: string
  username: string | null
  avatar_url: string | null
  bio: string | null
  role: UserRole
  pix_key: string | null
  website: string | null
  github_url: string | null
  total_sales: number
  total_revenue: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  product_count: number
  created_at: string
}

export interface Product {
  id: string
  title: string
  slug: string
  description: string
  long_description: string | null
  type: ProductType
  status: ProductStatus
  price: number
  category_id: string | null
  creator_id: string | null
  image_url: string | null
  version: string
  sales_count: number
  favorites_count: number
  download_count: number
  tags: string[]
  install_instructions: string | null
  files_included: string[]
  file_url: string | null
  created_at: string
  updated_at: string
  // Joins
  category?: Category
  creator?: Profile
}

export interface Purchase {
  id: string
  buyer_id: string
  product_id: string
  price_paid: number
  payment_status: PaymentStatus
  payment_method: string | null
  stripe_session_id: string | null
  download_count: number
  created_at: string
  updated_at: string
}

export interface Favorite {
  id: string
  user_id: string
  product_id: string
  created_at: string
}

export interface Review {
  id: string
  reviewer_id: string
  product_id: string
  rating: number
  comment: string | null
  created_at: string
  updated_at: string
}

export interface ProductVersion {
  id: string
  product_id: string
  version: string
  changelog: string | null
  file_url: string | null
  created_at: string
}

// Tipos úteis para o frontend
export interface ProductCard {
  id: string
  title: string
  slug: string
  description: string
  type: ProductType
  price: number
  image_url: string | null
  sales_count: number
  favorites_count: number
  tags: string[]
  category: string
  category_slug: string
  creator_name: string
  creator_username: string
  creator_avatar: string | null
}
