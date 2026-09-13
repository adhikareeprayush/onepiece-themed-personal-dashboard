#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/dist"
mkdir -p "$OUT"
ZIP="$OUT/grand-line-tools-extension.zip"
rm -f "$ZIP"
(
  cd "$ROOT/extension"
  zip -r "$ZIP" . \
    -x '*.md' \
    -x '*~' \
    -x '*.DS_Store'
)
echo "Packed extension → $ZIP"
echo "Default API: https://onepiece.prayushadhikari.com.np"
