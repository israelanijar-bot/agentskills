# Guia de Setup — OpenClaw PT Pack

## O que é este pack?
Um conjunto de arquivos de configuração para transformar qualquer agente OpenClaw
em um CEO autônomo que executa com direção, memória e identidade definidas.

## Instalação em 5 passos

### Passo 1: Copiar os arquivos
Copie todos os arquivos .md para a raiz do seu workspace OpenClaw:
```
~/.openclaw/workspace/
├── SOUL.md
├── IDENTITY.md
├── AGENTS.md
├── BOOT.md
├── HEARTBEAT.md
└── MEMORY.md
```

### Passo 2: Personalizar SOUL.md
Abra SOUL.md e defina:
- O papel do seu agente (CEO, assistente, atendente)
- O tom de voz
- As regras de autonomia (verde/amarelo/vermelho)

### Passo 3: Preencher IDENTITY.md
Defina o nome, função e canais do agente.

### Passo 4: Configurar HEARTBEAT.md
Defina os horários das rotinas diárias, semanais e mensais.

### Passo 5: Inicializar MEMORY.md
Escreva o estado atual do projeto — meta, fase, decisões.

## Configurando o Heartbeat no OpenClaw

No terminal do seu servidor:
```bash
openclaw cron add --schedule "0 9 * * *" --payload heartbeat
```

## Suporte
Dúvidas? Acesse agentskills.com.br ou mande mensagem para o Axel.
