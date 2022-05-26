resource "aws_acm_certificate" "wildcard" {
  domain_name       = "*.${aws_route53_zone.xii.name}"
  validation_method = "DNS"

  subject_alternative_names = [
	  aws_route53_zone.xii.name,
  ]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate" "wildcard-use1" {
  provider = aws.us-east-1

  domain_name       = "*.${aws_route53_zone.xii.name}"
  validation_method = "DNS"

  subject_alternative_names = [
	  aws_route53_zone.xii.name,
  ]

  lifecycle {
    create_before_destroy = true
  }
}
