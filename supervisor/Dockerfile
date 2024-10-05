FROM rust:1.81.0-bookworm AS builder

RUN apt-get -y update && apt-get -y install cmake
RUN mkdir /tmp/isucon14-portal
COPY . /tmp/isucon14-portal/supervisor
WORKDIR /tmp/isucon14-portal/supervisor
RUN cargo build --release --bin isuxportal-supervisor
RUN install target/release/isuxportal-supervisor /usr/local/bin/isuxportal-supervisor

# TODO: IMPLEMENT
FROM golang:1.22.8-bookworm AS benchmarker
COPY . /tmp/isucon14-portal/benchmarker
WORKDIR /tmp/isucon14-portal/benchmarker/dummybench
RUN go build -o /usr/local/bin/dummybench /tmp/isucon14-portal/benchmarker/dummybench 

FROM debian:bookworm-slim
RUN apt-get update && apt install -y openssl ca-certificates
COPY --from=builder /usr/local/bin/isuxportal-supervisor /usr/local/bin/isuxportal-supervisor
COPY --from=benchmarker /usr/local/bin/dummybench /usr/local/bin/dummybench

ENTRYPOINT [ "/usr/local/bin/isuxportal-supervisor" , "/usr/local/bin/dummybench" ]
