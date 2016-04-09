#!/bin/bash

set -o nounset
set -o errexit

mkdir -p coverage
npm run build && ./node_modules/.bin/istanbul cover --include-all-sources -x gulpfile.js node_modules/.bin/_mocha -- --timeout 15000 --recursive --reporter spec test/

node_modules/.bin/istanbul report html
node_modules/.bin/istanbul report text-summary > coverage/text-summary.txt

echo "\n"

npm run coverage-average
