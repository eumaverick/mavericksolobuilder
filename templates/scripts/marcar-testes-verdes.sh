#!/usr/bin/env bash
# Escreve o marcador que o hook-parar-dev.sh confere. Encadeie DEPOIS do comando de teste, só em
# caso de sucesso, no script de teste do card do produto, por exemplo em package.json:
#   "test:card": "vitest run && bash \"$HOME/.claude/templates/scripts/marcar-testes-verdes.sh\""
# Se o teste falhar, o `&&` impede a criação e o hook continua bloqueando o "feito".
set -euo pipefail
raiz="${CLAUDE_PROJECT_DIR:-$PWD}"
mkdir -p "$raiz/.claude"
touch "$raiz/.claude/.testes-verdes"
