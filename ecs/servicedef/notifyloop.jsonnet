{
  deploymentConfiguration: {
    deploymentCircuitBreaker: {
      enable: true,
      rollback: true,
    },
    maximumPercent: 100,
    minimumHealthyPercent: 0,
  },
  desiredCount: 1,
  enableECSManagedTags: true,
  enableExecuteCommand: true,
  launchType: 'FARGATE',
  networkConfiguration: {
    awsvpcConfiguration: {
      assignPublicIp: 'ENABLED',
      securityGroups: [
        '{{ tfstate `aws_security_group.internal.id` }}',
      ],
      subnets: [
        '{{ tfstate `aws_subnet.az-a.id` }}',
        '{{ tfstate `aws_subnet.az-c.id` }}',
        '{{ tfstate `aws_subnet.az-d.id` }}',
      ],
    },
  },
  platformFamily: 'Linux',
  platformVersion: '1.4.0',
  propagateTags: 'TASK_DEFINITION',
  serviceRegistries: [],
  schedulingStrategy: 'REPLICA',
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
}
