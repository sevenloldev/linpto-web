#!/bin/bash
# Create a release candidate by merging dev HEAD into preprod and tagging with a new version.
# Usage: ./scripts/create-rc.sh <version>
# Example: ./scripts/create-rc.sh 0.2.0

set -e

VERSION=$1

if [ -z "$VERSION" ]; then
  echo "❌ Usage: ./scripts/create-rc.sh <version>"
  echo "   Example: ./scripts/create-rc.sh 0.2.0"
  exit 1
fi

TAG="v${VERSION}"

# Check if tag already exists
if git rev-parse "$TAG" >/dev/null 2>&1; then
  echo "❌ Tag $TAG already exists. Choose a different version."
  exit 1
fi

echo "🚀 Creating release candidate $TAG from dev..."

# Ensure we have the latest
git fetch origin

# Create or reset preprod branch from dev HEAD
git checkout dev
git pull origin dev
git checkout -B preprod
git push origin preprod --force

# Tag the release candidate
git tag -a "$TAG" -m "Release candidate $TAG"
git push origin "$TAG"

echo ""
echo "✅ Release candidate created:"
echo "   Branch: preprod (from dev HEAD)"
echo "   Tag:    $TAG"
echo "   Next:   ./scripts/release.sh $TAG"
