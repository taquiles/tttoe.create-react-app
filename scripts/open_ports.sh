#!/bin/bash

sudo nmap -PN -p 9222,3000,9229,5858,35729,8080 -sV 172.17.0.1
