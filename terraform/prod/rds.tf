resource "aws_rds_cluster_parameter_group" "main" {
  name        = "${local.env}-${local.project}-mysql8"
  family      = "aurora-mysql8.0"
  description = "${local.env} ${local.project} aurora cluster parameter group"

  parameter {
    apply_method = "immediate"
    name         = "character_set_client"
    value        = "utf8mb4"
  }
  parameter {
    apply_method = "immediate"
    name         = "character_set_connection"
    value        = "utf8mb4"
  }
  parameter {
    apply_method = "immediate"
    name         = "character_set_database"
    value        = "utf8mb4"
  }
  parameter {
    apply_method = "immediate"
    name         = "character_set_filesystem"
    value        = "utf8mb4"
  }
  parameter {
    apply_method = "immediate"
    name         = "character_set_results"
    value        = "utf8mb4"
  }
  parameter {
    apply_method = "immediate"
    name         = "character_set_server"
    value        = "utf8mb4"
  }
  parameter {
    apply_method = "immediate"
    name         = "collation_connection"
    value        = "utf8mb4_general_ci"
  }
}

resource "aws_db_parameter_group" "main" {
  name        = "${local.env}-${local.project}-aurora-mysql8"
  family      = "aurora-mysql8.0"
  description = "${local.env} ${local.project} aurora db parameter group"

  parameter {
    apply_method = "pending-reboot"
    name         = "log_output"
    value        = "FILE"
  }
  parameter {
    apply_method = "immediate"
    name         = "long_query_time"
    value        = "0.001"
  }
  parameter {
    apply_method = "immediate"
    name         = "max_allowed_packet"
    value        = "67108864"
  }
  parameter {
    apply_method = "immediate"
    name         = "max_connect_errors"
    value        = "999999999"
  }
  parameter {
    apply_method = "immediate"
    name         = "slow_query_log"
    value        = "1"
  }
}

resource "aws_db_subnet_group" "main" {
  name = "${local.env}-${local.project}"
  subnet_ids = [
    aws_subnet.az-a.id,
    aws_subnet.az-c.id,
    aws_subnet.az-d.id,
  ]

  tags = {
    Name = "${local.env}-${local.project}"
  }
}

resource "aws_rds_cluster" "main" {
  cluster_identifier = "${local.env}-${local.project}"
  engine             = "aurora-mysql"
  engine_version     = "8.0.mysql_aurora.3.02.0"
  master_username    = "root"
  master_password    = "dummydummy" // apply後に変更する

  preferred_backup_window         = "16:28-16:58"
  preferred_maintenance_window    = "wed:18:30-wed:19:00"
  db_subnet_group_name            = aws_db_subnet_group.main.name
  db_cluster_parameter_group_name = aws_rds_cluster_parameter_group.main.name
  vpc_security_group_ids = [
    aws_security_group.internal.id
  ]
  backup_retention_period = 7
  enabled_cloudwatch_logs_exports = [
    "error",
    "general",
    "slowquery",
  ]

  serverlessv2_scaling_configuration {
    max_capacity = 16
    min_capacity = 0.5
  }

  lifecycle {
    ignore_changes = [
      master_password,
    ]
  }
}

resource "aws_rds_cluster_instance" "main-1" {
  identifier                   = "${local.env}-${local.project}-1"
  cluster_identifier           = aws_rds_cluster.main.id
  engine                       = "aurora-mysql"
  instance_class               = "db.serverless"
  auto_minor_version_upgrade   = false
  preferred_maintenance_window = "wed:18:30-wed:19:00"
  db_parameter_group_name      = aws_db_parameter_group.main.name
  promotion_tier               = 1
  publicly_accessible          = false
  monitoring_interval          = 1
  monitoring_role_arn          = aws_iam_role.rds-monitoring.arn
  performance_insights_enabled = false
}
