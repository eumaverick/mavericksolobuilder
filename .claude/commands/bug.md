---
description: Triagem e correção de um bug - cria o card com pacote de contexto e roda a esteira automaticamente (junior/pleno); senior espera o plano aprovado.
argument-hint: <descrição do bug: o que acontece, onde, como reproduzir>
---

Correção de bug no produto atual.

Relato do usuário:
$ARGUMENTS

Roteiro:

1. **Acione o `tech-lead`** para triagem: ele sincroniza (`git pull`), lê `CLAUDE.md` +
   `docs/LEARNINGS.md` (o bug pode ser um erro já registrado lá), localiza a área provável e
   avalia gravidade/complexidade.
2. **Crie o card de bug** no projeto do Linear deste produto, com pacote de contexto completo:
   passos para reproduzir, comportamento esperado vs. atual, arquivos prováveis, critérios de
   aceite (incluindo **"teste de regressão que falha antes e passa depois"**) e etiqueta de
   complexidade.
3. **Esteira:** `junior`/`pleno` → dispare imediatamente via `/implement` (dev → revisão
   automática → merge + push → card Done). `senior` → o dev-senior apresenta o plano e espera a
   aprovação do PM antes de codar.
4. **Resuma para o PM:** diagnóstico em linguagem de negócio, o que foi corrigido, link do PR e a
   evidência (teste de regressão passando). Se a correção merecer registro, o dev adiciona a lição
   em `docs/LEARNINGS.md`.
