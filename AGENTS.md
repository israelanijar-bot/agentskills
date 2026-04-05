# AGENTS.md — Guia de Agentes AIOX para Operação Autônoma

## Modo de Execução: Checkpoint via Axel

Cada agente opera **100% autônomo dentro da sua fase** — sem perguntas, sem confirmações. Ao terminar, gera um relatório de handoff e **PARA**. O Axel (bridge externa) analisa o relatório e decide se continua, pede mudanças ou cancela.

**Regra de ouro**: 1 agente por sessão. Execute, reporte, pare.

## Como Usar os Agentes

Os agentes estão em `.aiox-core/development/agents/`. Cada um tem persona, zona de autoridade e comandos exclusivos.

**Ativação**: `@agent-name` (ex: `@dev`, `@qa`)
**Comandos**: Prefixo `*` (ex: `*help`, `*task build`)

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
| `@aiox-master` | Orion (Orchestrator) | Orquestração geral, governança |

## Autoridade Exclusiva

| Operação | Agente Exclusivo | Outros |
|----------|-----------------|--------|
| `git push`, `gh pr create` | `@devops` | BLOQUEADO |
| `git add`, `git commit` | `@dev` | Permitido |
| Criar/validar stories | `@sm` / `@po` | BLOQUEADO |
| Schema/migrations SQL | `@data-engineer` | BLOQUEADO |
| Decisão de arquitetura | `@architect` | BLOQUEADO |

## Workflows com Checkpoint

### Story Development Cycle (SDC) — 5 sessões

```
Sessão 1: @sm   → Cria story draft        → handoff → PARA (Axel analisa)
Sessão 2: @po   → Valida story (10 checks)→ handoff → PARA (Axel analisa)
Sessão 3: @dev  → Implementa código       → handoff → PARA (Axel analisa)
Sessão 4: @qa   → QA gate (7 checks)      → handoff → PARA (Axel analisa)
Sessão 5: commit final, Axel faz push
```

### Task Simples (bug fix, ajuste) — 1 sessão

```
Sessão 1: @dev  → Implementa fix, builda, commita → handoff → PARA
```

### Mudança no Banco — 2 sessões

```
Sessão 1: @data-engineer → Cria migration SQL    → handoff → PARA (Axel analisa)
Sessão 2: @data-engineer → Aplica migration      → handoff → PARA
```

### QA Loop — N sessões

```
Sessão 1: @qa   → Review e veredicto      → handoff → PARA
Sessão 2: @dev  → Aplica fixes            → handoff → PARA
Sessão 3: @qa   → Re-review               → handoff → PARA
(repete até APPROVE, max 5 iterações)
```

## Protocolo do Agente em Cada Sessão

Ao receber uma task, o agente deve:

1. **Verificar handoff anterior**: Ler `.aiox/handoffs/checkpoint-latest.md` se existir
2. **Executar a fase completa**: Sem perguntas, tome todas as decisões
3. **Validar**: Rodar `npm run build` se houve mudança de código
4. **Commitar** (se houve mudança de código): `git add` + `git commit`
5. **Gerar handoff**: Salvar relatório em `.aiox/handoffs/checkpoint-latest.md`
6. **Retornar output**: Resumo do que foi feito para o Axel

## Tarefas Mais Usadas

| Comando | O que faz |
|---------|-----------|
| `@dev *task build` | Implementar feature/fix |
| `@dev *task build-autonomous` | Build totalmente autônomo |
| `@qa *task qa-gate` | Quality gate com 7 checks |
| `@data-engineer *task db-apply-migration` | Criar/aplicar migration |
| `@data-engineer *task db-schema-audit` | Auditar schema |
| `@sm *task create-next-story` | Criar próxima story |
| `@architect *task analyze-project-structure` | Analisar estrutura |

## Mapeamento: Pedido do Axel → Agente

| Pedido do Axel | Agente | Ação |
|----------------|--------|------|
| "adicionar feature X" | `@dev` | Implementa, builda, commita |
| "corrigir bug em Y" | `@dev` | Fix, builda, commita |
| "criar tabela no banco" | `@data-engineer` | Gera SQL, documenta |
| "revisar qualidade" | `@qa` | QA gate, lista issues |
| "mudar layout da página" | `@dev` | Altera componente, builda |
| "analisar arquitetura" | `@architect` | Analisa, documenta |
| "criar story para X" | `@sm` | Cria story em docs/stories/ |
| `continuar` | Lê handoff | Executa próxima fase do workflow |
| `status` | — | Retorna último checkpoint |

## Next.js 16 — ATENÇÃO

Esta versão tem breaking changes. Consulte `node_modules/next/dist/docs/` antes de escrever código novo. Respeite deprecation notices.

## Regras de Segurança

- NUNCA commitar chaves ou secrets (`.env.local` está no `.gitignore`)
- NUNCA usar prefixos `sk_live_` ou `sk_test_` em dados mock (GitHub bloqueia)
- NUNCA modificar arquivos em `.aiox-core/core/` (L1 protegido)
- NUNCA modificar tasks/templates/workflows em `.aiox-core/development/` (L2 protegido)
