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

mkdir -p coverage
npm run build && ./node_modules/.bin/istanbul cover --include-all-sources -x gulpfile.js node_modules/.bin/_mocha -- --timeout 15000 --recursive --reporter spec build/test/

node_modules/.bin/istanbul report html
node_modules/.bin/istanbul report text-summary > coverage/text-summary.txt

echo ""

npm run coverage-average
