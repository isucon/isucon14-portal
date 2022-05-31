local app = import 'lib/app.libsonnet';

{
  containerDefinitions: [
    app {
      name: 'app',
      logConfiguration: {
        logDriver: 'awslogs',
        options: {
          'awslogs-group': "{{ tfstate `aws_cloudwatch_log_group.ecs['app'].name` }}",
          'awslogs-region': 'ap-northeast-1',
          'awslogs-stream-prefix': 'app',
        },
      },
    },
    app {
      name: 'worker',
      command: [
        'bundle',
        'exec',
        'shoryuken',
        'start',
        '--config',
        'config/shoryuken.yml',
        '--rails',
      ],
      logConfiguration: {
        logDriver: 'awslogs',
        options: {
          'awslogs-group': "{{ tfstate `aws_cloudwatch_log_group.ecs['app'].name` }}",
          'awslogs-region': 'ap-northeast-1',
          'awslogs-stream-prefix': 'worker',
        },
      },
    },
    {
      name: 'nginx',
      environment: [],
      essential: true,
      image: '{{ tfstate `aws_ecr_repository.nginx.repository_url` }}:{{ must_env `TAG` }}',
      logConfiguration: {
        logDriver: 'awslogs',
        options: {
          'awslogs-group': "{{ tfstate `aws_cloudwatch_log_group.ecs['app'].name` }}",
          'awslogs-region': 'ap-northeast-1',
          'awslogs-stream-prefix': 'nginx',
        },
      },
      portMappings: [
        {
          containerPort: 80,
          hostPort: 80,
          protocol: 'tcp',
        },
      ],
      volumesFrom: [
        {
          sourceContainer: 'app',
          readOnly: true,
        },
      ],
    },
  ],
  cpu: '1024',
  executionRoleArn: '{{ tfstate `aws_iam_role.ecs-task.arn` }}',
  family: '{{ must_env `ENV` }}-portal',
  memory: '4096',
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
      value: 'portal',
    },
  ],
  taskRoleArn: '{{ tfstate `aws_iam_role.ecs-task.arn` }}',
}