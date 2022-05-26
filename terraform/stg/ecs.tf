resource "aws_ecs_cluster" "main" {
  name = "${local.env}-${local.project}"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  configuration {
    execute_command_configuration {
      kms_key_id = aws_kms_key.main.arn
      logging    = "OVERRIDE"

      log_configuration {
        cloud_watch_encryption_enabled = true
        cloud_watch_log_group_name     = aws_cloudwatch_log_group.ecs["execute-command"].name
      }
    }
  }
}

resource "aws_ecr_repository" "app" {
  name                 = "${local.env}/${local.project}/app"
  image_tag_mutability = "MUTABLE"
}

resource "aws_ecr_repository" "nginx" {
  name                 = "${local.env}/${local.project}/nginx"
  image_tag_mutability = "MUTABLE"
}
