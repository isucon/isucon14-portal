
data "aws_caller_identity" "current" {}
locals {
  root_user_arn = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"
}
