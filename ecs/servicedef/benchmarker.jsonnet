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
        "{{ tfstate `aws_security_group.internal.id` }}",
      ],
      subnets: [
        "{{ tfstate `aws_subnet.az-a-benchmarker.id` }}",
        "{{ tfstate `aws_subnet.az-c-benchmarker.id` }}",
        "{{ tfstate `aws_subnet.az-d-benchmarker.id` }}",
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
