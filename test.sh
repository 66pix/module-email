#!/bin/bash

set -o nounset
set -o errexit

export NODE_ENV="development"
export EMAIL_HOST="localhost"
export EMAIL_PASSWORD="email password"
export EMAIL_USERNAME="email username"
export EMAIL_PORT=1231
export EMAIL_FROM="testing@66pix.com"
export BASE_URL="https://66pix.com"

COVERAGE_DIR=coverage/raw
REMAP_DIR=coverage/typescript

mkdir -p $COVERAGE_DIR
mkdir -p $REMAP_DIR

echo "Running tests"
npm run build && node_modules/.bin/istanbul cover --dir $COVERAGE_DIR node_modules/.bin/_mocha -- --timeout 15000 --recursive --reporter spec build/test/

echo ""
echo "Remapping coverage reports for typescript"
node_modules/.bin/remap-istanbul -i $COVERAGE_DIR/coverage.json -o $REMAP_DIR -t html
node_modules/.bin/remap-istanbul -i $COVERAGE_DIR/coverage.json -o $REMAP_DIR/coverage.json -t json

echo ""
echo "Coverage report located at $REMAP_DIR/index.html"

COVERAGE_AVERAGE=90
echo ""
echo "Enforcing coverage average of $COVERAGE_AVERAGE for $REMAP_DIR/coverage.json"
echo ""
node_modules/.bin/istanbul check-coverage \
  --statements $COVERAGE_AVERAGE \
  --functions $COVERAGE_AVERAGE \
  --branches $COVERAGE_AVERAGE \
  --lines $COVERAGE_AVERAGE \
  $REMAP_DIR/coverage.json
