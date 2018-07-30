#!/bin/bash 

docker container ls | grep $LAMBDA_FUNCTION | awk -F" " '{print $1}'
