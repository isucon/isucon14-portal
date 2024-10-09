packer {
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = "~> 1"

    }
  }
}

variable "revision" {
  type    = string
  default = "unknown"
}

locals {
  name = "isucon14-contest-${formatdate("YYYYMMDD-hhmm", timestamp())}"
  ami_tags = {
    Project  = "portal"
    Family   = "isucon14-contest"
    Name     = "${local.name}"
    Revision = "${var.revision}"
    Packer   = "1"
  }
  run_tags = {
    Project = "portal"
    Name    = "packer-${local.name}"
    Packer  = "1"
    Ignore  = "1"
  }
}

data "amazon-ami" "ubuntu-noble" {
  filters = {
    name                = "ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"
    root-device-type    = "ebs"
    virtualization-type = "hvm"
  }
  most_recent = true
  owners      = ["099720109477"]
  region      = "ap-northeast-1"
}

source "amazon-ebs" "contest" {
  ami_name    = "${local.name}"
  ami_regions = ["ap-northeast-1"]

  tags          = local.ami_tags
  snapshot_tags = local.ami_tags

  source_ami    = "${data.amazon-ami.ubuntu-noble.id}"
  region        = "ap-northeast-1"
  instance_type = "t3.micro"

  run_tags        = local.run_tags
  run_volume_tags = local.run_tags

  ssh_interface           = "public_ip"
  ssh_username            = "ubuntu"
  temporary_key_pair_type = "ed25519"
}

build {
  sources = ["source.amazon-ebs.contest"]

  provisioner "file" {
    destination = "/dev/shm/isucon-env-checker"
    source      = "./isucon-env-checker/isucon-env-checker"
  }

  provisioner "file" {
    destination = "/dev/shm/run-isucon-env-checker.sh"
    source      = "./run-isucon-env-checker.sh"
  }

  provisioner "file" {
    destination = "/dev/shm/isucon-env-checker.service"
    source      = "./isucon-env-checker.service"
  }

  provisioner "file" {
    destination = "/dev/shm/isucon-admin.pub"
    source      = "./isucon-admin.pub"
  }

  provisioner "shell" {
    inline = [
      # Write REVISION
      "sudo sh -c 'echo ${var.revision} > /etc/REVISION'",

      # Install isucon-env-checker
      "sudo mv /dev/shm/isucon-env-checker /usr/local/bin/isucon-env-checker",
      "sudo chown root:root /usr/local/bin/isucon-env-checker",
      "sudo chmod 755 /usr/local/bin/isucon-env-checker",

      # Install run-isucon-env-checker.sh
      "sudo mkdir /opt/isucon-env-checker",
      "sudo mv /dev/shm/run-isucon-env-checker.sh /opt/isucon-env-checker/run-isucon-env-checker.sh",
      "sudo chown root:root /opt/isucon-env-checker/run-isucon-env-checker.sh",
      "sudo chmod 700 /opt/isucon-env-checker/run-isucon-env-checker.sh",

      # Install isucon-env-checker.service
      "sudo mv /dev/shm/isucon-env-checker.service /etc/systemd/system/isucon-env-checker.service",
      "sudo chown root:root /etc/systemd/system/isucon-env-checker.service",
      "sudo systemctl daemon-reload",
      "sudo systemctl enable isucon-env-checker.service",

      # Create isucon user
      "sudo useradd -m -p '*' isucon",
      "sudo mkdir -p /home/isucon/.ssh",
      "sudo chmod 700 /home/isucon/.ssh",
      "sudo chown -R isucon:isucon /home/isucon/.ssh",

      # Create isucon-admin user
      "sudo useradd -s /bin/bash -m -p '*' isucon-admin",
      "sudo mkdir -p /home/isucon-admin/.ssh",
      "sudo mv /dev/shm/isucon-admin.pub /home/isucon-admin/.ssh/authorized_keys",
      "sudo chmod 700 /home/isucon-admin/.ssh",
      "sudo chmod 600 /home/isucon-admin/.ssh/authorized_keys",
      "sudo chown -R isucon-admin:isucon-admin /home/isucon-admin/.ssh",
      "echo 'isucon-admin ALL=(ALL) NOPASSWD:ALL' | sudo tee /etc/sudoers.d/isucon-admin",

      # Remove authorized_keys for packer
      "sudo truncate -s 0 /home/ubuntu/.ssh/authorized_keys",
      "sudo truncate -s 0 /etc/machine-id",
    ]
  }
}
