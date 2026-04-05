# AgentSkills.com.br — Instruções para Claude Code

## Modo de Operação

Este projeto é operado por **Axel**, um agente autônomo que envia tasks via `claude --print -p "task"`. Cada chamada é uma sessão isolada — não há interação humana.

**Regras para sessões autônomas:**
- Execute a task recebida completamente, sem pedir confirmação
- Faça commits com mensagens descritivas em português
- NÃO faça `git push` — apenas commit local (Axel faz o push depois)
- Se algo falhar, explique o erro claramente no output para o Axel interpretar
- Sempre rode `npm run build` antes de commitar para validar
- Responda SEMPRE em português brasileiro

## Stack Técnico

| Tecnologia | Versão | Notas |
|-----------|--------|-------|
| Next.js | 16.2.2 | App Router, Turbopack. **ATENÇÃO**: APIs podem diferir do training data |
| React | 19 | Server Components por padrão |
| TypeScript | 5 | Strict mode |
| Tailwind CSS | 4 | Usa `@theme inline` em globals.css, sem tailwind.config |
| Supabase | 2.101 | Auth SSR, PostgreSQL, RLS, Storage |
| Stripe | Test mode | Checkout Sessions, webhooks |

## Estrutura do Projeto

```
src/
├── app/
│   ├── (site)/          # Páginas públicas (layout com Header/Footer)
│   │   ├── page.tsx     # Home
│   │   ├── browse/      # Explorar marketplace
│   │   ├── produto/     # Página de produto [slug]
│   │   ├── checkout/    # Checkout com Stripe [slug]
│   │   ├── login/       # Login (email + OAuth)
│   │   ├── cadastro/    # Registro
│   │   ├── blog/        # Blog
│   │   ├── criadores/   # Lista de criadores
│   │   ├── criador/     # Perfil do criador [slug]
│   │   ├── categoria/   # Categoria [slug]
│   │   ├── compra/      # Sucesso/cancelamento pós-compra
│   │   ├── favoritos/   # Favoritos do usuário (protegida)
│   │   ├── minhas-compras/ # Compras do usuário (protegida)
│   │   └── perfil/      # Perfil do usuário (protegida)
│   ├── dashboard/       # Painel do criador (protegida)
│   │   ├── page.tsx     # Overview
│   │   ├── produtos/    # Gerenciar produtos
│   │   ├── analytics/   # Métricas
│   │   ├── api/         # Chaves de API
│   │   ├── configuracoes/ # Config da conta
│   │   └── novo-produto/ # Publicar produto
│   ├── admin/           # Painel admin (role=admin)
│   │   ├── page.tsx     # Dashboard admin
│   │   ├── usuarios/    # Gerenciar usuários
│   │   ├── produtos/    # Moderar produtos
│   │   ├── blog/        # Gerenciar blog
│   │   └── configuracoes/ # Config do sistema
│   ├── api/
│   │   ├── checkout/    # POST: cria Stripe Checkout Session
│   │   └── webhook/stripe/ # POST: Stripe webhook handler
│   └── auth/
│       ├── callback/    # OAuth callback → redireciona para /auth/confirm
│       ├── confirm/     # Client-side code exchange (PKCE)
│       └── signout/     # Sign out
├── components/          # Componentes reutilizáveis
├── data/
│   └── seed.ts          # Dados mock (produtos, categorias, criadores)
├── lib/
│   ├── supabase/        # Clientes Supabase (client.ts, server.ts, middleware.ts)
│   ├── stripe.ts        # Cliente Stripe server-side
│   ├── queries.ts       # Queries Supabase (getProducts, etc.)
│   └── utils.ts         # Helpers (formatPrice, cn, slugify, etc.)
├── types/
│   └── database.ts      # Tipos do Supabase
└── middleware.ts         # Proteção de rotas + refresh de sessão
```

## Autenticação

- **Email/senha**: signup com confirmação de email
- **GitHub OAuth**: configurado no Supabase
- **Google OAuth**: ainda não configurado
- **Middleware**: protege /dashboard, /admin, /checkout, /minhas-compras, /favoritos, /perfil
- **Admin**: verifica `role = 'admin'` na tabela `profiles`
- **Admin email**: israel.anijar@gmail.com

## Pagamentos (Stripe)

- Modo de teste (chaves test)
- Fluxo: `/api/checkout` cria Session → redireciona ao Stripe → volta para `/compra/sucesso`
- Webhook em `/api/webhook/stripe` (precisa de STRIPE_WEBHOOK_SECRET para produção)
- Cartão de teste: 4242 4242 4242 4242

## Dados

Atualmente usa **dados mock** em `src/data/seed.ts`. As queries em `src/lib/queries.ts` já apontam para Supabase mas as tabelas ainda não foram populadas. A home page usa queries do Supabase; páginas de produto usam seed data.

## Variáveis de Ambiente

Definidas em `.env.local` (local) e Vercel (produção):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET` (pendente)

## Deploy

- **Vercel**: deploy automático via push para `main` no GitHub
- **Domínio**: agentskills.com.br (conectado ao Vercel)
- **Repo**: github.com/israelanijar-bot/agentskills

## Padrões de Código

- Idioma da UI: português brasileiro (sem acentos nos nomes de arquivos)
- Imports absolutos com `@/` (ex: `@/components/Header`)
- Componentes: PascalCase, um por arquivo
- CSS: Tailwind classes inline, custom properties em globals.css
- Sem dependências externas de UI (sem shadcn, sem material-ui)
- Sem mock de chaves com prefixo `sk_live_` ou `sk_test_` (GitHub bloqueia)

## AIOX Framework

O AIOX está instalado em `.aiox-core/`. Para tarefas complexas, use os agentes especializados.

@AGENTS.md
