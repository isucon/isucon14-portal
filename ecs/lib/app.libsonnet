{
  cpu: 0,
  environment: [
    {
      name: 'ISUXPORTAL_SHORYUKEN_QUEUE',
      value: '{{ tfstate `aws_sqs_queue.activejob.name` }}',
    },
  ],
  environmentFiles: [
    {
      type: 's3',
      value: '{{ tfstate `aws_s3_bucket.config.arn` }}/ecs/{{ must_env `ENV` }}.env',
    },
  ],
  essential: true,
  image: '{{ tfstate `aws_ecr_repository.app.repository_url` }}:{{ must_env `TAG` }}',
}
