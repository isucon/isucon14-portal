resource "aws_vpc" "main" {
  cidr_block           = "10.1.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "${var.env}-${var.project}-vpc"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.env}-${var.project}-igw"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "${var.env}-${var.project}-public"
  }
}

resource "aws_main_route_table_association" "public" {
  vpc_id         = aws_vpc.main.id
  route_table_id = aws_route_table.public.id
}

resource "aws_subnet" "az-a" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.1.0.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "ap-northeast-1a"
  tags = {
    Name = "${var.env}-${var.project}-az-a"
  }
}

resource "aws_subnet" "az-c" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.1.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "ap-northeast-1c"
  tags = {
    Name = "${var.env}-${var.project}-az-c"
  }
}

resource "aws_subnet" "az-d" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.1.2.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "ap-northeast-1d"
  tags = {
    Name = "${var.env}-${var.project}-az-d"
  }
}

resource "aws_subnet" "az-a-benchmarker" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.1.8.0/22"
  map_public_ip_on_launch = true
  availability_zone       = "ap-northeast-1a"
  tags = {
    Name = "${var.env}-${var.project}-az-a-benchmarker"
  }
}

resource "aws_subnet" "az-c-benchmarker" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.1.12.0/22"
  map_public_ip_on_launch = true
  availability_zone       = "ap-northeast-1c"
  tags = {
    Name = "${var.env}-${var.project}-az-c-benchmarker"
  }
}

resource "aws_subnet" "az-d-benchmarker" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.1.16.0/22"
  map_public_ip_on_launch = true
  availability_zone       = "ap-northeast-1d"
  tags = {
    Name = "${var.env}-${var.project}-az-d-benchmarker"
  }
}

resource "aws_security_group" "internal" {
  vpc_id = aws_vpc.main.id
  name   = "${var.env}-${var.project}-internal"

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
    Name = "${var.env}-${var.project}-internal"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_security_group" "benchmarker" {
  vpc_id = aws_vpc.main.id
  name   = "${var.env}-${var.project}-benchmarker"

  ingress {
    description = "payment service"
    from_port   = 12345
    to_port     = 12345
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.env}-${var.project}-benchmarker"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_security_group" "http-https" {
  vpc_id = aws_vpc.main.id
  name   = "${var.env}-${var.project}-http-https"

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
    Name = "${var.env}-${var.project}-http-https"
  }
}
