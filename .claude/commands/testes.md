---
description: Executa o roteiro de validação de um milestone no lugar do PM — roda os testes, relata o que passou e o que falhou, corrige a causa raiz e repete até fechar 100% ponta a ponta.
argument-hint: <id do milestone, ex: M6A, ou vazio para o milestone pendente de validação>
---

Execute a validação do milestone: $ARGUMENTS
(se vazio, descubra o milestone pendente de validação lendo a tabela de milestones do `CLAUDE.md`
do produto e `docs/plan/milestones.md` — o pendente é o que tem código entregue e homologação em
aberto; se houver mais de um, PERGUNTE ao PM qual antes de gastar tempo.)

Você é o **PM substituto**: o dono do produto não tem tempo de homologar e delegou o roteiro a
você. O objetivo não é "rodar teste", é **responder se o milestone está entregue de verdade** — e,
quando não estiver, consertar e provar de novo.

## 1. Descubra o que existe antes de prometer qualquer coisa

Nunca presuma que há código. Antes de tudo:

- Leia os status dos cards em `docs/cards/<milestone>.md`. Card `[ ] A fazer` não tem o que testar.
- Confirme no código: `grep` pelos símbolos/arquivos que o milestone deveria ter criado. Card
  marcado como feito e símbolo ausente é achado, não detalhe.
- Rode a suíte para ter o **baseline** antes de mexer em qualquer coisa (`pnpm test:api`,
  `pnpm test`, `pnpm lint`, `pnpm typecheck` — o que o brief pedir).

**Se faltar implementação para o roteiro rodar ponta a ponta, PARE e diga isso ao PM**, com o
diagnóstico (quais cards faltam, o que dá e o que não dá para provar hoje). Não invente que testou.
Só siga para implementar se o PM autorizar explicitamente — aí o caminho é `/milestone`, não este.

## 2. Ache — ou monte — o roteiro

O roteiro canônico é a seção **"Como o PM valida"** do `docs/plan/<milestone>-brief.md`, com o
resumo em linguagem de negócio na tabela de milestones do `CLAUDE.md`.

**Se não existir roteiro escrito, monte um** a partir dos critérios de aceite dos cards e da coluna
"Como o PM valida" da tabela, e **mostre o roteiro ao PM antes de executar** — ele precisa
reconhecer o que está sendo validado em nome dele. Roteiro montado por você vira arquivo no brief
do milestone, para a próxima validação não recomeçar do zero.

Todo roteiro tem que ter, por passo: **o que fazer**, **o que tem que acontecer** e **como se prova**.
Passo sem critério observável não é passo — é intenção.

## 3. Execute, passo a passo, sem pular

- **Parte automática:** rode os comandos do brief. Guarde a saída real; ela é a evidência.
- **Parte manual (milestone com UI):** use o preview da Vercel da branch `milestone/*`. Sem preview
  publicado, publique a branch primeiro. Navegue de verdade pelas telas com as ferramentas de
  browser, nos dois temas e em viewport de celular quando o brief pedir.
- **Nunca marque um passo como "passou" sem a evidência correspondente.** Suíte verde não prova
  I/O de plataforma (e-mail real, disco, credencial de provedor, variável de ambiente): milestone
  que toca isso exige pelo menos um teste manual no preview real — é regra do `CLAUDE.md` e já
  pegou falha que a suíte inteira não via.
- Anote o que aconteceu em cada passo enquanto executa, não no fim de memória.

## 4. Separe falha real de ruído conhecido

Antes de chamar qualquer vermelho de bug:

- Confira `docs/plan/pendencias.md` e `docs/LEARNINGS.md` — flake conhecido, limitação externa
  documentada (ex.: sandbox de provedor que não completa um fluxo) e decisão de escopo adiada
  **não são falha do milestone**; entram no relatório como ruído identificado, com o link do
  registro.
- Falha que só aparece sob suíte paralela e passa isolada é ambiente, não produção — prove rodando
  isolada antes de afirmar.

## 5. Relatório ao PM

Texto direto, sem enfeite, nesta ordem:

1. **O que foi testado** — milestone, roteiro usado, o que estava disponível para testar.
2. **Passo a passo executado**, com o resultado de cada passo: ✅ passou / ❌ falhou / ⚠️ ruído
   conhecido (com a referência).
3. **O que deu errado**, e para cada item: **causa raiz** (não sintoma), arquivo e linha.
4. **O que foi corrigido** e a prova de que a correção funciona.
5. **O que continua aberto** e por quê — inclusive o que depende de decisão do PM.

## 6. Corrija a causa raiz e reexecute até fechar

Para cada falha real:

- **Entenda a causa antes de mexer.** Sintoma corrigido sem causa volta no próximo milestone.
- Corrija — direto, se for pequeno e claro; acionando `dev-pleno`/`dev-senior` conforme o risco, se
  for maior. Toque schema/migração, auth, pagamento, PII/dado regulado ou integração externa
  **exige** `code-reviewer` antes de fechar.
- **Nunca afrouxe o teste para ele passar.** Se o teste está errado, o achado é "o teste estava
  errado" e isso vai no relatório com a justificativa. Apagar asserção incômoda é fraude de
  evidência.
- **Reexecute o roteiro inteiro** (não só o passo que falhou) depois de corrigir — correção
  costuma quebrar vizinho. Repita até o roteiro passar ponta a ponta.
- Duas rodadas sem convergir no mesmo ponto → PARE e escale ao PM com o diagnóstico.

## 7. Feche

- Registre no card/brief o que foi validado, com data e evidência.
- Achado que não vira correção agora vira item em `docs/plan/pendencias.md`, com o que ele bloqueia
  explícito — é a regra do produto, não basta contar no relatório.
- Commit local na branch do milestone. **Não faça merge nem deploy**: aprovação funcional continua
  sendo do PM humano, mesmo com o roteiro 100% verde.
- Diga ao PM, em uma linha, qual é o próximo passo dele.

> **Caveman:** se o modo caveman estiver ativo nesta sessão, inclua no prompt de CADA subagente
> acionado (`dev-*`, `code-reviewer`, `tech-lead`): "modo caveman ativo: <nível> — comprima só o relatório final; raciocine, escreva código, docs e commits normalmente." Ele não herda sozinho (lei do `~/.claude/CLAUDE.md`).
> Relatório, cards, commits e docs continuam em prosa normal — são lidos por humanos e persistem.
