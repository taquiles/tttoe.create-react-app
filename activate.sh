#!/bin/bash -x

export LAMBDA_FUNCTION='tttoe-cra'
export FUNCTION_FOLDER=$(pwd)
export AWS_PROFILE=claudia

export PATH=$PATH:$(pwd)/scripts