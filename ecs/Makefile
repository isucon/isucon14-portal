export ENV?=stg
export TAG?=$(shell git log -1 --format=%H)
export ECR?=$(shell jq -r '.credHelpers | keys | .[0]' .docker/config.json)
export KMS=arn:aws:kms:ap-northeast-1:497146501771:alias/$(ENV)-portal

build:
	cd ../portal && \
	docker --config .docker \
		build \
		--build-arg ENV=$(ENV) \
		-t $(ECR)/$(ENV)/portal/app:$(TAG) .

push:
	docker --config .docker \
		push $(ECR)/$(ENV)/portal/app:$(TAG)

diff: $(ENV).env
	bash -c 'diff -u <(aws s3 cp s3://config-$(ENV)-portal-isucon12/ecs/$(ENV).env -) $(ENV).env' || exit 0
	ecspresso diff --unified

verify:
	ecspresso verify

deploy: $(ENV).env verify
	aws s3 cp $(ENV).env s3://config-$(ENV)-portal-isucon12/ecs/$(ENV).env
	ecspresso deploy

rollback:
	ecspresso rollback --deregister-task-definition

scale:
	ecspresso scale --tasks=$(TASKS)

status:
	ecspresso status

exec:
	ecspresso exec

tasks:
	ecspresso tasks $(OPT)

revisions:
	ecspresso revisions

refresh:
	ecspresso refresh

run:
	ecspresso run --latest-task-definition --overrides-file=overrides.jsonnet --wait-until running

$(ENV).env: $(ENV).encrypted.env
	sops -d $(ENV).encrypted.env > $(ENV).env

.PHONY: clean
clean:
	rm -f $(ENV).env
