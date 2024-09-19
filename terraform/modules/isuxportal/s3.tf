resource "aws_s3_bucket" "logs" {
  bucket = "logs-${var.env}-${var.project}-${var.isuconx}"
}

// CloudFront の Access Logs は ACL が有効でないといけないのでACLを有効に
resource "aws_s3_bucket_ownership_controls" "logs" {
  bucket = aws_s3_bucket.logs.bucket
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "logs" {
  bucket = aws_s3_bucket.logs.bucket
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_acl" "logs_bucket_acl" {
  bucket = aws_s3_bucket.logs.id
  acl    = "private"
}

resource "aws_s3_bucket_public_access_block" "logs" {
  bucket              = aws_s3_bucket.logs.id
  block_public_acls   = true
  block_public_policy = true
}

resource "aws_s3_bucket_policy" "logs" {
  bucket = aws_s3_bucket.logs.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          # ELB用のAWSアカウントがアクセスログを書き込みにくる
          # https://docs.aws.amazon.com/ja_jp/elasticloadbalancing/latest/application/load-balancer-access-logs.html#access-logging-bucket-permissions
          AWS = "arn:aws:iam::582318560864:root"
        },
        Action   = "s3:PutObject"
        Resource = "${aws_s3_bucket.logs.arn}/alb-logs/*"
      },
      {
        Effect = "Allow"
        Principal = {
          Service = "delivery.logs.amazonaws.com"
        }
        Action   = "s3:PutObject"
        Resource = "${aws_s3_bucket.logs.arn}/alb-logs/*"
        Condition = {
          StringEquals = {
            "s3:x-amz-acl" = "bucket-owner-full-control"
          }
        }
      },
      {
        Effect = "Allow"
        Principal = {
          Service = "delivery.logs.amazonaws.com"
        }
        Action   = "s3:GetBucketAcl"
        Resource = aws_s3_bucket.logs.arn
      },
    ]
  })
}

resource "aws_s3_bucket" "config" {
  bucket = "config-${var.env}-${var.project}-${var.isuconx}"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "config" {
  bucket = aws_s3_bucket.config.bucket
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
resource "aws_s3_bucket_public_access_block" "config" {
  bucket              = aws_s3_bucket.config.id
  block_public_acls   = true
  block_public_policy = true
}


resource "aws_s3_bucket" "avatars" {
  bucket = "avatars-${var.env}-${var.project}-${var.isuconx}"
}

resource "aws_s3_bucket_public_access_block" "avatars" {
  bucket              = aws_s3_bucket.avatars.id
  block_public_acls   = true
  block_public_policy = false

}


// アバターは全てのユーザーが読み取れるように
resource "aws_s3_bucket_policy" "avatars" {
  bucket = aws_s3_bucket.avatars.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource = [
          "${aws_s3_bucket.avatars.arn}/*",
        ]
      },
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.avatars]
}


resource "aws_s3_bucket_cors_configuration" "avatars" {
  bucket = aws_s3_bucket.avatars.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST"]
    allowed_origins = var.origins
    max_age_seconds = 3000
  }

  cors_rule {
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
  }
}
