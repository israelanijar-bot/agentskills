# BOOT.md — Instrucoes de Inicializacao

## Proposito

Este arquivo define o que o agente faz ao ser inicializado — a sequencia de boot. E como o "ritual de ligar" do seu agente.

## Sequencia de Boot

### Fase 1: Carregamento de Identidade
1. Ler `IDENTITY.md` — carregar nome, papel e contexto
2. Ler `SOUL.md` — carregar personalidade e tom de voz
3. Ler `AGENTS.md` — registrar sub-agentes disponiveis

### Fase 2: Restauracao de Memoria
1. Ler `MEMORY.md` — carregar configuracao de memoria
2. Restaurar contexto da ultima sessao (se disponivel)
3. Carregar preferencias salvas do usuario

### Fase 3: Verificacao de Saude
1. Executar checks do `HEARTBEAT.md`
2. Verificar conexoes com servicos externos
3. Validar que todos os arquivos de configuracao existem

### Fase 4: Saudacao
1. Cumprimentar o usuario pelo nome (se conhecido)
2. Resumir contexto da ultima interacao (se houver)
3. Perguntar como pode ajudar

## Exemplo de Boot Completo

```
[BOOT] Fase 1: Identidade carregada — "Assistente OpenClaw"
[BOOT] Fase 2: Memoria restaurada — 15 interacoes anteriores encontradas
[BOOT] Fase 3: Saude OK — todos os checks passaram
[BOOT] Fase 4: Pronto para interacao

Ola! Sou seu assistente OpenClaw. Na nossa ultima conversa,
estavamos organizando suas tarefas da semana.
Quer continuar de onde paramos ou prefere algo novo?
```

## Configuracoes de Boot

| Parametro | Valor Padrao | Descricao |
|-----------|-------------|-----------|
| `boot_timeout` | 10s | Tempo maximo para completar o boot |
| `restore_memory` | true | Restaurar memoria da sessao anterior |
| `greeting_style` | contextual | Saudacao baseada no historico |
| `health_check` | true | Executar verificacao de saude |
| `verbose_boot` | false | Mostrar log detalhado do boot |

## Boot Rapido (Modo Silencioso)

Para sessoes rapidas, o agente pode iniciar em modo silencioso:

```
[BOOT] Modo silencioso ativado
[BOOT] Pronto.

Como posso ajudar?
```

## Tratamento de Erros no Boot

| Erro | Acao |
|------|------|
| IDENTITY.md nao encontrado | Usar identidade padrao generica |
| Memoria corrompida | Iniciar sessao limpa, avisar usuario |
| Servico externo offline | Continuar sem o servico, informar limitacao |
| Timeout no boot | Iniciar com configuracao minima |

## Personalizacao

Ajuste a sequencia de boot para refletir as necessidades do seu projeto. Agentes simples podem pular fases; agentes complexos podem adicionar mais verificacoes.

---
*OpenClaw PT Pack v1.0 — AgentSkills.com.br*
