#!/bin/bash

# Exercise 1 and 2: display a message using a variable
WELCOME_MESSAGE="Shell scripting is fun!"
echo "${WELCOME_MESSAGE}"

# Exercise 3: store the output of 'hostname' and display it
HOSTNAME=$(hostname)
echo "This script is running on ${HOSTNAME}."

# Exercise 4: Test if file exists and if user has write permissions, displaying messages
FILE="/etc/shadow"
if [ -e "$FILE" ] 
then
  echo "Shadow passwords are enabled."

  if [ -w "$FILE" ] 
  then
    echo "You have permissions to edit ${FILE}."
  else
    echo "You DO NOT have permissions to edit ${FILE}."
  fi
fi
# Exercise 5: Output every element of the list on a separate line
for ITEM in man bear pig dog cat 
do
  echo "${ITEM}"
done

# Exercise 6: Prompts the user for a name of a file or directory and reports if it is a regular file, a directory, or other type of file
# read -p "Enter the path to a file or directory: " PATH
# Exercise 7: accepts the file or directory name as an argument
# PATH=$1
# Exercise 8: accept an unlimited number of files and directories as arguments

for PATH in $@
do
  if [ -f "$PATH" ] 
  then
    echo "${PATH} is a regular file."
  elif [ -d "$PATH" ] 
  then
    echo "${PATH} is a directory."
  else
    echo "{$PATH} is something other than a file or a directory."
  fi
done

