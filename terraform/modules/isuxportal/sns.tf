resource "aws_sns_topic" "chatbot" {
  name = "${var.env}-${var.project}-chatbot"
}
