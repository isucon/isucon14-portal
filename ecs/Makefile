export ENV?=stg
export TAG?=$(shell git log -1 --format=%H)
export ECR?=$(shell jq -r '.credHelpers | keys | .[0]' .docker/config.json)
export KMS=arn:aws:kms:ap-northeast-1:497146501771:alias/$(ENV)-portal

build/app:
	cd ../portal && \
	docker --config .docker \
		build \
		--build-arg ENV=$(ENV) \
		-t $(ECR)/$(ENV)/portal/app:$(TAG) .

build/nginx:
	cd nginx && \
	docker --config .docker \
		build \
		-t $(ECR)/$(ENV)/portal/nginx:$(TAG) .

push/%:
	docker --config .docker \
		push $(ECR)/$(ENV)/portal/$*:$(TAG)

build: build/app build/nginx

push: push/app push/nginx

create/%:
	ecspresso create --config $*.yml

diff/env: $(ENV).env
	bash -c 'diff -u <(aws s3 cp s3://config-$(ENV)-portal-isucon12/ecs/$(ENV).env -) $(ENV).env' || exit 0

diff/%: diff/env
	ecspresso diff --unified --config $*.yml

verify/%:
	ecspresso verify --config $*.yml

deploy/env: $(ENV).env
	aws s3 cp $(ENV).env s3://config-$(ENV)-portal-isucon12/ecs/$(ENV).env

deploy/app: verify/app deploy/env
	ecspresso deploy --config app.yml

deploy/bot: verify/bot
	ecspresso deploy --config bot.yml

rollback/%:
	ecspresso rollback --deregister-task-definition --config $*.yml

scale/%:
	ecspresso scale --tasks=$(TASKS) --config $*.yml

status/%:
	ecspresso status --config $*.yml

exec/%:
	ecspresso exec --command=bash --config $*.yml

tasks/%:
	ecspresso tasks $(OPT) --config $*.yml

revisions/%:
	ecspresso revisions --config $*.yml

refresh/%:
	ecspresso refresh --config $*.yml

run:
	ecspresso --config app.yml run --latest-task-definition --overrides-file=overrides.jsonnet --wait-until running

$(ENV).env: $(ENV).encrypted.env
	sops -d $(ENV).encrypted.env > $(ENV).env

.PHONY: clean
clean:
	rm -f $(ENV).env
