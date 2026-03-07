#!/bin/bash
set -e

echo "=== Oreo macOS arm64 build ==="

# 1. Web frontend build
echo "[1/4] Building web frontend..."
npm run build:web

# 2. Clean previous electron build
echo "[2/4] Cleaning previous build..."
rm -rf packages/bruno-electron/out
rm -rf packages/bruno-electron/web
mkdir packages/bruno-electron/web

# 3. Copy & patch web build for electron
echo "[3/4] Preparing web files for Electron..."
cp -r packages/bruno-app/dist/* packages/bruno-electron/web
sed -i'' -e 's@/static/@static/@g' packages/bruno-electron/web/**.html
sed -i'' -e 's@/static/font@../../static/font@g' packages/bruno-electron/web/static/css/**.**.css
find packages/bruno-electron/web -name '*.map' -type f -delete

# 4. Build Electron arm64 for macOS (unsigned)
echo "[4/4] Building Electron app (arm64, unsigned)..."
CSC_IDENTITY_AUTO_DISCOVERY=false npm run dist:mac --workspace=packages/bruno-electron -- --arm64

echo ""
echo "=== Build complete ==="
echo "Output: packages/bruno-electron/out/"
ls -lh packages/bruno-electron/out/*.dmg packages/bruno-electron/out/*.zip 2>/dev/null || ls -lh packages/bruno-electron/out/
