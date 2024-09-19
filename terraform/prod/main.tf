module "dns" {
  source      = "../modules/dns"
  fqdn_xx     = "xiv.isucon.net"
  fqdn_portal = "portal.isucon.net"
}

module "isuxportal" {
  source = "../modules/isuxportal"
  providers = {
    aws.ue1 = aws.us-east-1
  }

  enable_auth         = true
  enable_auto_scaling = true

  env     = local.env
  project = local.project

  fqdn = {
    xx     = module.dns.fqdn.xx
    portal = module.dns.fqdn.portal
  }

  origins = [
    "https://${module.dns.fqdn.portal}",
    "https://${module.dns.fqdn.xx}",
  ]


  zone_id = {
    xx     = module.dns.zone_id.xx
    portal = module.dns.zone_id.portal
  }

  isuconx = "isucon14"

  aws_admin_role = "AWSReservedSSO_AdministratorAccess_41d64ba53efc15ee"

  aurora_serverless_configuration = {
    max_capacity = 16
    min_capacity = 0.5
  }



}

# module "ami" {
#   source  = "./modules/ami"
#   isuconx = "isucon14"
# }
