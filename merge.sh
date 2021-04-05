
while getopts m:b: flag
do
    case "${flag}" in 
        m) message=${OPTARG};;
        b) branch=${OPTARG};;
    esac
done

if [ -z "$message" && -z "$branch"]
then echo "Please give a message with the flag -m and your branch with -b"
else
    echo "Starting Merge to Staging"
    git add .
    git commit -m "message"
    git push
    git checkout staging 
    git merge --no-ff staging
    git push origin staging
    echo "Done"
fi

