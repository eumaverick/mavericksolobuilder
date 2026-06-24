---
description: Cria um produto/software do zero a partir de um briefing — planeja, escolhe a stack, monta o esqueleto do projeto e abre os cards iniciais no Linear.
argument-hint: <briefing do produto em uma ou mais frases>
---

Você vai iniciar um **produto novo do zero** a partir do briefing abaixo.

Briefing do usuário:
$ARGUMENTS

Siga este roteiro:

1. **Acione o Tech Lead.** Use o subagente `tech-lead` para conduzir o planejamento. Ele deve:
   - Fazer perguntas de esclarecimento se o briefing estiver vago (e parar para o usuário responder).
   - Recomendar a **stack** e escolher o **perfil** correspondente em `.claude/profiles/` (`web-nextjs`, `backend-node`, `mobile-expo` ou propor um novo). Confirme a stack com o usuário.
2. **Defina o local do produto.** O produto vira uma pasta nova irmã em `/Users/ericksteckert/Desktop/Project/<nome-do-produto>`. Copie deste starter kit a pasta `.claude/` (agents, commands, profiles) e a pasta `templates/` para o novo produto, para que ele tenha o mesmo fluxo.
3. **Monte o esqueleto** do projeto conforme o perfil de stack escolhido (estrutura mínima que roda) e inicialize git.
4. **Escreva o `CLAUDE.md` do produto** a partir de `templates/CLAUDE.product.md`: visão, stack escolhida, convenções, comandos de build/teste/deploy (do perfil) e **qual projeto do Linear** será usado.
5. **Configure o projeto no Linear.** Reaproveite um rascunho (**Project 1/2/3**) renomeando-o para o nome do produto, ou crie um projeto novo. Registre nome + ID no `CLAUDE.md`.
6. **Crie os cards iniciais** no Linear (via Tech Lead), com critérios de aceite e etiqueta de complexidade.
7. **Aplique o gate híbrido e resuma:** liste os cards; dispare automaticamente os de etiqueta `junior` via `/implement`; e liste os `pleno`/`senior` pedindo a aprovação do usuário para prosseguir.
8. (Opcional) Pergunte se o usuário quer criar o repositório no GitHub para este produto.
