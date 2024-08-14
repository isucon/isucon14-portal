data "aws_ami" "envcheck" {
  most_recent = true
  owners      = ["self"]
  filter {
    name   = "tag:Family"
    values = ["isucon14-envcheck"]
  }
}

data "aws_ami" "qualify" {
  most_recent = true
  owners      = ["self"]
  filter {
    name   = "tag:Family"
    values = ["isucon14-qualify"]
  }
}
