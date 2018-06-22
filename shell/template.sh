#!/bin/bash
#
# <Replace with the description and/or purpose of this shell script.>

# Declare global variables
#
# <Replace with the variables of your shell script.>
HOSTNAME=$(hostname)
DATETIME=$(date)

# Declare functions
#
# <Replace with the functions of your shell script.>
function hello() {
  if [ $# -eq 0 ]
  then
    echo "Hello, world!"
    return 1
  fi
  
  local COUNTER=1
  for NAME in $@
  do
    echo "Hello, ${NAME}. You are the number ${COUNTER}"
    COUNTER=$(($COUNTER+1))
  done

  return 0
}

# Main body of the shell script starts here.
#
# <Replace with the main commands of your shell script.>
hello Leo Edu

# Exit with an explicit exit status.
exit 0
