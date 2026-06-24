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
   - Recomendar a **stack** e escolher o **perfil** correspondente em `~/.claude/profiles/`
     (`web-nextjs`, `backend-node`, `mobile-expo` ou propor um novo). Confirme a stack com o usuário.
2. **Crie a pasta do produto** (confirme o local com o usuário — ex.: `~/Desktop/Project/<nome>` ou
   `~/Claude/Projects/<nome>`) e inicialize git. Os comandos/agentes do fluxo já são globais
   (`~/.claude/`), então **não é preciso copiar nada** para o produto.
3. **Monte o esqueleto** do projeto conforme o perfil de stack escolhido (estrutura mínima que roda).
4. **Escreva o `CLAUDE.md` do produto** a partir de `~/.claude/templates/CLAUDE.product.md`: visão,
   stack escolhida, convenções, comandos de build/teste/deploy (do perfil) e **qual projeto do Linear**.
5. **Configure o projeto no Linear.** Reaproveite um rascunho renomeando-o para o nome do produto, ou
   crie um projeto novo. Registre nome + ID no `CLAUDE.md`.
6. **Crie os cards iniciais** no Linear (via Tech Lead), com critérios de aceite e etiqueta de complexidade.
7. **Aplique o gate híbrido e resuma:** dispare automaticamente os `junior` via `/implement`; liste os
   `pleno`/`senior` pedindo a aprovação do usuário para prosseguir.
8. **Crie o repositório no GitHub** (privado) para o produto e faça o primeiro push, garantindo que
   segredos (`.env`) estejam no `.gitignore` antes de qualquer commit.
