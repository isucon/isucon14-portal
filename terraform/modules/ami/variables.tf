variable "isuconx" {
  type        = string
  description = "isuconxx(xx is a number)"
}

variable "ami_account_ids" {
  type        = list(string)
  description = "AWS Account ID for AMI"
}
