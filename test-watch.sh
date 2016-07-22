#!/bin/bash

usage()
{
cat << EOF
usage: $0 options

This script runs tests and watch for changes

OPTIONS:
   -d      debug string (defaults to "") use "*" to output verbose debug information
EOF
}

DEBUG=
while getopts "d:" OPTION
do
     case $OPTION in
         d)
             DEBUG=$OPTARG
             ;;
         ?)
             usage
             exit
             ;;
     esac
done

export NODE_ENV="development"
export BASE_URL="https://66xix.com"

export DEBUG=$DEBUG

export EMAIL_HOST="localhost"
export EMAIL_PASSWORD="email password"
export EMAIL_USERNAME="email username"
export EMAIL_PORT=1231
export EMAIL_FROM="support@66pix.com"

COVERAGE_DIR=coverage/raw
REMAP_DIR=coverage/typescript

mkdir -p $COVERAGE_DIR
mkdir -p $REMAP_DIR

echo "Running tests"
nodemon -e ts \
  -x "npm run build && node_modules/.bin/istanbul cover --dir $COVERAGE_DIR node_modules/.bin/_mocha -- --timeout 15000 --recursive --reporter spec build/test/"

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
