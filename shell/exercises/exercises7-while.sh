#!/bin/bash
# Exercise 1:
# Write a shell script that loops through the /etc/passwd file one line at a time. 
# Prepend each line with a line number followed by a colon and then a space.
# Exercise 2:
# Write a shell script that asks the user for the number of lines they would like to display from the 
# /etc/passwd file and display those lines.
readlines() {
  local FILE=$1
  local LINES=$2
  local LINE_NUM=1
  
  while read LINE
  do
    if [ $LINE_NUM -gt $LINES ] 
    then
      break;
    fi
    echo $LINE
    ((LINE_NUM++))
  done < $FILE
}

readall() {
  local FILE=$1
  local LINE_NUM=1

  while read LINE
  do
    echo "${LINE_NUM}: ${LINE}"
    ((LINE_NUM++))
  done < $FILE
}

if [ $# -eq 0 ]
then
  readall /etc/passwd
else
  readlines /etc/passwd $1
fi

exit 0
