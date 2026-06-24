---
description: Implementa um card do Linear pelo desenvolvedor do nível certo (junior/pleno/senior), respeitando o gate híbrido.
argument-hint: <ID do card no Linear, ex: ABC-123>
---

Implemente o card do Linear: $ARGUMENTS

Roteiro:

1. **Leia o card** via MCP do Linear: título, descrição, critérios de aceite e **etiqueta de complexidade**.
2. **Roteie pelo nível + gate híbrido:**
   - Etiqueta `junior` → acione o subagente `dev-junior`. **Roda automaticamente.**
   - Etiqueta `pleno` → **peça confirmação do usuário** ("posso implementar o card X?") e, ao receber OK, acione o subagente `dev-pleno`.
   - Etiqueta `senior` → acione o `dev-senior`, que **primeiro produz um plano** e **para para sua aprovação** antes de codar.
   - Sem etiqueta → assuma `pleno` e peça confirmação.
3. O dev implementa, escreve testes, gera a evidência do perfil de stack, atualiza o status do card no Linear e abre o PR.
4. Resuma: o que foi feito, link do PR e a evidência.
