
data "aws_caller_identity" "current" {}
locals {
  env           = "stg"
  project       = "portal"
  root_user_arn = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"
}


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

terraform {
  backend "s3" {
    profile = "portal-stg"
    region  = "ap-northeast-1"

    bucket = "tfstate-isucon14-portal-stg"
    key    = "terraform.tfstate"
  }
}
