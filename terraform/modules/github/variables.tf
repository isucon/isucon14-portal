variable "github_repos" {
  type = list(string)
}

variable "ecr_repositories" {
  type = list(string)
}

variable "task_role_arns" {
  type = list(string)
}

variable "service_arns" {
  type = list(string)
}
