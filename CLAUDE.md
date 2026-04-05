# AgentSkills.com.br — Instruções para Claude Code

## Modo de Operação

Este projeto é operado por **Axel**, um agente autônomo que envia tasks via `claude --print -p "task"`. Cada chamada é uma sessão isolada — não há interação humana.

**Regras para sessões autônomas:**
- Execute a task recebida completamente, sem pedir confirmação
- NÃO pergunte nada durante a execução — tome decisões e execute
- Faça commits com mensagens descritivas em português
- NÃO faça `git push` — apenas commit local (Axel faz o push depois)
- Se algo falhar, explique o erro claramente no output para o Axel interpretar
- Sempre rode `npm run build` antes de commitar para validar
- Responda SEMPRE em português brasileiro

## Ponto de Entrada: Sempre @aiox-master

**TODA task do Axel deve ser processada pelo `@aiox-master` (Orion).** Ele é o orquestrador que:

1. Recebe o pedido do Axel
2. Analisa e escolhe o **workflow correto**
3. Identifica o **primeiro agente** a ser ativado
4. Ativa o agente e deixa ele executar a fase completa
5. Gera o **relatório de handoff** para o Axel revisar
6. **PARA** e retorna o output

Na próxima sessão, quando o Axel enviar "continuar", o `@aiox-master` lê o handoff, ativa o **próximo agente** do workflow, e repete o ciclo.

**O Orion nunca executa código diretamente** — ele delega para o agente especializado correto.

## Protocolo de Checkpoint (Axel Bridge)

### Fluxo Completo

```
Axel envia pedido
  → @aiox-master analisa, escolhe workflow, ativa agente da fase 1
    → Agente executa fase completa (autônomo, sem perguntas)
    → Gera handoff em .aiox/handoffs/checkpoint-latest.md
    → PARA — retorna output para Axel

Axel revisa handoff, envia "continuar"
  → @aiox-master lê handoff, ativa agente da fase 2
    → Agente executa fase completa
    → Gera handoff atualizado
    → PARA — retorna output para Axel

(repete até workflow completo)
```

### Formato do Handoff

Ao terminar cada fase, salve em `.aiox/handoffs/checkpoint-latest.md`:

```markdown
# Checkpoint: @[agente] — [Fase N de M]

## Workflow: [nome do workflow escolhido]
## Status: COMPLETO | PARCIAL | ERRO

## O que foi feito
- [Lista do que o agente executou]

## Arquivos modificados
- [Lista de arquivos criados/alterados/removidos]

## Decisões tomadas
- [Decisões técnicas que o agente tomou sozinho]

## Próximo passo
- **Fase**: [N+1] de [M]
- **Próximo agente**: @[agente]
- **Ação esperada**: [o que o próximo agente deve fazer]

## Observações para o Axel
- [Riscos, dúvidas, alternativas, qualquer coisa relevante]
```

### Comandos do Axel

| Comando do Axel | O que o @aiox-master faz |
|----------------|--------------------------|
| `[qualquer pedido]` | Analisa, escolhe workflow, executa fase 1, gera handoff |
| `continuar` | Lê handoff, executa próxima fase do workflow |
| `continuar com mudanças: [X]` | Aplica mudanças X primeiro, depois próxima fase |
| `refazer` | Re-executa a mesma fase com correções |
| `status` | Retorna o conteúdo do último handoff |
| `cancelar` | Limpa handoff, encerra workflow |

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

## Dados

Atualmente usa **dados mock** em `src/data/seed.ts`. As queries em `src/lib/queries.ts` já apontam para Supabase mas as tabelas ainda não foram populadas.

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

O AIOX está instalado em `.aiox-core/`. Consulte o AGENTS.md para detalhes dos agentes e workflows.

@AGENTS.md
