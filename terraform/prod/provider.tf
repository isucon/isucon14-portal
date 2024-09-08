provider "aws" {
  profile = "portal-prod"
  region  = "ap-northeast-1"

  default_tags {
    tags = {
      Project = local.project
      Env     = local.env
    }
  }
}

provider "aws" {
  profile = "portal-prod"
  region  = "us-east-1"
  alias   = "us-east-1"

  default_tags {
    tags = {
      Project = local.project
      Env     = local.env
    }
  }
}
locals {
  env     = "prod"
  project = "portal"
}


