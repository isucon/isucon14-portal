data "aws_ami" "envcheck" {
  most_recent = true
  owners      = ["self"]
  filter {
    name   = "tag:Family"
    values = ["isucon12-envcheck"]
  }
}
