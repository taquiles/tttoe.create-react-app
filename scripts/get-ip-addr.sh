#!/bin/bash 

ip route get 1 | awk '{print $NF;exit}'
