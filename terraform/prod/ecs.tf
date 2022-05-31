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
        cloud_watch_encryption_enabled = false
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

resource "aws_appautoscaling_target" "app" {
  max_capacity       = 16
  min_capacity       = 2
  resource_id        = "service/${aws_ecs_cluster.main.name}/app"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "app" {
  name               = "${local.env}-${local.project}-app"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.app.resource_id
  scalable_dimension = aws_appautoscaling_target.app.scalable_dimension
  service_namespace  = aws_appautoscaling_target.app.service_namespace

  target_tracking_scaling_policy_configuration {
    target_value       = 40
    scale_out_cooldown = 120
    scale_in_cooldown  = 300

    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
  }
}
