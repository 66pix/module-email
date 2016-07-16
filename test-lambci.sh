#!/bin/bash

set -o nounset
set -o errexit

npm install --silent

npm run nsp
npm run lint
npm run typings-install
npm run build

npm run test
