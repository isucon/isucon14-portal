#!/bin/bash -xe
(
  cd "$(dirname $0)/portal"

  shopt -s globstar

  rm -rf lib/isuxportal || :
  bundle exec grpc_tools_ruby_protoc -I../proto --ruby_out=./lib --grpc_out=./lib ../proto/**/*.proto
)
