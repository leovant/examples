#!/bin/bash
# Exercise:
# Create a startup script for an application called sleep­walking­server.
# The script should be named sleep­walking and accept "start" and "stop" as arguments. 
# If anything other than "start" or "stop" is provided as an argument, display a usage statement:
# "Usage sleep­walking start|stop" and terminate the script with an exit status of 1.
case "$1" in
  start)
    echo "Starting..."
    /tmp/sleep-walking-server &
    
    if [ ! $? -eq 0 ] 
    then
      echo "Erro!"
      exit 1
    fi
    
    echo "OK."
    ;;

  stop)
    echo "Stopping..."
    kill $(cat /tmp/sleep-walking-server.pid)
    
    if [ ! $? -eq 0 ]
    then
      echo "Erro!"
      exit 1
    fi
    
    echo "OK."
    ;;

  *)
    echo "Usage: $0 start|stop"
    exit 1
esac

exit 0
