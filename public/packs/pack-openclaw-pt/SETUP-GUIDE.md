# Guia de Setup — OpenClaw PT Pack

## Introducao

Este guia vai te ajudar a configurar o OpenClaw PT Pack passo a passo. Ao final, voce tera um agente totalmente funcional, configurado em portugues brasileiro.

**Tempo estimado:** 15-30 minutos
**Nivel:** Iniciante a Intermediario
**Pre-requisitos:** Ter o OpenClaw instalado (ou qualquer framework de agentes compativel)

---

## Passo 1: Organizacao dos Arquivos

Apos baixar o pack, voce tera os seguintes arquivos:

```
pack-openclaw-pt/
├── SOUL.md          # Personalidade do agente
��── AGENTS.md        # Sub-agentes especializados
├── BOOT.md          # Sequencia de inicializacao
├── HEARTBEAT.md     # Monitoramento de saude
├── MEMORY.md        # Sistema de memoria
├── IDENTITY.md      # Identidade e contexto
└── SETUP-GUIDE.md   # Este guia
```

**Acao:** Copie todos os arquivos `.md` (exceto este guia) para a pasta raiz do seu projeto OpenClaw.

```bash
cp SOUL.md AGENTS.md BOOT.md HEARTBEAT.md MEMORY.md IDENTITY.md /caminho/do/seu/projeto/
```

---

## Passo 2: Configurar a Identidade

Abra o arquivo `IDENTITY.md` e preencha:

1. **Nome do agente** — Escolha um nome que reflita o proposito
2. **Papel** — Descreva em uma frase o que o agente faz
3. **Dominio** — Defina a area de atuacao
4. **Criador** — Seu nome ou organizacao

**Exemplo:**
```
Nome: Clara
Papel: Assistente de produtividade para freelancers brasileiros
Dominio: Organizacao de tarefas, gestao de tempo, financas pessoais
```

---

## Passo 3: Personalizar a Alma

Abra o arquivo `SOUL.md` e ajuste:

1. **Tom de voz** — Formal? Informal? Tecnico? Amigavel?
2. **Valores** — O que e mais importante para o seu agente?
3. **Limites** — O que o agente deve recusar fazer?

**Dica:** Comece com as configuracoes padrao e ajuste conforme o feedback dos usuarios.

---

## Passo 4: Configurar Sub-Agentes

Abra o arquivo `AGENTS.md` e decida:

1. Quais sub-agentes sao necessarios para o seu caso de uso?
2. Remova os que nao precisa
3. Adicione novos se necessario

**Para iniciantes:** Comece apenas com o agente principal (sem sub-agentes). Adicione conforme a necessidade surgir.

---

## Passo 5: Ajustar a Memoria

Abra o arquivo `MEMORY.md` e configure:

1. **Retencao de medio prazo** — 30 dias e o padrao; ajuste conforme necessidade
2. **Limite de entradas** — 1000 e suficiente para a maioria dos casos
3. **Dados sensiveis** — Certifique-se de que dados sensiveis estao na lista de exclusao

---

## Passo 6: Configurar o Boot

Abra o arquivo `BOOT.md` e ajuste:

1. **Saudacao** — Como o agente cumprimenta o usuario?
2. **Modo silencioso** — Deseja boot rapido sem saudacao elaborada?
3. **Restauracao de memoria** — Ativar ou desativar?

---

## Passo 7: Monitoramento

Abra o arquivo `HEARTBEAT.md` e configure:

1. **Checks obrigatorios** — Quais verificacoes devem ser feitas a cada boot?
2. **Limites de resposta** — Qual o tempo aceitavel?
3. **Alertas** — Como o agente deve reportar problemas?

---

## Passo 8: Testar

Execute seu agente e verifique:

- [ ] O agente inicia sem erros
- [ ] A saudacao esta em portugues
- [ ] O tom de voz esta conforme configurado
- [ ] A memoria persiste entre sessoes
- [ ] Os sub-agentes respondem quando acionados
- [ ] O heartbeat reporta status corretamente

---

## Dicas de Personalizacao

### Para Atendimento ao Cliente
- Aumente a empatia no SOUL.md
- Adicione sub-agente @suporte com base de conhecimento
- Configure memoria de longo prazo para historico de tickets

### Para Desenvolvimento de Software
- Tom mais tecnico no SOUL.md
- Sub-agentes: @revisor (code review), @documentador, @testador
- Memoria focada em padroes de codigo e decisoes arquiteturais

### Para Produtividade Pessoal
- Tom casual e motivador no SOUL.md
- Sub-agentes: @organizador, @lembrete
- Memoria de medio prazo para habitos e rotinas

---

## Solucao de Problemas

| Problema | Solucao |
|----------|---------|
| Agente nao inicia | Verifique se todos os arquivos .md estao na pasta correta |
| Saudacao em ingles | Confirme que SOUL.md e IDENTITY.md estao com idioma "Portugues brasileiro" |
| Memoria nao persiste | Verifique configuracao de armazenamento no MEMORY.md |
| Respostas genericas | Personalize SOUL.md com mais detalhes sobre tom e estilo |
| Sub-agente nao responde | Verifique se esta registrado no AGENTS.md |

---

## Proximos Passos

1. **Use por uma semana** e anote pontos de melhoria
2. **Ajuste o SOUL.md** com base no feedback real
3. **Adicione memorias de longo prazo** manualmente para acelerar o aprendizado
4. **Explore sub-agentes** conforme novas necessidades surgirem
5. **Compartilhe suas configuracoes** com a comunidade AgentSkills!

---

## Suporte

- **Documentacao:** agentskills.com.br/docs
- **Comunidade:** Fale com outros usuarios no Discord
- **Atualizacoes:** Novas versoes do pack serao notificadas por email

---
*OpenClaw PT Pack v1.0 — AgentSkills.com.br*
