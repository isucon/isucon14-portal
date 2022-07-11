#!/bin/bash -e
pushd ../bench-tool.go/testcli
go build -o /tmp/isuxportal-reporter-testcli
popd
export ISUXPORTAL_SUPERVISOR_INSTANCE_NAME=dummy
export ISUXPORTAL_SUPERVISOR_ENDPOINT_URL=http://localhost:3000
export ISUXPORTAL_SUPERVISOR_TOKEN=dummy
export ISUXBENCH_REPORT_FD=3
export RUST_LOG=${RUST_LOG:-"info,isuxportal_supervisor=trace"}
exec cargo run --bin isuxportal-supervisor /tmp/isuxportal-reporter-testcli "$@"
