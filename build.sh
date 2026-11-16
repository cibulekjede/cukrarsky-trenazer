#!/bin/sh
# Sestaví aplikaci ze zdrojů v src/
cd "$(dirname "$0")"
mkdir -p dist
{ cat src/page.html; printf '<script>\n'; cat src/data.js; printf '\n'; cat src/app.js; printf '</script>\n'; } > dist/trenazer.html
{ printf '<!doctype html>\n<html lang="cs"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>\n'; cat dist/trenazer.html; printf '</body></html>\n'; } > index.html
echo ok
