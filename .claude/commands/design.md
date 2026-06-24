---
description: Cria ou evolui design system e/ou protótipos navegáveis (UX/UI/acessibilidade) em código aberto — sem Figma.
argument-hint: <o que projetar: design system, telas, fluxo...>
---

Tarefa de design para o produto atual.

Briefing do usuário:
$ARGUMENTS

Roteiro:

1. Se a tarefa exigir planejamento (várias telas/fluxos), acione o `tech-lead` para quebrar em cards no Linear. Para algo direto, vá ao passo 2.
2. **Acione o subagente `design-engineer`** para criar/evoluir:
   - **design system** — tokens + componentes acessíveis (Tailwind + shadcn/Radix), catalogados no **Storybook**; e/ou
   - **protótipos navegáveis** — telas/fluxos reais e clicáveis (páginas com roteamento), reaproveitando os tokens.
3. **Acessibilidade (WCAG 2.2 AA):** rode axe (Storybook a11y / Playwright) e Lighthouse; corrija até passar.
4. **Validação visual:** o design-engineer abre o resultado no navegador, tira screenshots por breakpoint/estado e itera.
5. Abra PR com Storybook, preview navegável (deploy), screenshots e o relatório de a11y. Resuma o que foi entregue.
