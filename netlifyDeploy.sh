#!/usr/bin/env sh

set -e
npm run docs:build

cd dist

git config --global user.email "1292393108@qq.com"
git config --global user.name "魏斌"
git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/souche-finance-wireless/department-blog-simple-style.git master:gh-pages

cd -