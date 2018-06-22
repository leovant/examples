#!/bin/bash
# Exercise 1:
# Write a shell script that renames all files in the current directory that end in ".jpg" 
# to begin with today's date in the following format: YYYY­MM­DD.
# Exercise 2:
# Write a script that renames files based on the file extension. 
# The script should prompt the user for a file extension. 
# Next, it should ask the user what prefix to prepend to the file name(s). 
# By default the prefix should be the current date in YYYY­MM­DD format. 
# So, if the user simply presses enter the date will be used. 
# Otherwise, whatever the user entered will be used as the prefix. 
# Next, it should display the original file name and the new name of the file. 
# Finally, it should rename the file.
DEFAULT_PREFIX=$(date +%F)
MODE=$1

rename_all() {
  local EXTENSION=$1
  local PREFIX=$2

  if [ -z "$EXTENSION" ]
  then
    local EXTENSION="jpg"
  fi

  if [ -z "$PREFIX" ]
  then
    local PREFIX="$DEFAULT_PREFIX"
  fi

  for FILE in *.${EXTENSION}
  do
    NEW_FILE="${PREFIX}-${FILE}"
    echo "Renaming ${FILE} to ${NEW_FILE}."
    mv $FILE $NEW_FILE
  done

  return 0
}

if [ $# -eq 0 ]
then
  rename_all
elif [ "$MODE" == "input" ]
then
  read -p "Please enter a file extension: " EXTENSION
  read -p "Please enter a file prefix: (Press enter for ${DEFAULT_PREFIX}) " PREFIX

  rename_all $EXTENSION $PREFIX
else
  echo "Invalid call."
  exit 1
fi

exit 0
