terraform {
  backend "s3" {
    profile = "portal-prod"
    region  = "ap-northeast-1"

    bucket = "tfstate-isucon14-portal-prod"
    key    = "terraform.tfstate"
  }
}
