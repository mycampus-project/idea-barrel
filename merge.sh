#!/bin/bash
while getopts m:b: flag
do
    case "${flag}" in 
        m) message=${OPTARG};;
        b) branch=${OPTARG};;
    esac
done

echo "$message"
echo "$branch"

git add .
git commit -m "$message"
git push origin "$branch"
git checkout staging
git merge --no-ff "$branch"
git push origin staging

echo "Done"