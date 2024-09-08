module "dns" {
  source      = "../modules/dns"
  fqdn_xx     = "xiv.isucon.jp"
  fqdn_portal = "portal.isucon.jp"
}

module "isuxportal" {
  source = "../modules/isuxportal"
  providers = {
    aws.ue1 = aws.us-east-1
  }

  env     = local.env
  project = local.project

  fqdn = {
    xx     = "xiv.isucon.jp"
    portal = "portal.isucon.jp"
  }

  zone_id = {
    xx     = module.dns.zone_id.xx
    portal = module.dns.zone_id.portal
  }

  isuconx = "isucon14"

  aws_admin_role = "AWSReservedSSO_AdministratorAccess_71a4d573abfa63cc"

  aurora_serverless_configuration = {
    max_capacity = 4
    min_capacity = 0.5
  }


}

# module "ami" {
#   source  = "./modules/ami"
#   isuconx = "isucon14"
# }
