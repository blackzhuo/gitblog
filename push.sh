#!/bin/sh

git status
git add .
git status
git commit -am"commit"
git push origin master
git status

echo "github push complete."