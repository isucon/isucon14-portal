resource "aws_kms_key" "main" {
}

resource "aws_kms_alias" "main" {
  name          = "alias/${local.env}-${local.project}"
  target_key_id = aws_kms_key.main.id
}
