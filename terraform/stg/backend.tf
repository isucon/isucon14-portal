terraform {
  backend "s3" {
    profile = "portal-stg"
    region  = "ap-northeast-1"

    bucket = "tfstate-isucon14-portal-stg"
    key    = "terraform.tfstate"
  }
}
