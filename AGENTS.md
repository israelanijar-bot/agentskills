# AGENTS.md — Operação Autônoma via @aiox-master

## Regra Principal

**TODA task recebida do Axel passa pelo `@aiox-master` (Orion).**

O Orion é o orquestrador. Ele:
- Analisa o pedido
- Escolhe o workflow correto
- Ativa o agente especializado da fase atual
- Supervisiona a execução
- Gera o relatório de handoff
- PARA e espera o Axel aprovar antes da próxima fase

**O Orion NUNCA implementa código diretamente.** Ele delega para o agente certo.

## Seleção de Workflow pelo Orion

| Tipo de Pedido | Workflow | Fases |
|---------------|----------|-------|
| Feature nova complexa | Story Development Cycle (SDC) | @sm → @po → @dev → @qa |
| Bug fix / ajuste simples | Task Direta | @dev (1 fase) |
| Mudança no banco de dados | Database Task | @data-engineer (1-2 fases) |
| Análise de arquitetura | Architecture Review | @architect (1 fase) |
| Revisão de qualidade | QA Gate | @qa (1 fase) |
| Feature com spec | Spec Pipeline + SDC | @pm → @architect → @analyst → @pm → @qa → SDC |
| Criar story | Story Creation | @sm → @po (2 fases) |
| Melhorar UI/UX | UX Task | @ux-design-expert → @dev (2 fases) |

## Agentes Disponíveis

| Agente | Persona | Especialidade |
|--------|---------|---------------|
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

## Autoridade Exclusiva

| Operação | Agente Exclusivo | Outros |
|----------|-----------------|--------|
| `git push`, `gh pr create` | `@devops` | BLOQUEADO |
| `git add`, `git commit` | `@dev` | Permitido |
| Criar/validar stories | `@sm` / `@po` | BLOQUEADO |
| Schema/migrations SQL | `@data-engineer` | BLOQUEADO |
| Decisão de arquitetura | `@architect` | BLOQUEADO |

## Exemplo: SDC Completo via Axel

```
=== SESSÃO 1 ===
Axel: "quero que os usuários possam avaliar skills com estrelas"

@aiox-master analisa:
  → Workflow: Story Development Cycle (4 fases)
  → Fase 1: @sm cria story draft

@sm executa: cria story em docs/stories/
  → Handoff gerado
  → Output: "Story criada. Fase 1/4 completa. Próximo: @po valida."

=== SESSÃO 2 ===
Axel: "continuar"

@aiox-master lê handoff:
  → Fase 2: @po valida story

@po executa: valida com 10-point checklist
  → Handoff gerado
  → Output: "Story validada (9/10). Fase 2/4 completa. Próximo: @dev implementa."

=== SESSÃO 3 ===
Axel: "continuar"

@aiox-master lê handoff:
  → Fase 3: @dev implementa

@dev executa: código, build, commit
  → Handoff gerado
  → Output: "Implementado. 5 arquivos criados. Build OK. Fase 3/4. Próximo: @qa."

=== SESSÃO 4 ===
Axel: "continuar"

@aiox-master lê handoff:
  → Fase 4: @qa gate

@qa executa: 7 quality checks
  → Handoff gerado
  → Output: "QA APROVADO. Workflow completo. Pronto para push."
```

## Comportamento dos Agentes

### Dentro de cada fase
- **100% autônomo** — sem perguntas, sem confirmações
- Toma decisões técnicas sozinho
- Segue os padrões do projeto (ver CLAUDE.md)
- Roda `npm run build` se alterou código
- Faz `git commit` se alterou código

### Ao terminar cada fase
- Salva handoff em `.aiox/handoffs/checkpoint-latest.md`
- Retorna resumo claro do que fez
- Indica próximo passo do workflow
- PARA e espera o Axel

## Tarefas Rápidas (Referência)

| Comando | O que faz |
|---------|-----------|
| `@dev *task build` | Implementar feature/fix |
| `@dev *task build-autonomous` | Build totalmente autônomo |
| `@qa *task qa-gate` | Quality gate com 7 checks |
| `@data-engineer *task db-apply-migration` | Criar/aplicar migration |
| `@sm *task create-next-story` | Criar próxima story |
| `@architect *task analyze-project-structure` | Analisar estrutura |

## Next.js 16 — ATENÇÃO

Esta versão tem breaking changes. Consulte `node_modules/next/dist/docs/` antes de escrever código novo.

## Regras de Segurança

- NUNCA commitar chaves ou secrets
- NUNCA usar prefixos `sk_live_` ou `sk_test_` em dados mock
- NUNCA modificar `.aiox-core/core/` (L1) ou `.aiox-core/development/` (L2)
