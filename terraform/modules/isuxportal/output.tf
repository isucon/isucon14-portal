output "ecr_repositories" {
  value = [
    aws_ecr_repository.app.arn,
    aws_ecr_repository.nginx.arn,
    aws_ecr_repository.benchmarker.arn,
  ]
}
