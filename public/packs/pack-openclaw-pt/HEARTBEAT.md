# HEARTBEAT.md — Monitoramento e Health Checks

## Proposito

Este arquivo define o sistema de monitoramento do agente — como ele verifica sua propria saude e reporta problemas.

## Health Checks

### Check 1: Arquivos de Configuracao

| Arquivo | Obrigatorio | Fallback |
|---------|------------|----------|
| SOUL.md | Sim | Personalidade padrao |
| AGENTS.md | Nao | Operar sem sub-agentes |
| BOOT.md | Sim | Boot minimo |
| MEMORY.md | Nao | Sem persistencia |
| IDENTITY.md | Sim | Identidade generica |

**Frequencia:** A cada inicializacao
**Acao em falha:** Log de aviso + usar fallback

### Check 2: Memoria

| Verificacao | Descricao |
|------------|-----------|
| Integridade | Dados de memoria nao estao corrompidos |
| Tamanho | Memoria nao excede o limite configurado |
| Idade | Memorias expiradas sao arquivadas |

**Frequencia:** A cada 10 interacoes
**Acao em falha:** Limpar memorias corrompidas, notificar usuario

### Check 3: Tempo de Resposta

| Metrica | Limite Aceitavel | Acao |
|---------|-----------------|------|
| Tempo medio de resposta | < 5 segundos | Normal |
| Tempo medio de resposta | 5-15 segundos | Aviso: agente lento |
| Tempo medio de resposta | > 15 segundos | Alerta: investigar causa |

**Frequencia:** Continuo
**Acao em falha:** Simplificar processamento, desativar features opcionais

### Check 4: Conexoes Externas

| Servico | Tipo | Timeout |
|---------|------|---------|
| API principal | Critico | 5s |
| Banco de dados | Critico | 3s |
| Servicos auxiliares | Opcional | 10s |

**Frequencia:** A cada inicializacao + a cada 5 minutos
**Acao em falha:** Modo offline para servicos opcionais; alerta para criticos

## Status do Agente

O agente reporta um dos seguintes estados:

| Status | Significado | Cor |
|--------|------------|-----|
| SAUDAVEL | Todos os checks passaram | Verde |
| DEGRADADO | Checks opcionais falharam | Amarelo |
| CRITICO | Checks obrigatorios falharam | Vermelho |
| OFFLINE | Agente indisponivel | Cinza |

## Relatorio de Saude

Exemplo de relatorio gerado pelo heartbeat:

```
=== HEARTBEAT REPORT ===
Data: 2026-04-04 10:30:00
Status: SAUDAVEL

Checks:
  [OK] Arquivos de configuracao: 5/5 presentes
  [OK] Memoria: 2.3MB / 10MB (23%)
  [OK] Tempo medio de resposta: 1.2s
  [OK] Conexoes: 3/3 ativas

Uptime: 4h 32min
Interacoes na sessao: 47
Erros na sessao: 0
===========================
```

## Alertas

| Nivel | Quando | Notificacao |
|-------|--------|-------------|
| Info | Check opcional falhou | Log interno |
| Aviso | Performance degradada | Mensagem ao usuario |
| Critico | Funcionalidade comprometida | Alerta imediato + fallback |

## Personalizacao

Ajuste os limites, frequencias e acoes conforme o ambiente do seu agente. Agentes em producao devem ter checks mais rigorosos; agentes de desenvolvimento podem ser mais flexiveis.

---
*OpenClaw PT Pack v1.0 — AgentSkills.com.br*
