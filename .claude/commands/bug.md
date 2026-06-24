---
description: Triagem e correção de um bug — cria o card e (se simples) já dispara a correção automática segundo o gate híbrido.
argument-hint: <descrição do bug: o que acontece, onde, como reproduzir>
---

Correção de bug no produto atual.

Relato do usuário:
$ARGUMENTS

Roteiro:

1. **Acione o `tech-lead`** para triagem: ele lê o `CLAUDE.md`, localiza a área provável do bug e avalia gravidade/complexidade.
2. **Crie um card de bug** no projeto do Linear deste produto, com: passos para reproduzir, comportamento esperado vs. atual, critérios de aceite (incluindo "teste de regressão que falha antes e passa depois") e etiqueta de complexidade.
3. **Gate híbrido:** se o bug for `junior`, dispare a correção automaticamente via `/implement`. Se for `pleno`/`senior`, peça aprovação antes.
4. Resuma o diagnóstico e o status.
