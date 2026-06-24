# Maverick Solo Builder

Fábrica de software multi-agente para Claude Code: de briefings de negócio a software entregue, com
custo de tokens otimizado e qualidade consistente. Para quem tem ideias de produto mas não programa.

## Os 5 comandos (obrigatórios para todo trabalho de dev)
| Comando | Atividade |
|---|---|
| `/new-product <briefing>` | Criar um produto do zero |
| `/feature <descrição>` | Nova feature num produto existente |
| `/bug <relato>` | Corrigir um bug |
| `/design <briefing>` | Design system / protótipos |
| `/review <PR ou vazio>` | Revisar projeto / código / PR |

## Como funciona
Tech Lead (Opus) recebe o briefing -> cria cards no Linear com nível de complexidade -> o dev do nível
certo (Haiku/Sonnet/Opus) implementa um card por vez -> PR com evidência -> deploy nos trilhos.
**Gate híbrido:** `junior` roda sozinho; `pleno` e `senior` esperam sua aprovação.

## Instalação (uma vez)
```bash
# 1) Instalar o método globalmente (fica disponível em qualquer projeto)
cd ~/Desktop/Project/mavericksolobuilder && ./install.sh

# 2) Conectar o Linear (uma vez)
claude mcp add --transport http --scope user linear https://mcp.linear.app/mcp
# depois, numa sessão: /mcp -> linear -> autenticar (OAuth)
```
Após o `install.sh`, abra o Claude Code em QUALQUER pasta de projeto e os comandos já existem.

## Atualizar o método
Edite os arquivos deste repositório, rode `./install.sh` de novo e faça commit + push.

## Modelos por papel (otimização de custo)
| Papel | Modelo | Quando |
|---|---|---|
| Tech Lead | Opus 4.8 | Planejamento |
| Dev Júnior | Haiku 4.5 | Cards mecânicos |
| Dev Pleno | Sonnet 4.6 | Maioria das features/bugs |
| Dev Sênior | Opus 4.8 | Arquitetura e risco |
| Design Engineer | Sonnet 4.6 | Design system e protótipos |
| Code Reviewer | Sonnet 4.6 | Revisão de código/PR |
