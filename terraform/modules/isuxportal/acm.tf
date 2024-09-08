resource "aws_acm_certificate" "wildcard" {
  domain_name               = var.fqdn.portal
  subject_alternative_names = ["*.${var.fqdn.portal}"]

  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate" "wildcard-use1" {
  provider = aws.ue1

  domain_name               = var.fqdn.portal
  subject_alternative_names = ["*.${var.fqdn.portal}"]

  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}
