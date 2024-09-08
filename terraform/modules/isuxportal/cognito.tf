resource "aws_cognito_user_pool" "developers" {
  name                = "${var.env}-${var.project}"
  username_attributes = ["email"]

  admin_create_user_config {
    allow_admin_create_user_only = true
  }
}

resource "aws_cognito_user_pool_client" "client" {
  name                                 = "${var.env}-${var.project}"
  generate_secret                      = true
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows = [
    "code",
  ]
  supported_identity_providers = ["COGNITO"]
  user_pool_id                 = aws_cognito_user_pool.developers.id

  callback_urls = [
    "https://${aws_lb.main.dns_name}/oauth2/idpresponse",
    "https://${var.fqdn.portal}/oauth2/idpresponse",
  ]

  allowed_oauth_scopes = ["openid", "aws.cognito.signin.user.admin"]
}

resource "aws_cognito_user_pool_domain" "domain" {
  domain       = "${var.env}-${var.project}-${var.isuconx}"
  user_pool_id = aws_cognito_user_pool.developers.id
}
