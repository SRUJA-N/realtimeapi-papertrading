#!/bin/bash
# Wait for PostgreSQL to be ready

set -e

host="$1"
port="$2"
shift 2
cmd="$@"

until nc -z "$host" "$port"; do
  echo "Waiting for PostgreSQL at $host:$port..."
  sleep 1
done

echo "PostgreSQL is up - executing command"
exec $cmd
