#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NODE_VERSION="$(tr -d '[:space:]' < "$ROOT_DIR/.nvmrc")"

if [[ $# -eq 0 ]]; then
  echo "Usage: $0 <command> [args...]" >&2
  exit 64
fi

if command -v node >/dev/null 2>&1; then
  CURRENT_VERSION="$(node -v | sed 's/^v//')"
  if [[ "$CURRENT_VERSION" == "$NODE_VERSION" ]]; then
    exec "$@"
  fi
fi

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [[ -s "$NVM_DIR/nvm.sh" ]]; then
  # shellcheck source=/dev/null
  source "$NVM_DIR/nvm.sh" --no-use
  if ! nvm use --silent "$NODE_VERSION" >/dev/null; then
    nvm install "$NODE_VERSION" >/dev/null
    nvm use --silent "$NODE_VERSION" >/dev/null
  fi
  exec "$@"
fi

NVM_NODE_BIN="$HOME/.nvm/versions/node/v${NODE_VERSION}/bin"
if [[ -x "$NVM_NODE_BIN/node" ]]; then
  export PATH="$NVM_NODE_BIN:$PATH"
  exec "$@"
fi

echo "Node $NODE_VERSION is required. Install it with: nvm install $NODE_VERSION" >&2
exit 1
