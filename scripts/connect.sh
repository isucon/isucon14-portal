#/bin/sh -e

PROFILE="portal-stg"
CLUSTER="stg-portal"
ENDPOINT_TYPE="READER"

while getopts e:w OPT; do
	case $OPT in
		e) PROFILE="portal-$OPTARG"
		   CLUSTER="$OPTARG-portal" ;;
		w) ENDPOINT_TYPE="WRITER" ;;
	esac
done

export AWS_PROFILE="$PROFILE"
export AWS_DEFAULT_REGION="ap-northeast-1"

TASK=$(aws ecs describe-tasks --cluster "$CLUSTER" --tasks $(aws ecs list-tasks --cluster "$CLUSTER" | jq -r .taskArns[]) | jq -r '.. | select(.runtimeId? and .name == "bot") | "\(.taskArn)/\(.runtimeId)" | split("/")[1:] | join("_")')
echo "Bot Task: ${TASK}"

HOST=$(aws rds describe-db-cluster-endpoints | jq -r ".DBClusterEndpoints[] | select(.DBClusterIdentifier == \"$CLUSTER\" and .EndpointType == \"${ENDPOINT_TYPE}\").Endpoint")
echo "DB Host: ${HOST}"

aws ssm start-session --target "ecs:${TASK}" --document-name AWS-StartPortForwardingSessionToRemoteHost \
--parameters $(printf '{"host":["%s"],"portNumber":["3306"],"localPortNumber":["3306"]}' $HOST)
