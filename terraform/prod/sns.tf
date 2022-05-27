resource "aws_sns_topic" "chatbot" {
  name = "${local.env}-${local.project}-chatbot"
}
