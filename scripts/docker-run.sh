#!/bin/bash 

if [ -z $1 ]; then
    OP=start
else
    OP=$1
fi

echo "####################"
echo Creating a container based on image- $LAMBDA_FUNCTION
echo Running command- $OP
echo 

docker container run -it -p 3000:3000/tcp -p 5858:5858/tcp -p 9222:9222/tcp -p 9229:9229/tcp -v $FUNCTION_FOLDER:/app $LAMBDA_FUNCTION  $OP