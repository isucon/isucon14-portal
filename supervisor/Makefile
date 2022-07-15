export ENV?=stg
export TAG?=$(shell git log -1 --format=%H)
export ECR?=$(shell jq -r '.credHelpers | keys | .[0]' .docker/config.json)
.PHONY: image

image:
	docker --config .docker \
		build \
		-f Dockerfile \
		-t $(ECR)/$(ENV)/benchmarker:supervisor \
		..

push:
	docker --config .docker \
		push $(ECR)/$(ENV)/benchmarker:supervisor
