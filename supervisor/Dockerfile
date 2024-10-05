FROM rust:1.81.0-bookworm AS builder

RUN apt-get -y update && apt-get -y install cmake
RUN mkdir /tmp/isucon14-portal
COPY . /tmp/isucon14-portal/supervisor
WORKDIR /tmp/isucon14-portal/supervisor
RUN cargo build --release --bin isuxportal-supervisor
RUN install target/release/isuxportal-supervisor /usr/local/bin/isuxportal-supervisor

FROM golang:1.23.2-bookworm AS benchmarker
# TODO: IMPLEMENT

FROM debian:bookworm-slim
RUN apt-get update && apt install -y openssl
COPY --from=builder /usr/local/bin/isuxportal-supervisor /usr/local/bin/isuxportal-supervisor

