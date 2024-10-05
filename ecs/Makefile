export ENV?=stg
export TAG?=$(shell git log -1 --format=%H)
export AWS_PROFILE=portal-$(ENV)
export AWS_DEFAULT_REGION=ap-northeast-1
AWS_ACCCOUNT_ID=$(shell aws --profile $(AWS_PROFILE) sts get-caller-identity --query Account --output text)
S3_BUCKET=config-$(ENV)-portal-isucon14
ECR_HOST=$(AWS_ACCCOUNT_ID).dkr.ecr.$(AWS_DEFAULT_REGION).amazonaws.com
SOPS_KMS_ARN=arn:aws:kms:$(AWS_DEFAULT_REGION):$(AWS_ACCCOUNT_ID):alias/$(ENV)-portal
TASKS?=1
DOCKER_CMD?=docker

login:
	aws ecr get-login-password | docker login --username AWS --password-stdin $(ECR_HOST)

build/app:
	cd ../portal && \
	$(DOCKER_CMD) build \
		--platform linux/arm64 \
		--build-arg ENV=$(ENV) \
		-t $(ECR_HOST)/$(ENV)/portal/app:$(TAG) .

build/nginx:
	cd nginx && \
	$(DOCKER_CMD) build \
		--platform linux/arm64 \
		-t $(ECR_HOST)/$(ENV)/portal/nginx:$(TAG) .

build/supervisor:
	cd ../supervisor && \
	$(DOCKER_CMD) build \
		--platform linux/amd64 \
		-t $(ECR_HOST)/$(ENV)/benchmarker:supervisor .

push/supervisor:
	$(DOCKER_CMD) push $(ECR_HOST)/$(ENV)/benchmarker:supervisor

push/%:
	$(DOCKER_CMD) push $(ECR_HOST)/$(ENV)/portal/$*:$(TAG)

build: build/app build/nginx

push: login push/app push/nginx

create/%:
	ecspresso deploy --config $*.yml

diff/env: $(ENV).env
	bash -c 'diff -u <(aws s3 cp s3://$(S3_BUCKET)/ecs/$(ENV).env -) $(ENV).env' || exit 0

diff/%: diff/env
	ecspresso diff --config $*.yml

verify/%:
	ecspresso verify --config $*.yml

deploy/env: diff/env
	aws s3 cp $(ENV).env s3://$(S3_BUCKET)/ecs/$(ENV).env

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
