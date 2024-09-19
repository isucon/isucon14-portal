variable "env" {
  type = string
}

variable "project" {
  type = string
}

variable "isuconx" {
  type        = string
  description = "isuconxx(xx is a number)"
}


variable "enable_auth" {
  type    = bool
  default = true
}

variable "enable_auto_scaling" {
  type    = bool
  default = false
}

variable "fqdn" {
  type = object({
    xx     = string
    portal = string
  })
}

variable "zone_id" {
  type = object({
    xx     = string
    portal = string
  })
}

variable "aws_admin_role" {
  type = string
}

variable "aurora_serverless_configuration" {
  type = object({
    max_capacity = number
    min_capacity = number
  })
  default = {
    max_capacity = 4
    min_capacity = 0.5
  }
}


variable "origins" {
  type = list(string)
}
