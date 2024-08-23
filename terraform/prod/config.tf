locals {
  env     = "prod"
  project = "portal"
}

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

terraform {
  backend "s3" {
    profile = "portal-prod"
    region  = "ap-northeast-1"

    bucket = "tfstate-isucon14-portal-prod"
    key    = "terraform.tfstate"
  }
}
