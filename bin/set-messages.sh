#!/usr/bin/env bash

# execute POST request and replace the messages DB
HOST=localhost:3030
NAME=messages
TOKEN=ebd2d309-83d2-4857-8b02-b933c480c1a9

FILENAME=$NAME.db

http -f POST $HOST/db-set \
  dump-db-secret:$TOKEN \
  service=$NAME \
  db=@$FILENAME
