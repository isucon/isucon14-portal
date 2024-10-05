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

  enable_auth         = true
  enable_auto_scaling = false

  env     = local.env
  project = local.project

  fqdn = {
    xx     = module.dns.fqdn.xx
    portal = module.dns.fqdn.portal
  }

  origins = [
    "https://${module.dns.fqdn.portal}",
    "https://${module.dns.fqdn.xx}",
    "http://localhost:3000",
  ]

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
  tfstate_bucket = "arn:aws:s3:::tfstate-isucon14-portal-stg"
}


module "ami" {
  source  = "../modules/ami"
  isuconx = "isucon14"
}

