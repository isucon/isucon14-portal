resource "aws_sqs_queue" "activejob" {
  name = "${var.env}-${var.project}-activejob"

  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.activejob-dlq.arn
    maxReceiveCount     = 10
  })
}

resource "aws_sqs_queue" "activejob-dlq" {
  name = "${var.env}-${var.project}-activejob-dlq"
}
