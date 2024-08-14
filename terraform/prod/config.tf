locals {
  env     = "prod"
  project = "portal"
}

provider "aws" {
  region = "ap-northeast-1"
  default_tags {
    tags = {
      Project = local.project
      Env     = local.env
    }
  }
}

provider "aws" {
  region = "us-east-1"
  alias  = "us-east-1"
  default_tags {
    tags = {
      Project = local.project
      Env     = local.env
    }
  }
}

terraform {
  required_version = "= 1.1.9"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 4.14.0"
    }
  }

  backend "s3" {
    bucket = "tfstate-prod-portal-isucon14"
    key    = "terraform.tfstate"
    region = "ap-northeast-1"
  }
}
