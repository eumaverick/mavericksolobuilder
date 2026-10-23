# Pacote de contexto — template do corpo de card

> Usado pelo Tech Lead como corpo de TODO card em `docs/cards/`. Leia também o Brief do Milestone
> indicado abaixo. Não repita aqui o que o brief já traz; se faltar contexto que muda a solução,
> devolva o card ao Tech Lead.

---

**Objetivo:** <o porquê de negócio, 1–2 frases>

**Milestone:** <M1 — nome do milestone>

**Brief comum:** `docs/plan/<M1>-brief.md`

**Checkpoint técnico:** <nenhum | antes do próximo dependente: motivo de risco/contrato>

**Critérios de aceite:**
- [ ] Dado <estado inicial>, quando <ação>, então <resultado observável>
- [ ] Dado <estado inicial>, quando <ação>, então <resultado observável>
> Comportamento verificável, não intenção: é onde o dev ancora o passo 0 ("o teste que prova é Z").
- [ ] <se card de backend consumido por frontend:> handoff escrito em `docs/handoffs/<feature>.md`

**Arquivos:**
- `<caminho/exato/arquivo1>` — <o que criar/alterar nele>
- `<caminho/exato/arquivo2>` — <o que criar/alterar nele>

**Delta técnico:**
- <somente contrato, exceção ou convenção que este card acrescenta/altera>
- <se card de UI:> Tokens: `<caminho>` · Componentes: `<caminho>` · Storybook: `<URL>`

**Protótipo:** <só card de UI — ids de tela/estado do registro `telas.json` · HTML da tela · folhas de estilo que ela usa; ou "n/a">
> Leitura obrigatória do dev. É a especificação: estrutura, hierarquia, medidas, textos e estados
> vêm dele. Diferença intencional vai em **Desvios** no relatório; desvio sem aprovação do PM reprova.

**Dependências:**
- <card(s) que precisam estar Done antes>
- <se card de frontend:> leitura obrigatória do handoff `docs/handoffs/<feature>.md`

**Como verificar:**
- Testes: `<comando>` · Lint: `<comando>`
- <se card de UI:> `node scripts/comparar-prototipo.mjs --tela <id>` com relatório verde nas resoluções/temas do brief (ou desvios listados)
- Evidência para a entrega do milestone: <screenshot da tela X / request→response do endpoint Y>

**Fora do escopo:**
- <o que explicitamente NÃO fazer neste card>
