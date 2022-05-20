resource "aws_ecs_cluster" "main" {
  name = "${local.env}-${local.project}"
}

resource "aws_ecr_repository" "app" {
  name                 = "${local.env}/${local.project}/app"
  image_tag_mutability = "MUTABLE"
}

resource "aws_ecr_repository" "nginx" {
  name                 = "${local.env}/${local.project}/nginx"
  image_tag_mutability = "MUTABLE"
}
