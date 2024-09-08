output "fqdn" {
  value = {
    xx     = aws_route53_zone.xx.name
    portal = aws_route53_zone.portal.name
  }
}

output "zone_id" {
  value = {
    xx     = aws_route53_zone.xx.zone_id
    portal = aws_route53_zone.portal.zone_id
  }
}
