#!/bin/bash -e
pushd ../bench-tool.go/testcli
go build -o /tmp/isuxportal-reporter-testcli
popd
export ISUXPORTAL_SUPERVISOR_INSTANCE_NAME=dummy
export ISUXPORTAL_SUPERVISOR_TEAM_ID=13
export ISUXPORTAL_SUPERVISOR_INTERVAL_AFTER_EMPTY_RECEIVE=5
export ISUXPORTAL_SUPERVISOR_ENDPOINT_URL=https://portal.xii.isucon.dev
export ISUXPORTAL_SUPERVISOR_TOKEN=dummy
export RUST_LOG=${RUST_LOG:-"info,isuxportal_supervisor=trace"}
# exec cargo run --bin isuxportal-supervisor /tmp/isuxportal-reporter-testcli "$@"
exec cargo run --bin isuxportal-supervisor "$@"
