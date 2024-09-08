resource "aws_elasticache_parameter_group" "redis6x" {
  name   = "${var.env}-${var.project}-redis6x"
  family = "redis6.x"

  parameter {
    name  = "timeout"
    value = "86400"
  }
}

resource "aws_elasticache_subnet_group" "main" {
  name        = "${var.env}-${var.project}"
  description = "for ${var.env} ${var.project}"
  subnet_ids = [
    aws_subnet.az-a.id,
    aws_subnet.az-c.id,
    aws_subnet.az-d.id,
  ]
}

resource "aws_elasticache_replication_group" "main" {
  replication_group_id = "${var.env}-${var.project}"
  description          = "for ${var.env} ${var.project}"
  engine_version       = "6.2"
  node_type            = "cache.t4g.small"
  num_cache_clusters   = 1
  port                 = 6379
  parameter_group_name = aws_elasticache_parameter_group.redis6x.name
  preferred_cache_cluster_azs = [
    "ap-northeast-1c",
  ]
  automatic_failover_enabled = false
  subnet_group_name          = aws_elasticache_subnet_group.main.name

  security_group_ids = [
    aws_security_group.internal.id,
  ]
}
