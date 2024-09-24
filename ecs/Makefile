export ENV?=stg
export TAG?=$(shell git log -1 --format=%H)
export ECR?=$(shell jq -r '.credHelpers | keys | .[0]' .docker/config.json)
# export ECR=703671906592.dkr.ecr.ap-northeast-1.amazonaws.com
export ECR=692859926955.dkr.ecr.ap-northeast-1.amazonaws.com
export SOPS_KMS_ARN?=arn:aws:kms:ap-northeast-1:692859926955:alias/$(ENV)-portal
DOCKER_CMD=docker
export TASKS?=1


login: 
	aws --profile portal-$(ENV) ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin $(ECR)

build/app:
	cd ../portal && \
	$(DOCKER_CMD) build \
		--build-arg ENV=$(ENV) \
		-t $(ECR)/$(ENV)/portal/app:$(TAG) .

build/nginx:
	cd nginx && \
	$(DOCKER_CMD) build \
		-t $(ECR)/$(ENV)/portal/nginx:$(TAG) .

push/%:
	$(DOCKER_CMD) push $(ECR)/$(ENV)/portal/$*:$(TAG)

build: build/app build/nginx

push: push/app push/nginx

create/%:
	ecspresso deploy --config $*.yml

diff/env: $(ENV).env
	bash -c 'diff -u <(aws s3 cp s3://config-$(ENV)-portal-isucon14/ecs/$(ENV).env -) $(ENV).env' || exit 0

diff/%: diff/env
	ecspresso diff --config $*.yml

verify/%:
	ecspresso verify --config $*.yml

deploy/env: diff/env
	aws s3 cp $(ENV).env s3://config-$(ENV)-portal-isucon14/ecs/$(ENV).env

deploy: deploy/app deploy/worker


deploy/%: verify/% deploy/env
	ecspresso deploy --config $*.yml --no-wait

deploy/bot: verify/bot
	ecspresso deploy --config bot.yml

rollback/%:
	ecspresso rollback --config $*.yml

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

revisions/%:
	ecspresso revisions --config $*.yml --output=tsv

run:
	ecspresso --config app.yml run --latest-task-definition --overrides-file=overrides.jsonnet --wait-until running

$(ENV).env: $(ENV).encrypted.env
	sops -d $(ENV).encrypted.env > $(ENV).env

.PHONY: clean
clean:
	rm -f $(ENV).env
