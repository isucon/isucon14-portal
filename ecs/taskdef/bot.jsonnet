local app = import 'lib/app.libsonnet';

{
  containerDefinitions: [
    app {
      name: 'bot',
      command: [
        'bundle',
        'exec',
        'bin/isuxportal-discord-bot',
      ],
      logConfiguration: {
        logDriver: 'awslogs',
        options: {
          'awslogs-group': "{{ tfstate `module.isuxportal.aws_cloudwatch_log_group.ecs['app'].name` }}",
          'awslogs-region': 'ap-northeast-1',
          'awslogs-stream-prefix': 'bot',
        },
      },
    },
  ],
  cpu: '1024',
  executionRoleArn: '{{ tfstate `module.isuxportal.aws_iam_role.ecs-task.arn` }}',
  family: '{{ must_env `ENV` }}-portal-bot',
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
