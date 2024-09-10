local app = import 'lib/app.libsonnet';

{
  containerDefinitions: [
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
          'awslogs-group': "{{ tfstate `module.isuxportal.aws_cloudwatch_log_group.ecs['app'].name` }}",
          'awslogs-region': 'ap-northeast-1',
          'awslogs-stream-prefix': 'worker',
        },
      },
    },
  ],
  cpu: '1024',
  executionRoleArn: '{{ tfstate `module.isuxportal.aws_iam_role.ecs-task.arn` }}',
  family: '{{ must_env `ENV` }}-portal-worker',
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
  taskRoleArn: '{{ tfstate `module.isuxportal.aws_iam_role.ecs-task.arn` }}',
}
