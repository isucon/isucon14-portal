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
      image: '{{ tfstate `module.isuxportal.aws_ecr_repository.benchmarker.repository_url` }}:4ba50754c8481e1f1ce2cb14217ec880b8ef94da',
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
      restartPolicy: {
        enabled: true,
        ignoredExitCodes: [0],
      },
      ulimits: [
        {
          softLimit: 100000,
          name: 'nofile',
          hardLimit: 100000,
        },
        {
          softLimit: 100000,
          name: 'nproc',
          hardLimit: 100000,
        },
      ],
    },
  ],
  executionRoleArn: '{{ tfstate `module.isuxportal.aws_iam_role.ecs-task.arn` }}',
  family: '{{ must_env `ENV` }}-benchmarker',
  cpu: '4096',
  memory: '8192',
  networkMode: 'awsvpc',
  requiresCompatibilities: [
    'FARGATE',
  ],
  runtimePlatform: {
    cpuArchitecture: 'X86_64',
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
