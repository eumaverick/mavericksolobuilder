#!/usr/bin/env bash
# Hook SubagentStop (dev-junior|dev-pleno|dev-senior): bloqueia o "feito" se o card mudou código e a
# suíte não rodou verde depois da última edição. O marcador `.claude/.testes-verdes` é escrito pelo
# próprio comando de teste (ver marcar-testes-verdes.sh). Também roda o typecheck do projeto.
# Exit 2 devolve a mensagem ao dev, que corrige e tenta de novo. Não bloqueia em loop.
set -uo pipefail

entrada="$(cat)"
[ "$(printf '%s' "$entrada" | jq -r '.stop_hook_active // false')" = "true" ] && exit 0
raiz="${CLAUDE_PROJECT_DIR:-$PWD}"
cd "$raiz" || exit 0
git rev-parse --git-dir >/dev/null 2>&1 || exit 0

# Arquivos de código alterados e ainda não commitados.
alterados="$(git status --porcelain -uall | awk '{print $NF}' | grep -E '\.(ts|tsx|js|jsx|mjs|css|prisma|sql)$' | grep -vE '^(docs|\.claude)/' || true)"
[ -n "$alterados" ] || exit 0

marcador=".claude/.testes-verdes"
mtime() { stat -f %m "$1" 2>/dev/null || stat -c %Y "$1" 2>/dev/null || echo 0; }
mais_novo=0
while IFS= read -r f; do
  [ -f "$f" ] || continue
  t="$(mtime "$f")"
  [ "$t" -gt "$mais_novo" ] && mais_novo="$t"
done <<< "$alterados"

if [ ! -f "$marcador" ]; then
  echo "Bloqueado: você alterou código e a suíte do card não rodou verde (sem marcador). Rode o comando de teste do card e só então reporte 'feito'." >&2
  exit 2
fi
if [ "$(mtime "$marcador")" -lt "$mais_novo" ]; then
  echo "Bloqueado: há edição posterior ao último teste verde. Rode de novo o comando de teste do card antes de reportar 'feito'." >&2
  exit 2
fi

if [ -f tsconfig.json ]; then
  saida="$(pnpm exec tsc --noEmit --incremental --tsBuildInfoFile .claude/.tsbuildinfo 2>&1)" || {
    printf 'Bloqueado: typecheck falhou.\n%s\n' "$(printf '%s' "$saida" | head -20)" >&2
    exit 2
  }
fi
exit 0
