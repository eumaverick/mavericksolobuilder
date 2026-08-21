# Gate obrigatório — agentes exploratórios/exploradores

**Proibido disparar agentes exploratórios/exploradores** (ex.: `Explore`, `general-purpose` usado
pra vasculhar código, `caveman:cavecrew-investigator`, ou qualquer subagente cujo papel seja
explorar/investigar repositório) **em qualquer fluxo, pipeline ou sessão — regular ou não.** Vale
pra TODOS os agentes/subagentes, sem exceção, mesmo dentro dos comandos do Maverick Solo Builder
(`/new-product`, `/feature`, `/bug`, `/milestone`, `/implement`, `/design`, `/review`) e mesmo na
Fase 1 (Exploração) do Plan Mode.

Antes de qualquer disparo desse tipo: perguntar ao usuário exatamente **"DESEJA INICIAR AGENTES
EXPLORADORES?"** e só prosseguir se a resposta for **"SIM"**. Sem essa confirmação explícita,
investigar sozinho com Read/Grep/Glob diretos em vez de delegar a um agente explorador.

# Regra de trabalho global — Maverick Solo Builder

> Este arquivo é instalado como `~/.claude/CLAUDE.md` e carregado em toda sessão do Claude Code.
> Método versionado em https://github.com/eumaverick/mavericksolobuilder

**Regra obrigatória:** todo trabalho de desenvolvimento de software deve passar pelo fluxo do
**Maverick Solo Builder**. Use o comando correspondente à atividade — não improvise um fluxo paralelo:

| Atividade | Comando |
|---|---|
| Novo projeto / produto / software | `/new-product` |
| Nova feature | `/feature` |
| Correção de bug | `/bug` |
| Executar a esteira (todos os cards do milestone) | `/milestone` |
| Implementar um card específico | `/implement` |
| Criação de design system / protótipo | `/design` |
| Revisão de projeto / código / PR | `/review` |

## As 6 leis do método (valem para TODOS os agentes, sem exceção)

1. **GitHub é a fonte de verdade; o repositório local é a oficina.** Todo trabalho acontece no
   clone local. Antes de qualquer card: `git checkout main && git pull`. Todo card termina com
   merge na main + `git push`. Nunca edite nada pela interface web do GitHub. Se local e GitHub
   divergirem, o GitHub ganha. Documentação do produto vive no repositório do produto.
2. **A esteira é uma máquina de estados — sem passos inventados.** Card → branch → implementar →
   self-review do próprio dev (critérios de aceite, testes, escopo) → testes unitários/de
   integração do escopo do card → evidência → PR → **code-review por card** (sempre, nunca só no
   fim do milestone) → merge + push → card Done → próximo card. **Um card por vez, na ordem do
   milestone.** PRs nunca se acumulam esperando lote. **E2E completo roda no fim do milestone**,
   não por card — exceto quando o card mexe em fluxo crítico (auth, pagamento, integração
   externa) ou risco alto de regressão, caso em que roda E2E imediatamente nesse card.
3. **Gate por milestone e escalonamento sem cascata automática.** Cards `junior` (Haiku) e `pleno`
   (Sonnet) rodam automáticos; `senior` (Opus) mostra o plano e espera aprovação antes de codar.
   **Se um card falhar** (testes não passam, self-review reprova, ou review pede retrabalho): o
   mesmo dev tenta corrigir **uma vez, no mesmo nível**, com o erro em mãos — sem reconstruir
   contexto do zero. **Se falhar de novo, PARE e pergunte ao PM** se escala para o nível acima
   (não escale sozinho em cascata Haiku→Sonnet→Opus). O PM (usuário) valida no FIM de cada
   milestone: pela UI com um roteiro de teste, ou — se não houver UI — pelo relatório da suíte de
   testes de API com **100%** de aprovação.
4. **Backend primeiro, frontend depois.** Todo card de backend cujo resultado será consumido por
   uma tela termina com um handoff escrito em `docs/handoffs/` (endpoints, payloads, erros,
   exemplos). O card de frontend correspondente só começa com esse handoff pronto.
5. **Contexto empacotado, não explorado.** O Tech Lead escreve cada card como um pacote
   autossuficiente (arquivos exatos, convenções relevantes, contratos, comandos). O dev lê o
   pacote, o `docs/LEARNINGS.md` e os arquivos listados — **não** o repositório inteiro. Pacote
   insuficiente = devolver o card ao Tech Lead com a dúvida, não sair explorando.
6. **Memória evolutiva.** Todo produto tem `docs/LEARNINGS.md`. O dev lê antes de codar e registra
   1–3 linhas ao terminar (só lição não óbvia). O Tech Lead cura o arquivo a cada fim de
   milestone: promove lições recorrentes às Convenções do `CLAUDE.md` do produto e apaga o que
   promoveu.

## Princípios inegociáveis

- **Planejamento primeiro.** O Tech Lead (Opus) recebe o briefing, esclarece dúvidas, agrupa o
  trabalho em **milestones testáveis pelo PM** e cria cards em `docs/cards/` com pacote de
  contexto, critérios de aceite e etiqueta de complexidade (`junior`/`pleno`/`senior`) **antes**
  de codar.
- **Cards são locais, sempre.** Fonte de verdade é `docs/cards/` + `docs/plan/milestones.md`,
  versionados no repositório do produto — sem tracker externo, sem custo de MCP por card.
- **Design system é lei.** A seção **Design System** do `CLAUDE.md` do produto aponta tokens e
  componentes; toda UI consome só de lá. Cor/espaçamento hardcoded reprova na revisão.
- **Todo PR carrega testes e evidência** (screenshot ou saída de teste). Segredos nunca vão ao git.
- **Gaste o modelo caro pensando, o barato digitando.** Specs boas reduzem retrabalho e tokens.
- **Se o modo caveman estiver ativo na sessão do PM, propague-o.** Ao acionar qualquer subagente
  (`tech-lead`, `dev-junior`, `dev-pleno`, `dev-senior`, `code-reviewer`, `design-engineer`),
  instrua explicitamente o modo/nível caveman ativo — ele não herda sozinho. PRs, commits e docs
  do produto continuam em prosa normal (persistidos, lidos por humanos); só a comunicação
  orquestrador↔subagente↔PM se comprime.
- **`/code-review ultra` só para mudança sensível** (auth, pagamento, dado clínico, migração).
  É revisão multi-agente na nuvem, cara — nunca padrão para PR comum.

Agentes em `~/.claude/agents/`, perfis de stack em `~/.claude/profiles/`, templates em
`~/.claude/templates/`. Para produtos regulados (saúde, financeiro): segurança e auditoria por
padrão, nada de PII/CPF em log ou URL, integrações reguladas atrás de adapter; decisões
clínicas/jurídicas são humanas — sinalize em vez de assumir.
