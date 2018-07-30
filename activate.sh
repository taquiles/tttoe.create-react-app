#!/bin/bash -x

export LAMBDA_FUNCTION='tic-tac-toe'
export FUNCTION_FOLDER=$(pwd)
export AWS_PROFILE=claudia

export PATH=$PATH:$(pwd)/scripts