{
  cpu: 0,
  environment: [
    {
      name: 'ISUXPORTAL_SHORYUKEN_QUEUE',
      value: '{{ tfstate `module.isuxportal.aws_sqs_queue.activejob.name` }}',
    },
    {
      name: 'ISUXPORTAL_AVATAR_BUCKET',
      value: '{{ tfstate `module.isuxportal.aws_s3_bucket.avatars.id` }}',
    },
    {
      name: 'ISUXPORTAL_TEST_AMI_ID',
      value: '{{ tfstate `module.ami.data.aws_ami.envcheck.id` }}',
    },
    // {
    //   name: 'ISUXPORTAL_QUALIFY_AMI_ID',
    //   value: '{{ tfstate `module.ami.data.aws_ami.qualify.id` }}',
    // },
  ],
  environmentFiles: [
    {
      type: 's3',
      value: '{{ tfstate `module.isuxportal.aws_s3_bucket.config.arn` }}/ecs/{{ must_env `ENV` }}.env',
    },
  ],
  essential: true,
  image: '{{ tfstate `module.isuxportal.aws_ecr_repository.app.repository_url` }}:{{ must_env `TAG` }}',
}
