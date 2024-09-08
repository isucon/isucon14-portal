resource "aws_route53_zone" "xx" {
  name = var.fqdn_xx
}
resource "aws_route53_zone" "portal" {
  name = var.fqdn_portal
}

