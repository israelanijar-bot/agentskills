-- ============================================
-- Configurar israel.anijar@gmail.com como admin
-- Execute no SQL Editor do Supabase Dashboard
-- ============================================

-- Atualizar role para admin quando o usuario se cadastrar
-- (Roda DEPOIS de criar a conta no site)
UPDATE profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'israel.anijar@gmail.com'
);

-- Trigger automatico: qualquer login futuro com esse email vira admin
CREATE OR REPLACE FUNCTION set_admin_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email = 'israel.anijar@gmail.com' THEN
    UPDATE profiles SET role = 'admin' WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Criar trigger (drop primeiro caso ja exista)
DROP TRIGGER IF EXISTS on_admin_signup ON auth.users;
CREATE TRIGGER on_admin_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION set_admin_on_signup();
