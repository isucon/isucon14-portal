#!/bin/bash -e
(cd dummybench && go build -o /tmp/isuxportal-reporter-testcli .)
export ISUXPORTAL_SUPERVISOR_INSTANCE_NAME=localhost
export ISUXBENCH_TARGET=https://dummy.invalid
export ISUXBENCH_ALL_ADDRESSES=dummy1.invalid,dummy2.invalid,dummy3.invalid
export RUST_LOG=${RUST_LOG:-"info,isuxportal_supervisor=trace"}
exec cargo run --bin oneshot /tmp/isuxportal-reporter-testcli "$@"
