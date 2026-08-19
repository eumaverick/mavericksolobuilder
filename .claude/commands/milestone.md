---
description: Executa a esteira — implementa em ordem todos os cards restantes do milestone, com revisão e merge automáticos, e para na validação do PM.
argument-hint: <nome/número do milestone, ou vazio para o milestone em andamento>
---

Execute a esteira do Maverick Solo Builder para o milestone: $ARGUMENTS
(se vazio, o milestone em andamento registrado no `CLAUDE.md` do produto / `docs/plan/milestones.md`)

Você é o **orquestrador da esteira**. Siga a máquina de estados sem inventar passos:

1. **Sincronize.** `git checkout main && git pull`. Liste em `docs/cards/` os cards restantes do
   milestone, **na ordem definida pelo Tech Lead** (backend antes de frontend, dependências
   respeitadas).

2. **Para cada card, EM SEQUÊNCIA (nunca em paralelo), rode o ciclo completo:**
   a. **Gate:** `junior`/`pleno` → prossiga direto. `senior` → o `dev-senior` produz o plano em
      linguagem de PM e **PARE para aprovação do usuário**; aprovado, prossiga.
   b. **Implementação:** acione o subagente do nível da etiqueta (`dev-junior`/`dev-pleno`/
      `dev-senior`). Ele entrega branch + PR + evidência e para.
   c. **Revisão automática:** acione o `code-reviewer` (diff + critérios do card).
      - **PRECISA DE MUDANÇAS** → devolva os achados ao MESMO dev, na mesma branch. Máximo de
        **2 ciclos** de correção; persistindo, PARE e escale ao Tech Lead com o diagnóstico.
      - **APROVADO** → squash-merge na main, `git push`, marque o card **Done** em `docs/cards/`.
   d. Só então passe ao próximo card. PRs nunca se acumulam.

3. **Fim do milestone:**
   a. Acione o `tech-lead` para a **curadoria de aprendizados**: promover lições recorrentes do
      `docs/LEARNINGS.md` às Convenções do `CLAUDE.md` e limpar o arquivo. Atualizar a seção
      Milestones do `CLAUDE.md` (status) e commitá-la na main + push.
   b. **Prepare a validação do PM:**
      - Milestone **com UI** → suba o app/preview e entregue um roteiro de teste passo a passo em
        linguagem de negócio ("abra X, clique Y, deve acontecer Z") com a URL.
      - Milestone **sem UI** → rode a suíte de testes de API e apresente o relatório; a entrega só
        vale com **100% de aprovação** (se não estiver, volte ao passo 2 com um card de correção).

4. **PARE e entregue ao PM:** o que o milestone construiu (linguagem de negócio), como testar,
   evidências (screenshots/relatório de testes), cards fechados com links de PR, e o que vem no
   próximo milestone.

Regras fixas: um card por vez · merge só após APROVADO do code-reviewer · push imediato após cada
merge · qualquer erro sem solução clara → PARE e reporte ao PM em vez de improvisar.
