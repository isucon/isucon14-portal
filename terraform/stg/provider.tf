provider "aws" {
  profile = "portal-stg"
  region  = "ap-northeast-1"

  default_tags {
    tags = {
      Project = local.project
      Env     = local.env
    }
  }
}

provider "aws" {
  profile = "portal-stg"
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
  env     = "stg"
  project = "portal"
}


