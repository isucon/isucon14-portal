resource "aws_cloudwatch_log_group" "app" {
  for_each          = toset(["app", "nginx"])
  name              = "/${local.env}/${local.project}/${each.value}"
  retention_in_days = 30
}
