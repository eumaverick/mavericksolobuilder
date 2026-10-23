#!/usr/bin/env bash
# Instala o método Maverick Solo Builder globalmente em ~/.claude (via symlinks).
# Assim TODO projeto, em qualquer pasta, já tem o fluxo disponível.
# Reexecute após atualizar o repositório para repropagar (symlinks já apontam para a fonte).
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="$HOME/.claude"
mkdir -p "$DEST/agents" "$DEST/commands" "$DEST/profiles" "$DEST/templates"

link_dir() {
  local src="$1" dst="$2"
  [ -d "$src" ] || return 0
  for f in "$src"/*; do
    [ -e "$f" ] || continue
    ln -sfn "$f" "$dst/$(basename "$f")"
  done
}

link_dir "$REPO/.claude/agents"   "$DEST/agents"
link_dir "$REPO/.claude/commands" "$DEST/commands"
link_dir "$REPO/.claude/profiles" "$DEST/profiles"
link_dir "$REPO/templates"        "$DEST/templates"

# Regra global obrigatória (CLAUDE.md). Não sobrescreve um arquivo real já existente.
if [ -L "$DEST/CLAUDE.md" ] || [ ! -e "$DEST/CLAUDE.md" ]; then
  ln -sfn "$REPO/global-claude.md" "$DEST/CLAUDE.md"
  echo "  ok ~/.claude/CLAUDE.md -> global-claude.md"
else
  echo "  aviso: ~/.claude/CLAUDE.md ja existe como arquivo real — copie o conteudo de global-claude.md manualmente"
fi

# Codex: ~/.codex/AGENTS.md recebe um bloco marcado (preâmbulo do Codex + regras globais).
# O Codex não segue @import nem symlink de pasta, então o bloco é regerado a cada execução;
# conteúdo fora dos marcadores (ex.: bloco do ai-memory) é preservado.
CODEX_AGENTS="$HOME/.codex/AGENTS.md"
if [ -d "$HOME/.codex" ]; then
  BEGIN="<!-- BEGIN:maverick-solo-builder -->"
  END="<!-- END:maverick-solo-builder -->"
  tmp="$(mktemp)"
  if [ -f "$CODEX_AGENTS" ]; then
    sed "/^$BEGIN\$/,/^$END\$/d" "$CODEX_AGENTS" > "$tmp"
  fi
  {
    echo "$BEGIN"
    cat "$REPO/global-agents.md"
    echo
    cat "$REPO/global-claude.md"
    echo "$END"
    cat "$tmp"
  } > "$CODEX_AGENTS"
  rm -f "$tmp"
  echo "  ok ~/.codex/AGENTS.md (bloco maverick-solo-builder regerado)"
fi

echo "OK Maverick Solo Builder instalado globalmente em $DEST"
echo "   Agentes: $(ls -1 "$DEST/agents" | wc -l | tr -d ' ')  Comandos: $(ls -1 "$DEST/commands" | wc -l | tr -d ' ')  Perfis: $(ls -1 "$DEST/profiles" | wc -l | tr -d ' ')"
