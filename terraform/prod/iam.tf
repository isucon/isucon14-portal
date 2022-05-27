data "aws_iam_role" "admin" {
  name = "AdminRole"
}

resource "aws_iam_role" "rds-monitoring" {
  name = "${local.env}-${local.project}-rds-monitoring"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = ""
        Effect = "Allow"
        Principal = {
          Service = "monitoring.rds.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "rds-monitoring" {
  role       = aws_iam_role.rds-monitoring.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole"
}

resource "aws_iam_role" "ecs-task" {
  name = "${local.env}-${local.project}-ecs-task"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = ""
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_policy" "ecs-task" {
  name        = "${local.env}-${local.project}-ecs-task"
  path        = "/"
  description = ""

  policy = jsonencode(
    {
      Version = "2012-10-17"
      Statement = [
        {
          Effect = "Allow"
          Action = [
            "cloudwatch:Get*",
            "cloudwatch:List*",
            "cloudwatch:Put*",
            "logs:CreateLog*",
            "logs:Put*",
            "ecr:Get*",
            "ecr:List*",
            "ecr:Batch*",
            "s3:Get*",
            "s3:List*",
            "ssm:Describe*",
            "ssm:Get*",
            "ssm:List*",
            "iam:PassRole",
            "ssmmessages:CreateControlChannel",
            "ssmmessages:CreateDataChannel",
            "ssmmessages:OpenControlChannel",
            "ssmmessages:OpenDataChannel",
            "xray:Put*",
            "sqs:SendMessage",
            "sqs:ReceiveMessage",
            "sqs:DeleteMessage",
            "sqs:Get*",
          ]
          Resource = "*"
        }
      ]
    }
  )
}

resource "aws_iam_role_policy_attachment" "ecs-task" {
  role       = aws_iam_role.ecs-task.name
  policy_arn = aws_iam_policy.ecs-task.arn
}
