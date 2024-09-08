resource "aws_cloudfront_distribution" "portal" {
  enabled         = true
  is_ipv6_enabled = true
  comment         = "${var.env}-${var.project}"

  aliases = [
    var.fqdn.portal // APEX
  ]

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.wildcard-use1.arn
    minimum_protocol_version = "TLSv1.2_2019"
    ssl_support_method       = "sni-only"
  }

  logging_config {
    include_cookies = false
    bucket          = aws_s3_bucket.logs.bucket_domain_name
    prefix          = "cloudfront/portal/"
  }

  origin {
    origin_id   = "portal"
    domain_name = aws_route53_record.portal-lb.name

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_protocol_policy   = "https-only"
      origin_ssl_protocols     = ["TLSv1.2"]
      origin_keepalive_timeout = 30
      origin_read_timeout      = 35
    }
  }


  ordered_cache_behavior {
    path_pattern     = "/packs/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "portal"
    forwarded_values {
      query_string = false
      headers      = ["Host"]
      cookies {
        forward           = "whitelist"
        whitelisted_names = ["AWSALBAuthNonce", "AWSELBAuthSessionCookie*"]
      }
    }
    min_ttl                = 0
    default_ttl            = var.enable_auth ? 86400 : 31536000 // NOTE: stgで認証を書けているので認証切れた後にキャッシュされないようにしている
    max_ttl                = var.enable_auth ? 86400 : 31536000
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  ordered_cache_behavior {
    path_pattern     = "/api/audience/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "portal"
    forwarded_values {
      query_string = true
      headers      = ["Host", "Accept"]
      cookies {
        forward           = "whitelist"
        whitelisted_names = ["AWSALBAuthNonce", "AWSELBAuthSessionCookie*"]
      }

    }
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 300
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  ordered_cache_behavior {
    path_pattern     = "/api/contestant/dashboard"
    allowed_methods  = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "portal"
    forwarded_values {
      query_string = true
      headers      = ["Host", "Accept", "X-Csrf-Token", "User-Agent"]
      cookies {
        forward           = "whitelist"
        whitelisted_names = ["__Host-isuxportal_sess", "AWSALBAuthNonce", "AWSELBAuthSessionCookie*"]
      }
    }
    min_ttl                = 0
    default_ttl            = 15
    max_ttl                = 15
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  ordered_cache_behavior {
    path_pattern     = "/api/admin/dashboard"
    allowed_methods  = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "portal"
    forwarded_values {
      query_string = true
      headers      = ["Host", "Accept", "X-Csrf-Token", "User-Agent"]
      cookies {
        forward           = "whitelist"
        whitelisted_names = ["__Host-isuxportal_sess", "AWSALBAuthNonce", "AWSELBAuthSessionCookie*"]
      }
    }
    min_ttl                = 0
    default_ttl            = 15
    max_ttl                = 15
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }


  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "portal"
    forwarded_values {
      query_string = true
      headers      = ["Host", "Accept", "X-Csrf-Token", "User-Agent"]
      cookies {
        forward           = "whitelist"
        whitelisted_names = ["__Host-isuxportal_sess", "AWSALBAuthNonce", "AWSELBAuthSessionCookie*"]
      }
    }
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}
