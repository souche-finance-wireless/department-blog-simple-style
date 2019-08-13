#!/usr/bin/env sh

set -e
npm run docs:build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/souche-finance-wireless/department-blog-simple-style.git master:gh-pages

cd -