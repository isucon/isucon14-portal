resource "aws_route53_zone" "xii" {
  name    = "portal.isucon.net"
  comment = "for prod portal"
}

resource "aws_route53_record" "portal" {
  zone_id = aws_route53_zone.xii.zone_id
  name    = aws_route53_zone.xii.name // zone apex
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.portal.domain_name
    zone_id                = aws_cloudfront_distribution.portal.hosted_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "portal-lb" {
  zone_id = aws_route53_zone.xii.zone_id
  name    = "portal-lb.${aws_route53_zone.xii.name}"
  type    = "A"
  alias {
    name                   = aws_lb.main.dns_name
    zone_id                = aws_lb.main.zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "cert" {
  for_each = {
    for dvo in aws_acm_certificate.wildcard.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.xii.zone_id
}
