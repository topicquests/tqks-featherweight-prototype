#!/usr/bin/env bash

# grabs the given service database
HOST=localhost:8081
NAME=conversation
TOKEN=change-me
http $HOST/db-dump/$NAME \
  dump-db-secret:$TOKEN > $NAME.db
