{
  containerDefinitions: [
    {
      name: 'benchmarker',
      environmentFiles: [
        {
          type: 's3',
          value: '{{ tfstate `module.isuxportal.aws_s3_bucket.config.arn` }}/ecs/{{ must_env `ENV` }}.env',
        },
      ],
      essential: true,
      image: '{{ tfstate `module.isuxportal.aws_ecr_repository.benchmarker.repository_url` }}:{{ must_env `TAG` }}',
      logConfiguration: {
        logDriver: 'awslogs',
        options: {
          'awslogs-group': "{{ tfstate `module.isuxportal.aws_cloudwatch_log_group.ecs['benchmarker'].name` }}",
          'awslogs-region': 'ap-northeast-1',
          'awslogs-stream-prefix': 'benchmarker',
        },
      },
      linuxParameters: {
        initProcessEnabled: true,
      },
      stopTimeout: 120,
      ulimits: [
        {
          softLimit: 10000,
          name: 'nofile',
          hardLimit: 10000,
        },
        {
          softLimit: 10000,
          name: 'nproc',
          hardLimit: 10000,
        },
      ],
    },
  ],
  cpu: '4096',
  executionRoleArn: '{{ tfstate `module.isuxportal.aws_iam_role.ecs-task.arn` }}',
  family: '{{ must_env `ENV` }}-benchmarker',
  memory: '8192',
  networkMode: 'awsvpc',
  requiresCompatibilities: [
    'FARGATE',
  ],
  runtimePlatform: {
    operatingSystemFamily: 'LINUX',
  },
  tags: [
    {
      key: 'Env',
      value: '{{ must_env `ENV` }}',
    },
    {
      key: 'Project',
      value: 'qualify',
    },
  ],
  taskRoleArn: '{{ tfstate `module.isuxportal.aws_iam_role.ecs-task.arn` }}',
}
