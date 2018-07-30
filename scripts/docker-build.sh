#!/bin/bash -x

docker -D build  -t $LAMBDA_FUNCTION .
