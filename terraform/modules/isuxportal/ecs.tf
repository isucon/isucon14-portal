resource "aws_ecs_cluster" "main" {
  name = "${var.env}-${var.project}"

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
  name                 = "${var.env}/${var.project}/app"
  image_tag_mutability = "MUTABLE"
}

resource "aws_ecr_repository" "nginx" {
  name                 = "${var.env}/${var.project}/nginx"
  image_tag_mutability = "MUTABLE"
}

resource "aws_appautoscaling_target" "app" {
  count              = var.enable_auto_scaling ? 1 : 0
  min_capacity       = 1
  max_capacity       = 32
  resource_id        = "service/${aws_ecs_cluster.main.name}/app"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "app" {
  count              = var.enable_auto_scaling ? 1 : 0
  name               = "${var.env}-${var.project}-app"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.app[0].resource_id
  scalable_dimension = aws_appautoscaling_target.app[0].scalable_dimension
  service_namespace  = aws_appautoscaling_target.app[0].service_namespace

  target_tracking_scaling_policy_configuration {
    target_value       = 40
    scale_out_cooldown = 2*60
    scale_in_cooldown  = 60*60

    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
  }
}

resource "aws_ecs_cluster" "benchmarker" {
  name = "${var.env}-benchmarker"

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

resource "aws_ecr_repository" "benchmarker" {
  name                 = "${var.env}/benchmarker"
  image_tag_mutability = "MUTABLE"
}
