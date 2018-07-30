#!/bin/bash -x

DOCKER_IMAGE=$(docker-image-name.sh)
docker container exec -it $DOCKER_IMAGE /bin/bash


