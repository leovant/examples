#!/bin/bash
# Exercise 1:
# Write a shell script that consists of a function that display the number of files in the present working directory. 
# Name this function "file_count" and call it in your script. 
# If you use a variable in your function, remember to make it a local variable.
# Exercise 2:
# Modify the script from the previous exercise. 
# Make the "file_count" function accept a directory as an argument. 
# Next have the function display the name of the directory followed by a colon.
# Finally, display the number of files to the screen on the next line. Call the function three times.
# First, on the "/etc" directory, next on the "/var" directory and finally on the "/usr/bin" directory.
file_count() {
  local DIR=$1
  
  if [ ! -d $DIR ]
  then
    echo "${DIR} is not a directory."
    return 1
  fi

  local COUNTER=$(ls $DIR | wc -l)
  echo "${DIR}:"
  echo " ${COUNTER}"
}

file_count /etc
file_count /var
file_count /usr/bin

