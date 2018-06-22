#!/bin/bash
# Exercise 1:
# Write a shell script that displays one random number to the screen and also generates a syslog message with that random number. 
# Use the "user" facility and the "info" facility for your messages.
# Exercise 2:
# Modify the previous script so that it uses a logging function. 
# Additionally tag each syslog message with "randomly" and include the process ID. 
# Generate 3 random numbers.
log() {
  local MESSAGE=$@
  logger -i -t randomly -p user.info "$MESSAGE"
}

random() {
  local NUMBER=$RANDOM
  echo "The number is ${NUMBER}."
  log $NUMBER
}

random
random
random

exit 0
