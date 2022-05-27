resource "aws_sqs_queue" "activejob" {
  name = "${local.env}-${local.project}-activejob"

  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.activejob-dlq.arn
    maxReceiveCount     = 10
  })
}

resource "aws_sqs_queue" "activejob-dlq" {
  name = "${local.env}-${local.project}-activejob-dlq"
}
