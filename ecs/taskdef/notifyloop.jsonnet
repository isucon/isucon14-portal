local app = import 'lib/app.libsonnet';

{
  containerDefinitions: [
    app {
      name: 'notifyloop',
      command: ['bundle', 'exec', 'rails', 'runner', 'loop { LongRunningCheckJob.perform_now; sleep 60 }'],
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
  executionRoleArn: '{{ tfstate `module.isuxportal.aws_iam_role.ecs-task.arn` }}',
  family: '{{ must_env `ENV` }}-portal-bot',
  cpu: '1024',
  memory: '2048',
  networkMode: 'awsvpc',
  requiresCompatibilities: [
    'FARGATE',
  ],
  runtimePlatform: {
    cpuArchitecture: 'ARM64',
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
