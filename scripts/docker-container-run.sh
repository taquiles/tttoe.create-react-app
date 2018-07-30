#!/bin/bash -x

docker container run -it -p 3000:3000/tcp -p 5858:5858/tcp -p 9222:9222/tcp -p 9229:9229/tcp -v $FUNCTION_FOLDER:/app $LAMBDA_FUNCTION  start