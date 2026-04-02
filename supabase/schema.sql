-- ============================================
-- AgentSkills.com.br — Database Schema
-- ============================================

-- Enum types
CREATE TYPE product_type AS ENUM ('skill', 'persona', 'bundle');
CREATE TYPE product_status AS ENUM ('draft', 'in_review', 'published', 'rejected', 'suspended');
CREATE TYPE user_role AS ENUM ('buyer', 'creator', 'admin');

-- ============================================
-- PROFILES (extends Supabase auth.users)
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  role user_role DEFAULT 'buyer',
  pix_key TEXT,
  website TEXT,
  github_url TEXT,
  total_sales INTEGER DEFAULT 0,
  total_revenue NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CATEGORIES
-- ============================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  product_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PRODUCTS
-- ============================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  type product_type NOT NULL DEFAULT 'skill',
  status product_status DEFAULT 'draft',
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  category_id UUID REFERENCES categories(id),
  creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  image_url TEXT,
  version TEXT DEFAULT '1.0.0',
  sales_count INTEGER DEFAULT 0,
  favorites_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  install_instructions TEXT,
  files_included TEXT[] DEFAULT '{}',
  file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PRODUCT VERSIONS
-- ============================================
CREATE TABLE product_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  version TEXT NOT NULL,
  changelog TEXT,
  file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PURCHASES
-- ============================================
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  price_paid NUMERIC(10,2) NOT NULL,
  payment_method TEXT,
  payment_id TEXT,
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(buyer_id, product_id)
);

-- ============================================
-- FAVORITES
-- ============================================
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- ============================================
-- NEWSLETTER SUBSCRIBERS
-- ============================================
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  confirmed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BLOG POSTS
-- ============================================
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  author TEXT DEFAULT 'Equipe AgentSkills',
  tags TEXT[] DEFAULT '{}',
  reading_time INTEGER DEFAULT 5,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- API KEYS (for creator API)
-- ============================================
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  key_hash TEXT NOT NULL,
  name TEXT DEFAULT 'Default',
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_products_creator ON products(creator_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_type ON products(type);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_purchases_buyer ON purchases(buyer_id);
CREATE INDEX idx_purchases_product ON purchases(product_id);
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_favorites_product ON favorites(product_id);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_profiles_username ON profiles(username);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Profiles: anyone can read, only own profile can update
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles are publicly readable" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Categories: anyone can read
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are publicly readable" ON categories FOR SELECT USING (true);

-- Products: published are public, creators manage their own
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published products are publicly readable" ON products FOR SELECT USING (status = 'published' OR creator_id = auth.uid());
CREATE POLICY "Creators can insert products" ON products FOR INSERT WITH CHECK (creator_id = auth.uid());
CREATE POLICY "Creators can update own products" ON products FOR UPDATE USING (creator_id = auth.uid());
CREATE POLICY "Creators can delete own products" ON products FOR DELETE USING (creator_id = auth.uid());

-- Product versions: readable if product is accessible
ALTER TABLE product_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Versions are publicly readable" ON product_versions FOR SELECT USING (true);
CREATE POLICY "Creators can insert versions" ON product_versions FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM products WHERE id = product_id AND creator_id = auth.uid())
);

-- Purchases: only buyer and product creator can see
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Buyers can see own purchases" ON purchases FOR SELECT USING (buyer_id = auth.uid());
CREATE POLICY "System can insert purchases" ON purchases FOR INSERT WITH CHECK (buyer_id = auth.uid());

-- Favorites: users manage their own
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can see own favorites" ON favorites FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can add favorites" ON favorites FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can remove favorites" ON favorites FOR DELETE USING (user_id = auth.uid());

-- Newsletter: insert only
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Blog posts: published are public
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published posts are publicly readable" ON blog_posts FOR SELECT USING (published = true);

-- API keys: creators manage their own
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Creators can see own keys" ON api_keys FOR SELECT USING (creator_id = auth.uid());
CREATE POLICY "Creators can create keys" ON api_keys FOR INSERT WITH CHECK (creator_id = auth.uid());
CREATE POLICY "Creators can delete keys" ON api_keys FOR DELETE USING (creator_id = auth.uid());

-- ============================================
-- FUNCTION: Auto-create profile on signup
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- FUNCTION: Update product sales count
-- ============================================
CREATE OR REPLACE FUNCTION update_sales_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.payment_status = 'completed' THEN
    UPDATE products SET sales_count = sales_count + 1 WHERE id = NEW.product_id;
    UPDATE profiles SET total_sales = total_sales + 1, total_revenue = total_revenue + NEW.price_paid
      WHERE id = (SELECT creator_id FROM products WHERE id = NEW.product_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_purchase_completed
  AFTER INSERT OR UPDATE ON purchases
  FOR EACH ROW EXECUTE FUNCTION update_sales_count();

-- ============================================
-- STORAGE BUCKETS
-- ============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('product-files', 'product-files', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Storage policies
CREATE POLICY "Product images are publicly readable" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Avatars are publicly readable" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Authenticated users can upload product images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can upload avatars" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
CREATE POLICY "Buyers can download purchased files" ON storage.objects FOR SELECT USING (bucket_id = 'product-files' AND auth.role() = 'authenticated');
CREATE POLICY "Creators can upload product files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-files' AND auth.role() = 'authenticated');
