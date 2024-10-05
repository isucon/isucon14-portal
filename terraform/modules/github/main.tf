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

resource "aws_iam_role" "main" {
  name               = "github-actions-ecr-push-example-role"
  assume_role_policy = data.aws_iam_policy_document.main_assume_role_policy.json
}

data "aws_iam_policy_document" "main_assume_role_policy" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

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
      for_each = var.github_repos
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
  role   = aws_iam_role.main.name
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
    resources = var.ecr_repositories
  }
}
