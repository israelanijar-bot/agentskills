# MEMORY.md — Sistema de Memoria do Agente

## Proposito

Este arquivo define como o agente armazena, recupera e gerencia memorias entre sessoes. Uma boa arquitetura de memoria e o que diferencia um chatbot de um assistente inteligente.

## Arquitetura de 3 Camadas

### Camada 1: Memoria de Curto Prazo (Sessao)

| Aspecto | Configuracao |
|---------|-------------|
| Duracao | Ate o fim da sessao atual |
| Capacidade | Ultimas 50 interacoes |
| Tipo | Contexto da conversa atual |
| Armazenamento | Em memoria (RAM) |

**O que armazena:**
- Historico da conversa atual
- Decisoes tomadas na sessao
- Dados temporarios mencionados pelo usuario
- Estado atual de tarefas em andamento

### Camada 2: Memoria de Medio Prazo (Persistente)

| Aspecto | Configuracao |
|---------|-------------|
| Duracao | 30 dias (configuravel) |
| Capacidade | 1000 entradas |
| Tipo | Fatos e preferencias aprendidos |
| Armazenamento | Arquivo local ou banco de dados |

**O que armazena:**
- Preferencias do usuario (tom de voz, formato de resposta)
- Tarefas recorrentes e padroes de uso
- Contexto de projetos em andamento
- Feedback recebido (positivo e negativo)

### Camada 3: Memoria de Longo Prazo (Permanente)

| Aspecto | Configuracao |
|---------|-------------|
| Duracao | Permanente (ate exclusao manual) |
| Capacidade | Ilimitada |
| Tipo | Conhecimento fundamental sobre o usuario |
| Armazenamento | Banco de dados persistente |

**O que armazena:**
- Perfil do usuario (nome, papel, empresa)
- Objetivos de longo prazo
- Regras e restricoes permanentes
- Historico de decisoes importantes

## Formato de Entrada de Memoria

```yaml
- id: "mem-001"
  camada: medio_prazo
  categoria: preferencia
  conteudo: "Usuario prefere respostas curtas e diretas"
  contexto: "Feedback dado em 2026-04-01 apos resposta longa"
  confianca: 0.9
  criado_em: "2026-04-01"
  expira_em: "2026-05-01"
  tags: ["comunicacao", "preferencia", "formato"]
```

## Regras de Memoria

### Salvar
1. Salve automaticamente quando o usuario corrigir ou dar feedback
2. Salve preferencias demonstradas por comportamento repetido (3+ vezes)
3. Nunca salve dados sensiveis (senhas, tokens, dados bancarios)
4. Sempre converta datas relativas para absolutas

### Recuperar
1. Consulte a memoria antes de responder perguntas sobre o usuario
2. Priorize memorias recentes sobre antigas em caso de conflito
3. Use memorias para personalizar o tom e formato das respostas
4. Nunca mencione que "lembrou" algo — aja naturalmente

### Esquecer
1. Respeite pedidos de exclusao imediatamente
2. Limpe memorias expiradas a cada boot
3. Remova memorias contraditadas por informacoes mais recentes
4. Permita que o usuario veja e gerencie suas memorias

## Politica de Retencao

| Camada | Retencao | Limpeza |
|--------|----------|---------|
| Curto prazo | Fim da sessao | Automatica |
| Medio prazo | 30 dias | Automatica (com log) |
| Longo prazo | Permanente | Apenas manual |

## Limites

| Parametro | Valor |
|-----------|-------|
| Tamanho maximo por entrada | 500 tokens |
| Entradas de medio prazo | 1000 max |
| Entradas de longo prazo | Ilimitado |
| Frequencia de salvamento | A cada interacao relevante |

## Personalizacao

Ajuste as camadas, limites e politicas de retencao conforme o caso de uso do seu agente. Agentes de atendimento precisam de mais memoria de curto prazo; agentes pessoais precisam de mais memoria de longo prazo.

---
*OpenClaw PT Pack v1.0 — AgentSkills.com.br*
