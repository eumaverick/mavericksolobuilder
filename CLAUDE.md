# Maverick Solo Builder — fábrica de software multi-agente

Método reutilizável que transforma briefings de negócio em software, separando **planejamento**
(modelo forte) de **execução** (modelo simples), para otimizar custo de tokens e qualidade.
Repositório-fonte: https://github.com/eumaverick/mavericksolobuilder · instalado globalmente em `~/.claude`.

## Os 5 pontos de entrada (obrigatórios para todo trabalho de dev)

- `/new-product <briefing>` — cria um produto do zero.
- `/feature <descrição>` — adiciona uma feature a um produto existente.
- `/bug <relato>` — corrige um bug.
- `/design <briefing>` — cria design system / protótipos.
- `/review <PR ou vazio>` — revisa projeto / código / PR.

Interno: `/implement <CARD-ID>` dispara o desenvolvedor certo para um card em `docs/cards/`.

## O fluxo

1. Você escreve um briefing num dos comandos.
2. O **Tech Lead** (Opus) esclarece dúvidas, desenha a solução e cria **cards em `docs/cards/`**
   (locais, versionados no produto) com critérios de aceite + etiqueta de complexidade.
3. **Gate híbrido:** 🟢 `junior` (Haiku) roda automático; 🟡 `pleno` (Sonnet) espera sua aprovação;
   🔴 `senior` (Opus) mostra o plano e espera aprovação.
4. O dev implementa **um card por vez**, com testes e **PR com evidência visual**.
5. Você revisa, aprova e o **deploy roda nos trilhos** (Vercel/Railway/EAS conforme a stack).

## Instalação global

Os agentes e comandos vivem globalmente em `~/.claude/` (symlinks para este repositório, criados por
`./install.sh`). Assim TODO projeto, em qualquer pasta, já tem o fluxo — não é preciso copiar nada para
cada produto. A regra obrigatória de uso está em `global-claude.md` → `~/.claude/CLAUDE.md`.

Após editar o método, rode `./install.sh` de novo (symlinks repropagam sozinhos) e faça commit + push.

## Componentes

- `.claude/agents/` — `tech-lead` (Opus), `dev-junior` (Haiku), `dev-pleno` (Sonnet), `dev-senior` (Opus),
  `design-engineer` (Sonnet), `code-reviewer` (Sonnet).
- `.claude/commands/` — `new-product`, `feature`, `bug`, `design`, `review` + `implement`.
- `.claude/profiles/` — stacks (web-nextjs, backend-node, mobile-expo) → instalados em `~/.claude/profiles/`.
- `templates/CLAUDE.product.md` — o `CLAUDE.md` que cada produto novo recebe.
- `global-claude.md` — regra global obrigatória (vira `~/.claude/CLAUDE.md`).
- `install.sh` — instala/atualiza o método globalmente.

## Princípio-guia

**Gaste o modelo caro pensando; o barato digitando.** O maior custo está em specs ruins, não no modelo
que escreve o código. Cards claros = menos retrabalho = menos tokens.

## Cards

Padrão: `docs/cards/` (arquivo por card) + `docs/plan/milestones.md`, versionados no repositório
do produto — sem custo de MCP. Linear é opcional; carregue `mcp__linear__*` via ToolSearch só
quando o PM pedir sincronização explícita, e em lote.
