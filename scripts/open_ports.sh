#!/bin/bash

echo $1

if [ ! -z $1 ]; then  
  IP=$1
else
  IP=172.17.0.2
fi

sudo nmap -PN -p 9222,3000,9229,5858,35729,8080 -sV $IP
