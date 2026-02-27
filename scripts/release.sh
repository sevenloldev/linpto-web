#!/bin/bash
# Release a tagged candidate to production by merging into main.
# Usage: ./scripts/release.sh <tag>
# Example: ./scripts/release.sh v0.2.0

set -e

TAG=$1

if [ -z "$TAG" ]; then
  echo "❌ Usage: ./scripts/release.sh <tag>"
  echo "   Example: ./scripts/release.sh v0.2.0"
  exit 1
fi

# Verify the tag exists
if ! git rev-parse "$TAG" >/dev/null 2>&1; then
  echo "❌ Tag $TAG not found. Create it first with ./scripts/create-rc.sh"
  exit 1
fi

echo "🚀 Releasing $TAG to production (main)..."

git fetch origin

# Checkout main and merge the tagged commit
git checkout main
git pull origin main
git merge "$TAG" --no-ff -m "Release $TAG to production"
git push origin main

echo ""
echo "✅ Released $TAG to production:"
echo "   Branch: main"
echo "   Tag:    $TAG"
echo "   Cloudflare will auto-deploy from main."
