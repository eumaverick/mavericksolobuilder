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
   testes verdes → evidência → PR → revisão automática → merge + push → card Done no Linear →
   próximo card. **Um card por vez, na ordem do milestone.** PRs nunca se acumulam esperando lote.
3. **Gate por milestone.** Cards `junior` e `pleno` rodam automáticos; `senior` mostra o plano e
   espera aprovação antes de codar. O PM (usuário) valida no FIM de cada milestone: pela UI com um
   roteiro de teste, ou — se não houver UI — pelo relatório da suíte de testes de API com **100%**
   de aprovação.
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
  trabalho em **milestones testáveis pelo PM** e cria cards no Linear com pacote de contexto,
  critérios de aceite e etiqueta de complexidade (`junior`/`pleno`/`senior`) **antes** de codar.
- **Design system é lei.** A seção **Design System** do `CLAUDE.md` do produto aponta tokens e
  componentes; toda UI consome só de lá. Cor/espaçamento hardcoded reprova na revisão.
- **Todo PR carrega testes e evidência** (screenshot ou saída de teste). Segredos nunca vão ao git.
- **Gaste o modelo caro pensando, o barato digitando.** Specs boas reduzem retrabalho e tokens.

Agentes em `~/.claude/agents/`, perfis de stack em `~/.claude/profiles/`, templates em
`~/.claude/templates/`. Para produtos regulados (saúde, financeiro): segurança e auditoria por
padrão, nada de PII/CPF em log ou URL, integrações reguladas atrás de adapter; decisões
clínicas/jurídicas são humanas — sinalize em vez de assumir.
