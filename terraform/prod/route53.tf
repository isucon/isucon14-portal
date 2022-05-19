resource "aws_route53_zone" "portal" {
  name    = "portal.isucon.net"
  comment = "for prod portal"
}
