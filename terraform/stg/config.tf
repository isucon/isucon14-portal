locals {
  env = "stg"
}

provider "aws" {
  region = "ap-northeast-1"
  default_tags {
    tags = {
      Project = "portal"
      Env     = local.env
    }
  }
}

provider "aws" {
  region = "us-east-1"
  alias  = "us-east-1"
  default_tags {
    tags = {
      Project = "portal"
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
    bucket = "tfstate-stg-portal-isucon12"
    key    = "terraform.tfstate"
    region = "ap-northeast-1"
  }
}
