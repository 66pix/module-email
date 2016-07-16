#!/bin/bash

set -o nounset
set -o errexit

echo "Building"

ls -lh

npm install --silent

echo "NSP"

npm run nsp
echo "Lint"
npm run lint
echo "typings install"
npm run typings-install
echo "build"
npm run build

echo "test"
npm run test
