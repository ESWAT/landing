#!/bin/sh

set -e

branch=$1

echo "--> updating to branch '$branch'"
git fetch
git reset --hard origin/$branch

echo "--> building"
grunt build