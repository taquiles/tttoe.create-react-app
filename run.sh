#!/usr/bin/env bash
set -eo pipefail

case $1 in
  start)
    # The '| cat' is to trick Node that this is an non-TTY terminal
    # then react-scripts won't clear the console.
    npm start --loglevel debug | cat
    ;;
  build)
    yarn build
    ;;
  test)
    yarn test $@
    ;;
  run-prod)
    yarn run-prod
    ;;
  *)
    exec "$@"
    ;;
esac


ls