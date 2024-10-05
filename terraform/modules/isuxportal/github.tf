data "http" "github_actions_openid_configuration" {
  url = "https://token.actions.githubusercontent.com/.well-known/openid-configuration"
}

data "tls_certificate" "github_actions" {
  url = jsondecode(data.http.github_actions_openid_configuration.response_body).jwks_uri
}

resource "aws_iam_openid_connect_provider" "github_actions" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = data.tls_certificate.github_actions.certificates[*].sha1_fingerprint
}

resource "aws_iam_role" "push_image" {
  name               = "github-actions-ecr-push-role"
  assume_role_policy = data.aws_iam_policy_document.main_assume_role_policy.json
}

data "aws_iam_policy_document" "main_assume_role_policy" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity", "sts:TagSession"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github_actions.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    dynamic "condition" {
      for_each = ["isucon14", "isucon14-portal"]
      content {
        test     = "StringLike"
        variable = "token.actions.githubusercontent.com:sub"
        values   = ["repo:isucon/${condition.value}:*"]
      }
    }
  }
}

resource "aws_iam_role_policy" "main" {
  name   = "allow-ecr-push-image"
  role   = aws_iam_role.push_image.name
  policy = data.aws_iam_policy_document.main_policy.json
}

data "aws_iam_policy_document" "main_policy" {
  # ECR Login に必要
  statement {
    effect    = "Allow"
    actions   = ["ecr:GetAuthorizationToken"]
    resources = ["*"]
  }

  # `docker push/pull` に必要
  statement {
    effect = "Allow"
    actions = [
      "ecr:CompleteLayerUpload",
      "ecr:UploadLayerPart",
      "ecr:InitiateLayerUpload",
      "ecr:BatchCheckLayerAvailability",
      "ecr:PutImage",
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage",
    ]
    resources = [
      aws_ecr_repository.app.arn,
      aws_ecr_repository.nginx.arn,
      aws_ecr_repository.benchmarker.arn,
    ]
  }
}

resource "aws_iam_role" "update_taskdef" {
  name               = "github-actions-ecs-update-taskdef-role"
  assume_role_policy = data.aws_iam_policy_document.update_taskdef_assume_role_policy.json
}

data "aws_iam_policy_document" "update_taskdef_assume_role_policy" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity", "sts:TagSession"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github_actions.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    dynamic "condition" {
      for_each = ["isucon14", "isucon14-portal"]
      content {
        test     = "StringLike"
        variable = "token.actions.githubusercontent.com:sub"
        values   = ["repo:isucon/${condition.value}:*"]
      }
    }
  }
}

resource "aws_iam_role_policy" "update_taskdef" {
  name   = "allow-ecs-update-taskdef"
  role   = aws_iam_role.update_taskdef.name
  policy = data.aws_iam_policy_document.update_taskdef_policy.json
}

data "aws_iam_policy_document" "update_taskdef_policy" {
  statement {
    effect    = "Allow"
    actions   = ["ecs:RegisterTaskDefinition"]
    resources = ["*"]
  }

  statement {
    effect    = "Allow"
    actions   = ["iam:PassRole"]
    resources = [aws_iam_role.ecs-task.arn]
  }

  statement {
    effect  = "Allow"
    actions = ["ecs:UpdateService", "ecs:DescribeServices"]
    resources = [
      "arn:aws:ecs:ap-northeast-1:${data.aws_caller_identity.current.account_id}:service/${var.env}-${var.project}/*",
      "arn:aws:ecs:ap-northeast-1:${data.aws_caller_identity.current.account_id}:service/${var.env}-benchmarker/*",
    ]
  }

  statement {
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["${var.tfstate_bucket}/*"]
  }

  statement {
    effect    = "Allow"
    actions   = ["application-autoscaling:DescribeScalableTargets"]
    resources = ["*"]
  }

  statement {
    effect    = "Allow"
    actions   = ["ecs:TagResource"]
    resources = ["arn:aws:ecs:ap-northeast-1:${data.aws_caller_identity.current.account_id}:task-definition/*"]
  }
}
