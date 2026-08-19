---
description: Executa UM card pela esteira completa - dev do nível certo, revisão automática, merge + push e card fechado.
argument-hint: <ID do card, ex: P-003, ou caminho em docs/cards/>
---

Execute o card pela esteira: $ARGUMENTS

Você é o **orquestrador da esteira** para este card. Máquina de estados, sem passos inventados:

1. **Sincronize.** `git checkout main && git pull` (GitHub é a fonte de verdade).
2. **Leia o card** em `docs/cards/<CARD-ID>-*.md`: pacote de contexto, critérios de aceite,
   **etiqueta de complexidade** e dependências. Dependência não concluída (ex.: card de frontend
   sem o handoff `docs/handoffs/` pronto) → PARE e avise o PM.
3. **Gate:**
   - `junior` ou `pleno` → prossiga automaticamente.
   - `senior` → o `dev-senior` produz o plano em linguagem de PM e **PARE para aprovação do
     usuário**; aprovado, prossiga.
   - Sem etiqueta → trate como `pleno` e registre no card que faltou etiqueta.
4. **Implementação:** acione o subagente do nível (`dev-junior`/`dev-pleno`/`dev-senior`). Ele
   entrega branch + PR + evidência + aprendizado e para.
5. **Revisão automática:** acione o `code-reviewer` (diff do PR + critérios do card).

> **Caveman:** se o modo caveman estiver ativo nesta sessão, inclua no prompt de CADA subagente
> acionado nos passos 3–5 acima: "modo caveman ativo: <nível> — comprima sua resposta e raciocínio
> de acordo." Ele não herda sozinho (lei do `~/.claude/CLAUDE.md`).
   - **PRECISA DE MUDANÇAS** → devolva os achados ao MESMO dev, na mesma branch. Máximo de
     **2 ciclos**; persistindo, PARE e escale ao Tech Lead com o diagnóstico.
   - **APROVADO** → squash-merge na main, `git push`, marque o card **Done** no topo do arquivo
     em `docs/cards/`.
6. **Resuma para o PM** em linguagem de negócio: o que o card entregou, link do PR (merged), a
   evidência, e qual é o próximo card do milestone (sugira `/milestone` para seguir a esteira).
