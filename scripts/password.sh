#/bin/sh -e

PROFILE="portal-stg"

while getopts e:w OPT; do
	case $OPT in
		e) PROFILE="portal-$OPTARG" ;;
	esac
done

export AWS_PROFILE="$PROFILE"
export AWS_DEFAULT_REGION="ap-northeast-1"

SECRET=$(aws secretsmanager list-secrets | jq -r '.. | select(.Name? and (.Name | startswith("rds!"))) | .Name')
VALUE=$(aws secretsmanager get-secret-value --secret-id "${SECRET}" | jq -r .SecretString)

echo "${VALUE}" | jq -r .password
