# DevFlow Starter

Fábrica de software multi-agente para Claude Code: de briefings de negócio a software entregue, com custo de tokens otimizado e qualidade de código consistente.

## Para quem é
Para quem tem ideias de produto mas não programa. Você escreve briefings; agentes especializados planejam, implementam e verificam.

## Os 4 comandos
| Comando | O que faz |
|---|---|
| `/new-product <briefing>` | Cria um produto do zero |
| `/feature <descrição>` | Nova feature num produto existente |
| `/bug <relato>` | Corrige um bug |
| `/design <briefing>` | Design system / protótipos |

## Como funciona
Tech Lead (Opus) recebe o briefing → cria cards no Linear com nível de complexidade → o desenvolvedor do nível certo (Haiku/Sonnet/Opus) implementa um card por vez → PR com evidência visual → deploy nos trilhos.

**Gate híbrido:** cards simples (`junior`) rodam sozinhos; `pleno` e `senior` esperam sua aprovação.

## Setup do Linear (uma vez só)
```
claude mcp add --transport http --scope user linear https://mcp.linear.app/mcp
```
Depois, numa sessão do Claude Code, rode `/mcp` e autentique no Linear (OAuth pelo navegador).

## Começar um produto
Abra esta pasta no Claude Code e rode, por exemplo:
```
/new-product Um app web para registrar e acompanhar hábitos diários, com lembretes.
```

## Modelos por papel (otimização de custo)
| Papel | Modelo | Quando |
|---|---|---|
| Tech Lead | Opus 4.8 | Planejamento (alta alavancagem, baixo volume) |
| Dev Júnior | Haiku 4.5 | Cards mecânicos/simples |
| Dev Pleno | Sonnet 4.6 | Maioria das features e bugs |
| Dev Sênior | Opus 4.8 | Arquitetura e risco |
| Design Engineer | Sonnet 4.6 | Design system e protótipos |
