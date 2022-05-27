resource "aws_cloudwatch_log_group" "ecs" {
  for_each          = toset(["app", "nginx", "execute-command"])
  name              = "/ecs/${local.env}/${local.project}/${each.value}"
  retention_in_days = 365
}
