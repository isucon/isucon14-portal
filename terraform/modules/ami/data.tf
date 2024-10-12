data "aws_ami" "envcheck" {
  most_recent = true
  owners      = ["self"]
  filter {
    name   = "tag:Family"
    values = ["${var.isuconx}-envcheck"]
  }
}

data "aws_ami" "qualify" {
  most_recent = true
  owners      = ["self"]
  filter {
    name   = "tag:Family"
    values = ["${var.isuconx}"]
  }
}
