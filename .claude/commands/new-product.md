---
description: Cria um produto/software do zero a partir de um briefing - planeja, escolhe a stack, monta o esqueleto, publica no GitHub e abre milestones + cards no Linear.
argument-hint: <briefing do produto em uma ou mais frases>
---

Você vai iniciar um **produto novo do zero** a partir do briefing abaixo.

Briefing do usuário:
$ARGUMENTS

Siga este roteiro:

1. **Acione o Tech Lead.** Use o subagente `tech-lead` para conduzir o planejamento. Ele deve:
   - Fazer perguntas de esclarecimento se o briefing estiver vago (uma única rodada, e parar para
     o PM responder).
   - Recomendar a **stack** e escolher o **perfil** correspondente em `~/.claude/profiles/`
     (`web-nextjs`, `backend-node`, `mobile-expo` ou propor um novo). Confirme a stack com o PM.
2. **Crie a pasta do produto** (confirme o local com o PM — ex.: `~/Claude/Projects/<nome>`) e
   inicialize git. Os comandos/agentes do fluxo já são globais (`~/.claude/`) — não copie nada.
3. **Monte o esqueleto** do projeto conforme o perfil de stack (estrutura mínima que roda).
4. **Escreva o `CLAUDE.md` do produto** a partir de `~/.claude/templates/CLAUDE.product.md`
   (visão, stack, convenções, comandos, projeto do Linear, milestones) e crie `docs/LEARNINGS.md`
   a partir de `~/.claude/templates/LEARNINGS.md`.
5. **Publique no GitHub JÁ** (antes de qualquer card): crie o repositório privado, garanta
   `.env`/segredos no `.gitignore`, faça o primeiro commit e push. **GitHub é a fonte de verdade
   desde o dia 0** — registre a URL do repositório na seção Git do `CLAUDE.md`.
6. **Configure o projeto no Linear.** Reaproveite um rascunho (Project 1/2/3) renomeando-o, ou
   crie um novo. Registre nome + ID no `CLAUDE.md`.
7. **Milestones + cards iniciais** (via Tech Lead): fatiar em milestones testáveis pelo PM,
   ordenar backend → frontend (com handoffs), e criar os cards no Linear com pacote de contexto,
   critérios de aceite e etiqueta de complexidade. Se o produto tem UI, o primeiro card é o design
   system (`design-engineer`).
8. **Resuma e inicie a esteira:** apresente os milestones e como o PM validará cada um; em
   seguida sugira `/milestone` para executar o primeiro (cards `junior`/`pleno` rodam automáticos;
   `senior` para na aprovação do plano).
