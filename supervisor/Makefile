export ENV?=stg
export TAG?=$(shell git log -1 --format=%H)
export AWS_PROFILE=portal-$(ENV)
export AWS_DEFAULT_REGION=ap-northeast-1
AWS_ACCCOUNT_ID=$(shell aws --profile $(AWS_PROFILE) sts get-caller-identity --query Account --output text)
ECR_HOST=$(AWS_ACCCOUNT_ID).dkr.ecr.$(AWS_DEFAULT_REGION).amazonaws.com

.PHONY: build
build:
	docker build \
		-t $(ECR_HOST)/$(ENV)/benchmarker:supervisor \
		--platform linux/amd64,linux/arm64 \
		.

.PHONY: push
push:
	docker push $(ECR_HOST)/$(ENV)/benchmarker:supervisor

.PHONY: login
login:
	aws ecr get-login-password | docker login --username AWS --password-stdin $(ECR_HOST)
