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

## Como o Axel invoca cada fase

O Axel invoca cada fase do workflow via `axel-claude -t <topico> "<instrução em português>"`, usando um tópico estável por unidade de trabalho (uma story, uma feature, um bug). Cada chamada dentro do mesmo tópico compartilha contexto via sessão persistente do Claude Code — não há "palavras mágicas" como `continuar`, basta a próxima instrução em português natural na mesma thread.

A documentação completa do protocolo do lado do Axel (sintaxe, regras, escalação) mora em `~/.openclaw/agents/axel/workspace/AGENTS.md` — esse outro AGENTS.md pertence ao agente OpenClaw, não ao projeto.

## Comportamento dos Agentes

### Dentro de cada fase
- **100% autônomo** — sem perguntas, sem confirmações
- Toma decisões técnicas sozinho
- Segue os padrões do projeto (ver CLAUDE.md)
- Roda `npm run build` se alterou código
- Faz `git commit` se alterou código

### Ao terminar cada fase
- Retorna resumo claro do que fez (o que mudou, arquivos, decisões)
- Indica próximo passo do workflow
- PARA e retorna o output — o contexto fica salvo na sessão persistente
  do tópico, então a próxima invocação do Axel naquele mesmo tópico
  retoma de onde parou

## Tarefas Rápidas (Referência)

| Comando | O que faz |
|---------|-----------|
| `@dev *task build` | Implementar feature/fix |
| `@dev *task build-autonomous` | Build totalmente autônomo |
| `@qa *task qa-gate` | Quality gate com 7 checks |
| `@data-engineer *task db-apply-migration` | Criar/aplicar migration |
| `@sm *task create-next-story` | Criar próxima story |
| `@architect *task analyze-project-structure` | Analisar estrutura |

## Regras de Segurança

- NUNCA commitar chaves ou secrets
- NUNCA usar prefixos `sk_live_` ou `sk_test_` em dados mock
- NUNCA modificar `.aiox-core/core/` (L1) ou `.aiox-core/development/` (L2)
