{
  deploymentConfiguration: {
    deploymentCircuitBreaker: {
      enable: true,
      rollback: true,
    },
    maximumPercent: 200,
    minimumHealthyPercent: 100,
  },
  enableECSManagedTags: true,
  enableExecuteCommand: true,
  launchType: 'FARGATE',
  networkConfiguration: {
    awsvpcConfiguration: {
      assignPublicIp: 'ENABLED',
      securityGroups: [
        "{{ tfstate `module.isuxportal.aws_security_group.internal.id` }}",
      ],
      subnets: [
        "{{ tfstate `module.isuxportal.aws_subnet.az-a.id` }}",
        "{{ tfstate `module.isuxportal.aws_subnet.az-c.id` }}",
        "{{ tfstate `module.isuxportal.aws_subnet.az-d.id` }}",
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
