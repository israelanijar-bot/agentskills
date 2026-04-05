# AGENTS.md — Guia de Agentes AIOX para Operação Autônoma

## Como Usar os Agentes

O AIOX fornece agentes especializados em `.aiox-core/development/agents/`. Cada agente tem persona, autoridade e comandos próprios.

**Ativação**: Use `@agent-name` para carregar o agente (ex: `@dev`, `@qa`).
**Comandos**: Prefixo `*` (ex: `*help`, `*create-story`, `*task build`).
**Handoff**: Ao trocar de agente, o contexto anterior é compactado automaticamente.

## Agentes Disponíveis

| Agente | Persona | Quando Usar |
|--------|---------|-------------|
| `@dev` | Dex (Builder) | Implementar código, corrigir bugs, refatorar |
| `@qa` | Quinn (Guardian) | Testar, revisar código, validar qualidade |
| `@architect` | Aria (Visionary) | Decisões de arquitetura, design de APIs |
| `@pm` | Morgan (Strategist) | PRD, épicos, estratégia de produto |
| `@po` | Pax (Balancer) | Validar stories, gerenciar backlog |
| `@sm` | River (Connector) | Criar stories, sprint planning |
| `@analyst` | Alex (Sage) | Pesquisa, análise, brainstorming |
| `@data-engineer` | Dara (Specialist) | Schema, migrations, RLS, queries |
| `@ux-design-expert` | Uma (Artisan) | UI/UX, wireframes, design system |
| `@devops` | Gage (Guardian) | git push, PRs, CI/CD (**EXCLUSIVO**) |
| `@aiox-master` | Orion (Orchestrator) | Orquestração geral, governança do framework |

## Autoridade Exclusiva

**CRÍTICO — Respeitar sempre:**

| Operação | Agente Exclusivo | Outros Agentes |
|----------|-----------------|----------------|
| `git push`, `gh pr create` | `@devops` | BLOQUEADO |
| `git add`, `git commit` | `@dev` | Permitido |
| Criar/validar stories | `@sm` / `@po` | BLOQUEADO |
| Schema/migrations SQL | `@data-engineer` | BLOQUEADO |
| Decisão de arquitetura | `@architect` | BLOQUEADO |

## Workflows Principais

### 1. Story Development Cycle (SDC) — Fluxo padrão

```
@sm *draft → @po *validate → @dev *develop → @qa *qa-gate → @devops *push
```

### 2. Para tarefas simples (bug fix, ajuste pequeno)

```
@dev *task build → (implementa) → git commit
```

### 3. Para mudanças no banco de dados

```
@data-engineer *task db-apply-migration → (cria SQL) → aplica migration
```

### 4. Para QA após implementação

```
@qa *qa-gate → (revisa) → @dev *task apply-qa-fixes → @qa (re-review)
```

## Tarefas Mais Usadas

| Comando | O que faz |
|---------|-----------|
| `@dev *task build` | Implementar feature/fix |
| `@dev *task build-autonomous` | Build totalmente autônomo |
| `@qa *task qa-gate` | Quality gate com 7 checks |
| `@qa *task qa-run-tests` | Rodar testes |
| `@data-engineer *task db-apply-migration` | Criar/aplicar migration SQL |
| `@data-engineer *task db-schema-audit` | Auditar schema do banco |
| `@sm *task create-next-story` | Criar próxima story |
| `@architect *task analyze-project-structure` | Analisar estrutura |

## Para o Axel (Bridge)

Quando o Axel enviar uma task via `claude --print -p "task"`:

1. **Identifique o tipo de trabalho** (código, banco, design, etc.)
2. **Escolha o agente apropriado** da tabela acima
3. **Execute o comando** do agente
4. **Valide com build** (`npm run build`)
5. **Commit** com mensagem descritiva em português
6. **NÃO faça push** — o Axel controla isso

### Mapeamento de Tasks do Axel → Agente

| Pedido do Axel | Agente | Comando |
|----------------|--------|---------|
| "adicionar feature X" | `@dev` | `*task build` |
| "corrigir bug em Y" | `@dev` | `*task build` |
| "criar tabela no banco" | `@data-engineer` | `*task db-apply-migration` |
| "melhorar performance" | `@dev` | `*task dev-optimize-performance` |
| "revisar qualidade" | `@qa` | `*task qa-gate` |
| "mudar layout da página" | `@dev` | `*task build` |
| "analisar arquitetura" | `@architect` | `*task analyze-project-structure` |
| "criar story para X" | `@sm` | `*task create-next-story` |

## Next.js 16 — ATENÇÃO

Esta versão tem breaking changes. APIs, convenções e estrutura de arquivos podem diferir do training data. Consulte `node_modules/next/dist/docs/` antes de escrever código novo. Respeite deprecation notices.

## Regras de Segurança

- NUNCA commitar chaves ou secrets (`.env.local` está no `.gitignore`)
- NUNCA usar prefixos `sk_live_` ou `sk_test_` em dados mock (GitHub bloqueia)
- NUNCA modificar arquivos em `.aiox-core/core/` (L1 protegido)
- NUNCA modificar tasks/templates/workflows em `.aiox-core/development/` (L2 protegido)
