---
description: Planeja e cria os cards de uma nova feature em um produto existente, aplicando o gate híbrido de complexidade.
argument-hint: <descrição da feature>
---

Nova feature para o produto atual.

Briefing do usuário:
$ARGUMENTS

Roteiro:

1. **Acione o `tech-lead`.** Ele lê o `CLAUDE.md` do produto e o código relevante, esclarece dúvidas se necessário, e desenha a solução.
2. **Quebre em cards** no projeto do Linear deste produto (registrado no `CLAUDE.md`), com critérios de aceite + etiqueta de complexidade (`junior`/`pleno`/`senior`).
3. **Gate híbrido:** dispare automaticamente os cards `junior` via `/implement`; liste os `pleno`/`senior` e peça aprovação do usuário antes de implementar.
4. Resuma os cards criados e o que está rodando vs. aguardando.
