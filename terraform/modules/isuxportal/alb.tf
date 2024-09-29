resource "aws_lb" "main" {
  name               = "${var.env}-${var.project}"
  internal           = false
  load_balancer_type = "application"

  security_groups = [
    aws_security_group.internal.id,
    aws_security_group.http-https.id,
  ]

  subnets = [
    aws_subnet.az-a.id,
    aws_subnet.az-c.id,
    aws_subnet.az-d.id,
  ]

  access_logs {
    bucket  = aws_s3_bucket.logs.bucket
    prefix  = "alb-logs"
    enabled = true
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.main.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-FS-1-2-Res-2020-10"
  certificate_arn   = aws_acm_certificate.wildcard.arn

  default_action {
    type = "fixed-response"

    fixed_response {
      content_type = "text/plain"
      message_body = "Not Found"
      status_code  = 404
    }
  }
}

resource "aws_lb_target_group" "app" {
  name                 = "${var.env}-${var.project}-app2"
  port                 = 80
  protocol             = "HTTP"
  vpc_id               = aws_vpc.main.id
  target_type          = "ip"
  deregistration_delay = 30

  health_check {
    path                = "/site/sha"
    interval            = 12
    port                = 80
    protocol            = "HTTP"
    timeout             = 10
    healthy_threshold   = 2
    unhealthy_threshold = 10
    matcher             = "200-499"
  }
}



resource "aws_lb_listener_rule" "app_without_auth" {
  count        = var.enable_auth ? 1 : 0
  listener_arn = aws_lb_listener.https.arn
  priority     = 9

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }

  condition {
    host_header {
      values = [
        aws_route53_record.portal.name,
      ]
    }
  }
  condition {
    path_pattern {
      values = [
        "/api/env_check_info",
        "/api/env_checks",
      ]
    }
  }
}


resource "aws_lb_listener_rule" "app" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 10

  dynamic "action" {
    for_each = var.enable_auth ? [1] : []
    content {
      type = "authenticate-cognito"

      authenticate_cognito {
        user_pool_arn              = aws_cognito_user_pool.developers.arn
        user_pool_client_id        = aws_cognito_user_pool_client.client.id
        user_pool_domain           = aws_cognito_user_pool_domain.domain.domain
        on_unauthenticated_request = "authenticate"
        session_timeout            = "86400"
        session_cookie_name        = "AWSELBAuthSessionCookie"
      }
    }
  }

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }

  condition {
    host_header {
      values = [
        aws_route53_record.portal.name,
      ]
    }
  }
}

