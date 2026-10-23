#!/usr/bin/env bash
# Hook PostToolUse (Edit|Write): guardas rápidas só do arquivo alterado. Erro volta ao agente (exit 2).
# Lê o JSON do hook no stdin. Typecheck pesado NÃO roda aqui por padrão (fica no hook-parar-dev.sh);
# HOOK_TYPECHECK=1 liga o typecheck incremental também aqui.
# Custo: cada execução registra o tempo em .claude/hooks-tempo.log; se passar de ~2 s por edição,
# tire a guarda daqui e deixe só no hook-parar-dev.sh.
set -uo pipefail

entrada="$(cat)"
arquivo="$(printf '%s' "$entrada" | jq -r '.tool_input.file_path // empty')"
[ -n "$arquivo" ] || exit 0
raiz="${CLAUDE_PROJECT_DIR:-$PWD}"
cd "$raiz" || exit 0
[ -f "$arquivo" ] || exit 0

case "$arquivo" in
  */node_modules/*|*/build/*|*/.next/*|*/dist/*|*/docs/*|*.md|*.json) exit 0 ;;
  *.ts|*.tsx|*.js|*.jsx|*.mjs|*.css) ;;
  *) exit 0 ;;
esac

inicio=$(date +%s)
erros=""

# Guarda 1: cor hardcoded fora dos tokens (UI). Tokens e build ficam em design/.
case "$arquivo" in
  */design/*) ;;
  *.tsx|*.jsx|*.css)
    achados="$(grep -nE '#[0-9a-fA-F]{3,8}\b|rgba?\(' "$arquivo" 2>/dev/null | head -5 || true)"
    [ -n "$achados" ] && erros="${erros}Cor hardcoded fora dos tokens em $arquivo (use os tokens do Design System):\n${achados}\n"
    ;;
esac

# Guarda 2: lint só do arquivo (se o projeto tem ESLint).
case "$arquivo" in
  *.ts|*.tsx|*.js|*.jsx|*.mjs)
    if [ -f package.json ] && grep -q '"eslint"' package.json 2>/dev/null; then
      saida="$(pnpm exec eslint --no-warn-ignored "$arquivo" 2>&1)" || erros="${erros}ESLint em $arquivo:\n${saida}\n"
    fi
    ;;
esac

# Guarda 3 (opcional): typecheck incremental do projeto.
if [ "${HOOK_TYPECHECK:-0}" = "1" ] && [ -f tsconfig.json ]; then
  saida="$(pnpm exec tsc --noEmit --incremental --tsBuildInfoFile .claude/.tsbuildinfo 2>&1)" || erros="${erros}Typecheck:\n$(printf '%s' "$saida" | head -20)\n"
fi

mkdir -p .claude
printf '%s %ss %s\n' "$(date +%FT%T)" "$(( $(date +%s) - inicio ))" "$arquivo" >> .claude/hooks-tempo.log

if [ -n "$erros" ]; then
  printf '%b' "$erros" >&2
  exit 2
fi
exit 0
