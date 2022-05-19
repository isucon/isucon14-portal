export ENV?=stg
export TAG?=$(shell git log -1 --format=%H)
export ECR?=$(shell jq -r '.credHelpers | keys | .[0]' .docker/config.json)

build/app:
	cd ../portal && \
	docker --config .docker \
		build \
		--build-arg ENV=$(ENV) \
		-t $(ECR)/$(ENV)/portal/app:$(TAG) .

push/app:
	docker --config .docker \
		push $(ECR)/$(ENV)/portal/app:$(TAG)

diff:
	bash -c 'diff -u <(aws s3 cp s3://config-$(ENV)-portal-isucon12/ecs/$(ENV).env -) $(ENV).env'
	ecspresso diff --unified

verify:
	ecspresso verify

deploy: verify
	aws s3 cp app.env s3://config-$(ENV)-portal-isucon12/ecs/app.env
	ecspresso deploy

scale:
	ecspresso scale --tasks=$(TASKS)

status:
	ecspresso status

exec:
	ecspresso exec

run:
	ecspresso run --latest-task-definition --overrides-file=overrides.jsonnet

.PHONY: clean
clean:
	rm -f .docker/config.json
