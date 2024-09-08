resource "aws_cloudwatch_log_group" "ecs" {
  for_each          = toset(["app", "nginx", "execute-command", "benchmarker"])
  name              = "/ecs/${var.env}/${var.project}/${each.value}"
  retention_in_days = 30
}
