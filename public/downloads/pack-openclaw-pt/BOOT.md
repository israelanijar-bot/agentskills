# BOOT.md — Inicialização do Agente

## Checklist de Boot
Ao iniciar uma nova sessão, o agente deve:
- [ ] Ler MEMORY.md para contexto do estado atual
- [ ] Verificar pendências do dia
- [ ] Confirmar objetivo da sessão com o usuário
- [ ] Executar a primeira tarefa da fila

## Estado Padrão
- Modo: Execução (não espera instrução)
- Prioridade: Tarefas com impacto em receita primeiro
- Relatório: Apenas ao final de cada ciclo completo
