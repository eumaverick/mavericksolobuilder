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
| Criação de design system / protótipo | `/design` |
| Revisão de projeto / código / PR | `/review` |

## Princípios inegociáveis

- **Planejamento primeiro.** O Tech Lead (Opus) recebe o briefing, esclarece dúvidas e cria cards no
  Linear com critérios de aceite + etiqueta de complexidade (`junior`/`pleno`/`senior`) **antes** de codar.
- **Gate híbrido por complexidade.** `junior` (Haiku) roda automático; `pleno` (Sonnet) e `senior`
  (Opus) exigem aprovação do PM; `senior` mostra o plano antes.
- **Um card por vez**, com testes e **evidência** (screenshot/teste) no PR. Segredos nunca vão ao git.
- **Gaste o modelo caro pensando, o barato digitando.** Specs boas reduzem retrabalho e tokens.

Agentes em `~/.claude/agents/`, perfis de stack em `~/.claude/profiles/`, template de produto em
`~/.claude/templates/`. Para produtos regulados (saúde, financeiro): segurança e auditoria por padrão,
nada de PII/CPF em log ou URL, integrações reguladas atrás de adapter; decisões clínicas/jurídicas são
humanas — sinalize em vez de assumir.
