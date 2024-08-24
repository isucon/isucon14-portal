resource "aws_kms_key" "main" {
  policy = jsonencode({
    Id      = "key-consolepolicy-3"
    Version = "2012-10-17"
    Statement = [
      {
        Action = "kms:*"
        Effect = "Allow"
        Principal = {
          AWS = local.root_user_arn
        }
        Resource = "*"
        Sid      = "Enable IAM User Permissions"
      },
      {
        Action = [
          "kms:Create*",
          "kms:Describe*",
          "kms:Enable*",
          "kms:List*",
          "kms:Put*",
          "kms:Update*",
          "kms:Revoke*",
          "kms:Disable*",
          "kms:Get*",
          "kms:Delete*",
          "kms:TagResource",
          "kms:UntagResource",
          "kms:ScheduleKeyDeletion",
          "kms:CancelKeyDeletion",
        ]
        Effect = "Allow"
        Principal = {
          AWS = data.aws_iam_role.admin.arn
        }
        Resource = "*"
        Sid      = "Allow access for Key Administrators"
      },
      {
        Action = [
          "kms:Encrypt",
          "kms:Decrypt",
          "kms:ReEncrypt*",
          "kms:GenerateDataKey*",
          "kms:DescribeKey",
        ]
        Effect = "Allow"
        Principal = {
          AWS = [
            data.aws_iam_role.admin.arn,
            aws_iam_role.ecs-task.arn,
          ]
        }
        Resource = "*"
        Sid      = "Allow use of the key"
      },
      {
        Action = ["kms:CreateGrant", "kms:ListGrants", "kms:RevokeGrant"]
        Condition = {
          "Bool" = {
            "kms:GrantIsForAWSResource" = "true"
          }
        }
        Effect = "Allow"
        Principal = {
          AWS = data.aws_iam_role.admin.arn
        }
        Resource = "*"
        Sid      = "Allow attachment of persistent resources"
      }
    ]
  })
}

resource "aws_kms_alias" "main" {
  name          = "alias/${local.env}-${local.project}"
  target_key_id = aws_kms_key.main.id
}
