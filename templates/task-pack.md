# Pacote de contexto — template do corpo de card

> Usado pelo Tech Lead como corpo de TODO card em `docs/cards/`. O card é a única fonte que o dev
> lê além dos arquivos listados — se faltar algo aqui, o dev devolve o card.

---

**Objetivo:** <o porquê de negócio, 1–2 frases>

**Milestone:** <M1 — nome do milestone>

**Critérios de aceite:**
- [ ] <condição verificável 1>
- [ ] <condição verificável 2>
- [ ] <se card de backend consumido por frontend:> handoff escrito em `docs/handoffs/<feature>.md`

**Arquivos:**
- `<caminho/exato/arquivo1>` — <o que criar/alterar nele>
- `<caminho/exato/arquivo2>` — <o que criar/alterar nele>

**Contexto técnico:**
- <convenção relevante do projeto, copiada — não referenciada — do CLAUDE.md>
- <contrato de endpoint / interface / tipo envolvido>
- <se card de UI:> Tokens: `<caminho dos tokens>` · Componentes: `<caminho>` · Storybook: `<URL>`
  (copiados da seção Design System do CLAUDE.md)

**Dependências:**
- <card(s) que precisam estar Done antes>
- <se card de frontend:> leitura obrigatória do handoff `docs/handoffs/<feature>.md`

**Como verificar:**
- Testes: `<comando>` · Lint: `<comando>`
- Evidência exigida no PR: <screenshot da tela X / request→response do endpoint Y>

**Fora do escopo:**
- <o que explicitamente NÃO fazer neste card>
