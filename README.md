# Maverick Solo Builder

Fábrica de software multi-agente para Claude Code: de briefings de negócio a software entregue, com
custo de tokens otimizado e qualidade consistente. Para quem tem ideias de produto mas não programa.

## Os comandos (obrigatórios para todo trabalho de dev)
| Comando | Atividade |
|---|---|
| `/new-product <briefing>` | Criar um produto do zero (esqueleto + GitHub + milestones + cards) |
| `/feature <descrição>` | Planejar uma feature (milestones + cards autossuficientes) |
| `/bug <relato>` | Triagem e correção de bug pela esteira |
| `/milestone [nome]` | **Executar a esteira**: todos os cards do milestone, em ordem, até a validação do PM |
| `/implement <card>` | Executar UM card pela esteira completa |
| `/design <briefing>` | Design system / protótipos navegáveis |
| `/review <PR ou vazio>` | Revisar projeto / código / PR |

## Como funciona (a esteira)

**Planejar:** o Tech Lead (Opus) recebe o briefing → fatia em **milestones testáveis pelo PM** →
cria cards locais em `docs/cards/`, cada um como **pacote de contexto autossuficiente** (arquivos
exatos, convenções, contratos), ordenados **backend antes de frontend**.

**Executar (por card, um de cada vez):** branch → dev do nível certo implementa (lendo SÓ o card +
LEARNINGS + arquivos listados) → testes verdes + evidência → PR → **code-reviewer aprova** →
squash-merge na main + `git push` → card Done em `docs/cards/` → próximo card.

**Validar (por milestone):** com UI → roteiro de teste passo a passo para o PM; sem UI → suíte de
testes de API com relatório **100%**. O Tech Lead cura o `docs/LEARNINGS.md` (memória evolutiva)
promovendo lições recorrentes ao `CLAUDE.md` do produto.

**Gate por milestone:** `junior` e `pleno` rodam automáticos; `senior` mostra o plano e espera
aprovação. O PM só é acionado na aprovação de planos `senior` e na validação de milestones.

**As 6 leis** (git/GitHub como fonte de verdade, esteira como máquina de estados, gate por
milestone, backend-first + handoff, contexto empacotado, memória evolutiva) estão em
[`global-claude.md`](global-claude.md) — instalado como `~/.claude/CLAUDE.md` e válido para todos
os agentes.

## Instalação (uma vez)
```bash
# Instalar o método globalmente (fica disponível em qualquer projeto)
cd ~/Desktop/Project/mavericksolobuilder && ./install.sh
```
Após o `install.sh`, abra o Claude Code em QUALQUER pasta de projeto e os comandos já existem.

## Atualizar o método
Edite os arquivos deste repositório, rode `./install.sh` de novo e faça commit + push.

## Modelos por papel (otimização de custo)
| Papel | Modelo | Quando |
|---|---|---|
| Tech Lead | Opus | Planejamento, pacotes de contexto, curadoria de aprendizados |
| Dev Júnior | Haiku | Cards mecânicos (automático) |
| Dev Pleno | Sonnet | Maioria das features/bugs (automático) |
| Dev Sênior | Opus | Arquitetura e risco (plano aprovado antes) |
| Design Engineer | Sonnet | Design system e protótipos |
| Code Reviewer | Sonnet | Portão automático de todo PR |

## Onde a economia de tokens acontece
- O Tech Lead lê o projeto UMA vez e empacota o contexto no card; os devs **não** exploram o repo.
- Cards fatiados para caber em `junior`/`pleno` (modelos baratos digitam, o caro pensa).
- O reviewer lê só o diff + card, não o projeto.
- `CLAUDE.md` do produto curto (≤ ~150 linhas); estratégia longa fica em `docs/` sob demanda.

## Templates
- `templates/CLAUDE.product.md` — memória viva do produto (git, milestones, DS, convenções)
- `templates/task-pack.md` — pacote de contexto (corpo de todo card local em `docs/cards/`)
- `templates/handoff-api.md` — contrato backend → frontend (`docs/handoffs/`)
- `templates/LEARNINGS.md` — memória evolutiva dos agentes (`docs/LEARNINGS.md`)
