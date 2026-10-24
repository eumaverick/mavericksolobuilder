# Codex — como aplicar o Maverick Solo Builder

> Este bloco é gerado pelo `install.sh` do repositório `mavericksolobuilder` em
> `~/.codex/AGENTS.md`, seguido das regras globais (`global-claude.md`). Não edite à mão: edite o
> repositório e rode `./install.sh` de novo.

O Codex segue o MESMO método do Claude Code. As regras globais vêm logo abaixo deste bloco; leia
"Claude Code" nelas como "o agente desta sessão". Diferenças práticas no Codex:

- **Comandos do método.** Quando o usuário pedir `/milestone`, `/feature`, `/bug`, `/implement`,
  `/design`, `/review`, `/new-product` ou `/testes` (ou descrever essa atividade), leia
  `~/.claude/commands/<nome>.md` e siga a máquina de estados dele.
- **Papéis.** Os papéis (`tech-lead`, `dev-junior`, `dev-pleno`, `dev-senior`, `code-reviewer`,
  `design-engineer`) estão em `~/.claude/agents/<papel>.md`. Ao assumir um papel, leia o arquivo
  dele e respeite o orçamento de contexto e os limites. Se o Codex não tiver subagente
  disponível, execute os papéis em sequência, um card por vez.
- **Gate de complexidade.** Card `senior` continua exigindo plano curto aprovado pelo PM antes de
  codar, independente do modelo em uso.
- **Regras por área.** Antes de editar arquivos numa pasta, leia o `AGENTS.md` dela se existir —
  o Codex só carrega sozinho os `AGENTS.md` do caminho até o diretório atual.
- **Memória.** Use o ai-memory (MCP + hooks) para continuidade com o Claude Code. Não grave fatos
  de projeto na memória local do Codex.
- **Visibilidade com o Claude Code.** Siga a seção "Visibilidade entre Claude Code e Codex" abaixo:
  abra a sessão na pasta do projeto, leia o handoff do ai-memory ao começar e, ao concluir tarefa
  relevante ou encerrar, faça commit + push na branch de trabalho e registre
  `memory_handoff_begin` (`shared: true`). O que você deixar só em arquivo local ou no chat o Claude
  Code não enxerga.
