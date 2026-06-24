# DevFlow Starter — fábrica de software multi-agente

Este repositório é um **kit reutilizável** que transforma briefings de negócio em software, com separação entre **planejamento** (modelo forte) e **execução** (modelo simples), para otimizar custo de tokens e qualidade.

## Como usar

Você (PM) interage só por **briefings** e por **4 comandos**:

- `/new-product <briefing>` — cria um produto do zero.
- `/feature <descrição>` — adiciona uma feature a um produto existente.
- `/bug <relato>` — corrige um bug.
- `/design <briefing>` — cria design system / protótipos.

Internamente, o comando `/implement <CARD-ID>` dispara o desenvolvedor certo para um card específico do Linear.

## O fluxo

1. Você escreve um briefing num dos 4 comandos.
2. O **Tech Lead** (agente, modelo Opus) esclarece dúvidas, desenha a solução e cria **cards no Linear** com critérios de aceite + etiqueta de complexidade.
3. **Gate híbrido por complexidade:**
   - 🟢 `junior` (Haiku) → roda **automaticamente**.
   - 🟡 `pleno` (Sonnet) → **espera sua aprovação**.
   - 🔴 `senior` (Opus) → mostra o **plano** e espera sua aprovação.
4. O desenvolvedor implementa **um card por vez**, escreve testes e abre um **PR com evidência visual** (screenshot/teste).
5. Você revisa visualmente, aprova e o **deploy roda nos trilhos** (Vercel/Railway/EAS conforme a stack).

## Componentes

- `.claude/agents/` — os papéis: `tech-lead` (Opus), `dev-junior` (Haiku), `dev-pleno` (Sonnet), `dev-senior` (Opus), `design-engineer` (Sonnet).
- `.claude/commands/` — os 4 pontos de entrada + `implement`.
- `.claude/profiles/` — conhecimento de stack (web/backend/mobile), carregado por produto.
- `templates/CLAUDE.product.md` — o `CLAUDE.md` que cada produto novo recebe.

## Princípio-guia

**Gaste o modelo caro pensando; o barato digitando.** O maior custo está em specs ruins, não no modelo que escreve o código. Cards claros = menos retrabalho = menos tokens.

## Linear

Os cards vivem no Linear (via MCP oficial, endpoint `https://mcp.linear.app/mcp`). Projetos-rascunho disponíveis: **Project 1**, **Project 2**, **Project 3** — reaproveite-os renomeando para o produto, ou crie um projeto novo. Cada produto registra no seu próprio `CLAUDE.md` qual projeto do Linear usa.

> Ao criar um produto, este starter é copiado para a pasta do produto e o `CLAUDE.md` é substituído pelo do produto (gerado de `templates/CLAUDE.product.md`).
