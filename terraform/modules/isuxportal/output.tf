output "ecr_repositories" {
  value = [
    aws_ecr_repository.app.arn,
    aws_ecr_repository.nginx.arn,
    aws_ecr_repository.benchmarker.arn,
  ]
}

output "task_role_arns" {
  value = [
    aws_iam_role.ecs-task.arn,
  ]
}

output "service_arns" {
  value = [
    "${aws_ecs_cluster.main.arn}/*",
    "${aws_ecs_cluster.benchmarker.arn}/*",
  ]
}
