# Plano de acurácia do Maverick Solo Builder

> Criado em 2026-10-23, depois da primeira rodada (PR #3: contexto enxuto, regras por área,
> ai-memory, Codex). Oito frentes, cada uma executável isoladamente, num PR próprio neste
> repositório, salvo indicação. Status de cada frente na tabela abaixo; atualize-a ao concluir.

## Ordem recomendada e status

| # | Frente | Por que nesta posição | Esforço | Status |
|---|---|---|---|---|
| 8 | Tela fiel ao protótipo aprovado | Maior dor atual do PM; o M9 do Norton está codando telas agora | alto | método feito (PR); aplicação no Norton pendente |
| 5 | Protótipo antes de código, regra do método | Pré-requisito do 8: só há o que comparar se o protótipo cobre tudo | baixo | planejado |
| 1 | Regra testável vira teste/lint | Tira peso do contexto e para a repetição dos mesmos bugs | médio | em PR (método); varredura do Norton pendente |
| 3 | Modelo certo no lugar certo | Mudança de poucas linhas, efeito imediato no gate final | baixo | planejado |
| 4 | Entendimento antes de codar | Barato; pega o erro mais caro (resolver o problema errado) | baixo | planejado |
| 6 | Medir a acurácia por milestone | Sem número não dá para saber se 1–5 e 8 funcionaram | baixo | planejado |
| 2 | Hooks determinísticos no Claude Code | Mexe no harness; fazer depois que 1 definir o que checar | médio | planejado |
| 7 | Um escritor por área entre ferramentas | Depende do ai-memory em uso real por alguns dias | médio | planejado |

Toda frente termina com: PR neste repositório → aprovação do PM → merge → `./install.sh` no
checkout principal → validação no próximo milestone real (Norton M9 é o piloto).

---

## 8. Tela fiel ao protótipo aprovado

**Problema.** O PM aprova o protótipo, mas a tela implementada sai diferente.

**Causas encontradas no Norton M9:**

1. **O dev não pode ler o protótipo.** O orçamento de contexto do `dev-junior`/`dev-pleno` manda ler
   só os arquivos listados no card, e os cards de UI (ex.: M9.B1) listam só arquivos do app. O dev
   reconstrói a tela a partir da descrição em texto.
2. **O protótipo fala outra língua de tokens.** `docs/design/prototipos/m9/assets/tokens.css`
   (396 linhas, "tokens da direção") não é o `design/tokens.json` do app, e o CSS do protótipo tem
   ~660 medidas em `px`. Valor que não existe no app vira aproximação.
3. **A comparação é a olho.** O card pede "capturas lado a lado", sem limite objetivo; o mesmo agente
   que codou julga se ficou parecido. O `code-reviewer` não tem critério de fidelidade.
4. **O PM só vê no fim do milestone**, quando a divergência já se espalhou por várias telas.

**Mudanças no método:**

- `design-engineer.md` e `commands/design.md` — **protótipo nasce consumindo os tokens do produto.**
  O protótipo importa o build real (`design/build/tokens.css`); token novo que a direção precisa é
  criado em `design/tokens.json` durante o protótipo, não num arquivo paralelo. Medida de layout
  recorrente (alturas, gaps, raios) vira token. Ao aprovar, o protótipo fica **congelado** por tag
  ou commit (`prototipo-<milestone>-aprovado`), e toda mudança depois disso passa pelo PM.
- `design-engineer.md` — **cada tela/estado tem um id estável** (`data-tela="qi.pergunta.matriz"`) e
  os elementos-chave têm `data-ref` (título, opções, CTA, Norton, cenário). O registro de telas
  (como o `telas.js` do M9) liga id → rota do app → card.
- `tech-lead.md` + `templates/task-pack.md` — **card de UI lista o protótipo como leitura
  obrigatória**: o HTML da tela, as folhas de estilo usadas por ela e os ids de tela/estado que o
  card cobre. Novo campo no template: `Protótipo: <ids> · <arquivos>`.
- `dev-junior.md`/`dev-pleno.md`/`dev-senior.md` — **portar, não reinterpretar.** Em card de UI, o
  protótipo listado é a especificação: estrutura, hierarquia, espaçamentos, textos e estados vêm
  dele. O dev replica os mesmos `data-ref` na tela real. Qualquer diferença intencional vai numa
  seção **Desvios** do relatório (o quê, por quê), e desvio não aprovado pelo PM reprova.
- **Comparação objetiva** (novo script-modelo em `templates/scripts/comparar-prototipo.mjs`,
  generalizando o `capturas-m9.mjs` do Norton): para cada id de tela, abre o protótipo e a rota do
  app na mesma viewport, tema e estado (Playwright com o Brave), e produz:
  - diff de pixels com máscara para partes animadas (Norton piscando), com limite por tela;
  - comparação de geometria dos `data-ref` (posição e tamanho; tolerância de poucos px);
  - página HTML lado a lado + relatório `passou/falhou` por tela, resolução e tema.
  O card de UI só está pronto com o relatório verde ou com os desvios listados.
- `code-reviewer.md` — novo item bloqueante **Fidelidade ao protótipo**: confere o relatório do
  script e abre as imagens das telas que falharam; desvio sem justificativa = 🔴.
- `milestone.md` — **checkpoint de fidelidade antecipado:** a primeira tela de UI implementada do
  milestone vai ao PM lado a lado com o protótipo antes das demais. Aprovada, vira a referência de
  "fiel o bastante" para o resto.

**Aplicação no Norton (depois do merge no método):** card de ajuste no M9 que (a) aponta o
`tokens.css` do protótipo para o build real e cria os tokens que faltam, (b) adiciona `data-ref` no
protótipo, (c) adapta o `capturas-m9.mjs` para gerar o relatório objetivo e (d) acrescenta o campo
`Protótipo:` nos cards de UI do M9 ainda não feitos.

**Como validar.** No próximo card de UI do M9: relatório do script verde nas resoluções do brief e
o PM aprovar a primeira tela lado a lado sem pedir ajuste.

---

## 5. Protótipo antes de código, regra do método

**Problema.** No M8 do Norton o protótipo cobria 5 telas; o resto foi codado sem design e o dev
preencheu com template genérico. A regra hoje existe só no Norton.

**Mudanças:**

- `global-claude.md` — princípio novo: **nenhuma tela nova ou refeita vai para código sem protótipo
  aprovado que cubra todas as telas e estados** (vazio, carregando, erro, sucesso) numa matriz de
  resoluções definida no brief.
- `tech-lead.md` — o brief de milestone com UI tem a seção "Cobertura do protótipo" (lista de
  telas × estados × resoluções). Card de UI cuja tela não está na lista é bloqueado e volta ao
  `design-engineer`.
- `design-engineer.md` — entrega inclui o índice de cobertura gerado do registro de telas (o
  `index.html` do M9 é o modelo).

**Como validar.** Brief do próximo milestone com UI traz a cobertura; nenhum card de UI começa com
tela fora dela.

---

## 1. Regra testável vira teste ou lint

**Problema.** Regras importantes vivem como prosa e dependem de o modelo lembrar. O `LEARNINGS.md`
do Norton tem bugs repetidos 2–3 vezes (consulta irmã com filtro diferente; `catch` que não pega
retorno `{ status: 'falhou' }`). As que viraram teste (cancelamento discreto, gabarito que não vaza)
não voltaram.

**Mudanças:**

- `tech-lead.md`, curadoria do fim de milestone — antes de promover uma lição a texto, perguntar
  **"dá para virar teste, lint ou script?"**. Se sim: card `junior`/`pleno` no milestone seguinte,
  e a regra só sai do `AGENTS.md` quando a guarda estiver verde. Regra que fica em texto diz por que
  não dá para automatizar.
- `.claude/profiles/web-nextjs.md` — catálogo de guardas prontas para começar: grep de hex/`rgb()` fora de
  tokens, lista de palavras proibidas na copy, teste estrutural de "nenhum payload público expõe
  campo X", regra de lint para `void promessa` em rota.
- `templates/LEARNINGS.md` — cada entrada ganha `→ guarda: <teste|lint|texto>`.

**Aplicação no Norton:** varredura única das regras de `AGENTS.md` de área e do `LEARNINGS.md`
(133 linhas) separando "automatizável" de "texto"; vira lista de cards de guarda.

**Como validar.** O `LEARNINGS.md` do Norton cai para ≤ 40 linhas e as regras automatizadas saem
dos `AGENTS.md` sem reaparecer como achado de revisão.

---

## 3. Modelo certo no lugar certo

**Problema.** O último filtro antes do PM (revisão consolidada) roda em Sonnet; cards `junior` rodam
em Haiku e vários bugs do Norton nasceram em cards "simples".

**Mudanças:**

- `code-reviewer.md` — continua Sonnet para checkpoint; `milestone.md` passo 3 aciona a revisão
  consolidada com `model: opus`.
- `tech-lead.md`, tabela de etiquetas — `junior` restrito a texto, estilo, conteúdo e renomeação
  sem lógica. Qualquer condicional, consulta, rota ou estado → `pleno` no mínimo.
- `dev-pleno.md` — `effort: high` para cards com checkpoint de risco (o orquestrador passa o nível).

**Como validar.** Contagem de achados 🔴 da revisão consolidada (frente 6) antes × depois.

---

## 4. Entendimento antes de codar

**Problema.** O erro mais caro é resolver o problema errado com código correto.

**Mudanças:**

- `dev-pleno.md`/`dev-junior.md` — passo 0 obrigatório, antes de editar qualquer arquivo: escrever
  no relatório de 3 a 5 linhas "vou mudar X; estou assumindo Y; o teste que prova é Z". Premissa
  que contradiz o card ou o brief → devolver o card ao Tech Lead.
- `dev-senior.md` — já tem plano aprovado; acrescentar "premissas" explícitas no plano.
- `templates/task-pack.md` — critério de aceite escrito como comportamento verificável
  ("dado/quando/então"), para o passo 0 ter onde ancorar.

**Como validar.** Cards devolvidos por premissa (frente 6) aparecem antes do código, não na revisão.

---

## 6. Medir a acurácia por milestone

**Problema.** "Acurácia melhorou" hoje é sensação.

**Mudanças:**

- `milestone.md` passo 6 — ao fechar, registrar em `docs/plan/milestones.md` do produto:
  achados 🔴/🟡 da revisão consolidada, cards devolvidos ao Tech Lead, correções após a primeira
  entrega, escaladas ao PM, reprovações na homologação e telas reprovadas por fidelidade ao protótipo.
- `templates/` — bloco "Métricas de acurácia" no modelo de milestone.
- Este arquivo — tabela "antes × depois" atualizada a cada milestone fechado do Norton.

**Como validar.** Dois milestones com métricas preenchidas; a tendência mostra se as frentes
funcionaram.

---

## 2. Hooks determinísticos no Claude Code

**Problema.** "Esqueci de rodar o teste" e "type-check verde mas não rodei" dependem de memória do
modelo; hook o harness executa sempre.

**Mudanças:**

- `templates/claude-settings.json` (novo, para o `.claude/settings.json` do produto, não o global):
  - `PostToolUse` em `Edit|Write`: lint + typecheck só do arquivo alterado, com limite de tempo
    curto; erro volta para o agente na hora.
  - `Stop`/`SubagentStop` para `dev-*`: bloqueia o "feito" se a suíte do card não rodou verde
    (marcador escrito pelo próprio comando de teste).
  - Guardas da frente 1 que forem rápidas (grep de hex, palavras proibidas) também entram aqui.
- `commands/new-product.md` — instala o template no produto novo.
- Medir o custo: se um hook passar de ~2 s por edição, sai do `PostToolUse` e vai para o `Stop`.

**Como validar.** Num card do Norton, um erro de tipo introduzido de propósito é devolvido ao agente
pelo hook antes do relatório.

---

## 7. Um escritor por área entre ferramentas

**Problema.** No Norton, Codex e vários agentes do Claude trabalharam em worktrees ao mesmo tempo em
áreas que se tocam. O método só proíbe paralelismo dentro da mesma esteira.

**Mudanças:**

- `global-claude.md` / `global-agents.md` — antes de começar a codar numa área, o agente registra no
  ai-memory "área X ocupada por <ferramenta/sessão> no card Y" e confere se já existe outro registro
  aberto; ao terminar, libera. Área ocupada → parar e avisar o PM.
- Definição de área = as pastas com `AGENTS.md` próprio (já existem desde o PR #3).
- `milestone.md` passo 2f — a mesma checagem antes de paralelizar cards.

**Como validar.** Uma semana de uso misto Claude + Codex no Norton sem conflito de merge entre
sessões na mesma área.
