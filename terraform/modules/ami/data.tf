data "aws_ami" "envcheck" {
  most_recent = true
  owners      = var.ami_account_ids
  # https://docs.aws.amazon.com/cli/latest/reference/ec2/describe-images.html#:~:text=is%20UnauthorizedOperation%20.-,%2D%2Dfilters,-(list)
  filter {
    name   = "name"
    values = ["${var.isuconx}-envcheck-*"]
  }
}

data "aws_ami" "qualify" {
  most_recent = true
  owners      = var.ami_account_ids
  filter {
    name   = "image-id"
    values = ["ami-0540cf8b82b985755"]
  }
}
