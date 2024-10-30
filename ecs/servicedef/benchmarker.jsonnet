{
  deploymentConfiguration: {
    deploymentCircuitBreaker: {
      enable: true,
      rollback: true,
    },
    maximumPercent: 200,
    minimumHealthyPercent: 50,
  },
  enableECSManagedTags: true,
  enableExecuteCommand: true,
  launchType: 'FARGATE',
  networkConfiguration: {
    awsvpcConfiguration: {
      assignPublicIp: 'ENABLED',
      securityGroups: [
        "{{ tfstate `module.isuxportal.aws_security_group.internal.id` }}",
        "{{ tfstate `module.isuxportal.aws_security_group.benchmarker.id` }}",
      ],
      subnets: [
        "{{ tfstate `module.isuxportal.aws_subnet.az-a-benchmarker.id` }}",
        "{{ tfstate `module.isuxportal.aws_subnet.az-c-benchmarker.id` }}",
        "{{ tfstate `module.isuxportal.aws_subnet.az-d-benchmarker.id` }}",
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
      value: 'qualify',
    },
  ],
}
