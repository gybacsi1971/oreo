#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [ "${1:-}" = "--setup" ]; then
  echo "Teljes telepítés + build..."
  npm install --legacy-peer-deps
  npm run setup
fi

echo "Futó Bruno processzek leállítása..."
pkill -f "bruno-electron" 2>/dev/null && echo "  Electron leállítva." || echo "  Nem futott Electron."
pkill -f "rsbuild" 2>/dev/null && echo "  RSBuild leállítva." || echo "  Nem futott RSBuild."

sleep 1

echo "Bruno dev környezet indítása (port: 3005)..."
PORT=3005 npm run dev
