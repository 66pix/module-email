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

mkdir -p coverage
nodemon -e ts \
  -x 'npm run build && ./node_modules/.bin/istanbul cover --include-all-sources -x gulpfile.js node_modules/.bin/_mocha -- --timeout 15000 --recursive --reporter spec build/test/'

node_modules/.bin/istanbul report html
node_modules/.bin/istanbul report text-summary > coverage/text-summary.txt

echo "\n"

npm run coverage-average

