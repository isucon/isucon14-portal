resource "aws_acm_certificate" "wildcard" {
  domain_name               = aws_route53_zone.portal.name
  subject_alternative_names = ["*.${aws_route53_zone.portal.name}"]

  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate" "wildcard-use1" {
  provider = aws.us-east-1

  domain_name               = aws_route53_zone.portal.name
  subject_alternative_names = ["*.${aws_route53_zone.portal.name}"]

  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}
