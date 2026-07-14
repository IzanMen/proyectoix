#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

API_PORT="${API_PORT:-5000}"
WEB_PORT="${WEB_PORT:-5173}"

port_is_listening() {
  local port="$1"

  if command -v ss >/dev/null 2>&1; then
    ss -ltn "sport = :${port}" | tail -n +2 | grep -q .
    return
  fi

  if command -v lsof >/dev/null 2>&1; then
    lsof -iTCP:"${port}" -sTCP:LISTEN >/dev/null 2>&1
    return
  fi

  return 1
}

if port_is_listening "$API_PORT" && port_is_listening "$WEB_PORT"; then
  echo "Server already running:"
  echo "  Web: http://localhost:${WEB_PORT}/"
  echo "  API: http://localhost:${API_PORT}/api/healthz"
  exit 0
fi

if [[ -s "$ROOT_DIR/.nvmrc" && -s "$HOME/.nvm/nvm.sh" ]]; then
  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  # shellcheck source=/dev/null
  source "$NVM_DIR/nvm.sh" --no-use
  node_version="$(tr -d '[:space:]' < "$ROOT_DIR/.nvmrc")"
  nvm use --silent "$node_version"
fi

exec pnpm run dev:local
