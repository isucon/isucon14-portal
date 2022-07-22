resource "aws_vpc" "main" {
  cidr_block           = "10.2.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "${local.env}-${local.project}-vpc"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${local.env}-${local.project}-igw"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "${local.env}-${local.project}-public"
  }
}

resource "aws_main_route_table_association" "public" {
  vpc_id         = aws_vpc.main.id
  route_table_id = aws_route_table.public.id
}

resource "aws_subnet" "az-a" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.2.0.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "ap-northeast-1a"
  tags = {
    Name = "${local.env}-${local.project}-az-a"
  }
}

resource "aws_subnet" "az-c" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.2.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "ap-northeast-1c"
  tags = {
    Name = "${local.env}-${local.project}-az-c"
  }
}

resource "aws_subnet" "az-d" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.2.2.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "ap-northeast-1d"
  tags = {
    Name = "${local.env}-${local.project}-az-d"
  }
}

resource "aws_subnet" "az-a-benchmarker" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.2.8.0/22"
  map_public_ip_on_launch = true
  availability_zone       = "ap-northeast-1a"
  tags = {
    Name = "${local.env}-${local.project}-az-a-benchmarker"
  }
}

resource "aws_subnet" "az-c-benchmarker" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.2.12.0/22"
  map_public_ip_on_launch = true
  availability_zone       = "ap-northeast-1c"
  tags = {
    Name = "${local.env}-${local.project}-az-c-benchmarker"
  }
}

resource "aws_subnet" "az-d-benchmarker" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.2.16.0/22"
  map_public_ip_on_launch = true
  availability_zone       = "ap-northeast-1d"
  tags = {
    Name = "${local.env}-${local.project}-az-d-benchmarker"
  }
}

resource "aws_security_group" "internal" {
  vpc_id = aws_vpc.main.id
  name   = "${local.env}-${local.project}-internal"

  ingress {
    description = "from myself"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    self        = true
  }

  egress {
    description      = "to any"
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = "${local.env}-${local.project}-internal"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_security_group" "http-https" {
  vpc_id = aws_vpc.main.id
  name   = "${local.env}-${local.project}-http-https"

  ingress {
    description = "http"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "https"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "${local.env}-${local.project}-http-https"
  }
}
