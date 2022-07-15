FROM rust:1.62.0-bullseye AS builder

RUN apt-get -y update && apt-get -y install cmake
RUN mkdir /tmp/isucon12-portal
ADD supervisor /tmp/isucon12-portal/supervisor
ADD proto /tmp/isucon12-portal/proto
WORKDIR /tmp/isucon12-portal/supervisor
RUN cargo build --release --bin isuxportal-supervisor
RUN install target/release/isuxportal-supervisor /usr/local/bin/isuxportal-supervisor

FROM scratch

COPY --from=builder /usr/local/bin/isuxportal-supervisor /usr/local/bin/isuxportal-supervisor
