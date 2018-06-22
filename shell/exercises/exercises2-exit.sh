#!/bin/bash
# Exercise 1: 
# Write a shell script that displays "This script will exit with a 0 exit status."
if [ "$#" -eq "0" ]
then
  echo "This script will exit with a 0 exit status."
  exit 0
fi
# Exercise 2:
# Write a shell script that accepts a file or directory name as an argument. 
# Have the script report if it is a regular file, a directory, or other type of file. 
# If it is a regular file, exit with a 0 exit status.
# If it is a directory, exit with a 1 exit status. 
# If it is some other type of file, exit with a 2 exit status.
COMMAND=$1
FILE=$2
if [ "$COMMAND" == "check" ]
then
  if [ -f "$FILE" ]
  then
    echo "${FILE} is a regular file. Exit status 0."
    exit 0
  elif [ -d "$FILE" ]
  then
    echo "${FILE} is a directory. Exit status 1."
    exit 1
  else
    echo "${FILE} is some other type of file. Exit status 2."
    exit 2
  fi
# Exercise 3:
# Write a script that executes the command "cat /etc/shadow". 
# If the command returns a 0 exit status report "Command succeeded" and exit with a 0 exit status. 
# If the command returns a non­zero exit status report "Command failed" and exit with a 1 exit status.
elif [ "$COMMAND" == "cat" ]
then
  cat "$FILE"
  if [ "$?" -eq "0" ]
  then
    echo "Command succeeded."
    exit 0
  else
    echo "Command failed"
    exit 1
  fi
else
  echo "Invalid command. Exit status 3."
  exit 3
fi
