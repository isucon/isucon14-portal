# Isuxportal

## Setup

### Run MySQL on docker-compose

```
docker compose up -d mysql
```

(config/database.yml defaults to randomly exposed port of the mysql container)

### Dependencies
- libmysqlclient
- ruby
  - 注：OpenSSL >= 3.x なら ruby >= 3.1 が必要
- gem
- bundler
- yarn


## Set Platform
Gemfile.lock に必要な実行環境を追加。
現状は

- x86_64-linux
  - WSL2, 本番環境用
- universal-darwin
  - macos用

see: `gem help platform`
https://docs.komagata.org/5926

```
yarn
bundle install
bundle exec rake db:migrate
```

localから実行するときは
```
export DATABASE_URL="mysql2://isuxportal_dev:dbpass@127.0.0.1:3306/isuxportal_dev?encoding=utf8mb4&charset=utf8mb4&collation=utf8mb4_general_ci" && bundle exec rake db:migrate
```
そのうちどうにかします

## Run

```
# NODE_OPTIONS は OpenSSL 3.x 時のみ
NODE_OPTIONS=--openssl-legacy-provider npx webpack --progress --watch
bundle exec rails s
```

localから実行するときは
```bash
export DATABASE_URL="mysql2://isuxportal_dev:dbpass@127.0.0.1:3306/isuxportal_dev?encoding=utf8mb4&charset=utf8mb4&collation=utf8mb4_general_ci" && bundle exec rails s
```
そのうちどうにかします

## Environment Variables

`./config/environments`参照

- `ISUXPORTAL_SLACK_WEBHOOK_URL`
- `ISUXPORTAL_GITHUB_CLIENT_ID` `ISUXPORTAL_GITHUB_CLIENT_SECRET`
  - scope: `keys:read`
- `ISUXPORTAL_DISCORD_CLIENT_ID` `ISUXPORTAL_DISCORD_CLIENT_SECRET`
  - scope: `identity`
- `ISUXPORTAL_DISCORD_BOT_TOKEN`
- `ISUXPORTAL_DISCORD_SERVER_ID`
- `ISUXPORTAL_DISCORD_CHANNEL_ID`: アナウンスのチャンネル
- `ISUXPORTAL_DISCORD_CONTESTANT_ROLE_ID`
- `ISUXPORTAL_DISCORD_ADMIN_ROLE_ID`
- `ISUXPORTAL_DISCORD_CONTESTANT_FINAL_ROLE`: `'1'`で有効
- `ISUXPORTAL_DISCORD_CONTESTANT_FINAL_ROLE_ID`
- `ISUXPORTAL_DISCORD_CONTESTANT_QUALIFY_ROLE`: `'1'`で有効
- `ISUXPORTAL_DISCORD_CONTESTANT_QUALIFY_ROLE_ID`
- `ISUXPORTAL_DISCORD_SUPPORT_COMM_CHANNEL_ROLES`: `channelID1=roleID1,channelID2=roleID2`の形式

- `ISUXPORTAL_ADMIN_ONLY`
- `ISUXPORTAL_ADMIN_LOGIN`
- `ISUXPORTAL_ADMIN_PASSWORD`

- `ISUXPORTAL_MAX_TEAMS`: 最大チーム数 (非表示チームは含まない)
- `ISUXPORTAL_FINAL`: `'1'`で有効
- `ISUXPORTAL_TIMING_REGISTRATION_OPEN`
- `ISUXPORTAL_TIMING_REGISTRATION_CLOSE`
- `ISUXPORTAL_TIMING_REGISTRATION_INVITATION_CLOSE`
- `ISUXPORTAL_TIMING_REGISTRATION_UPDATE_CLOSE`

- `ISUXPORTAL_TIMING_CONTEST_START`
- `ISUXPORTAL_TIMING_CONTEST_FREEZE`
- `ISUXPORTAL_TIMING_CONTEST_END`

- `ISUXPORTAL_BENCH_TOKEN`
- `ISUXPORTAL_BYPASS_SECRET`
- `ISUXPORTAL_CHECKER_SECRET`
- `ISUXPORTAL_SSH_KEY_API_SECRET`
- `ISUXPORTAL_DCIM_TOKEN`

- `ISUXPORTAL_TERMS_URL`: 規約へのリンク
- `ISUXPORTAL_RULES_URL`: レギュレーションへのリンク
- `ISUXPORTAL_DOCS_URL`: 当日マニュアルへのリンク

- `ISUXPORTAL_VAPID_PRIVATE_KEY`
- `ISUXPORTAL_VAPID_SUBJECT`

- `SENTRY_DSN`

## Dev Tips

### Seed

- `bundle exec rails db:seed` to generate dummy team and score data

### CloudFormationテンプレートについて

CloudFormationのテンプレートは`/app/models/cf_templates`に存在
チェッカーでのAMI IDのチェックに使われる値は`/app/controllers/api/env_checks_controller`に別で記載されているので、テンプレートの変更時はそこも変更することが必要

### Discord

- サーバー
  - テンプレートを利用
  - サーバーウィジェットを有効化すること
- アプリ
  - https://discord.com/developers/applications から作成
  - OAuth2 > Redirectsは`{host}/auth/discord/callback`
  - BOT
    1. OAuth2 > OAuth2 URL Generator > SCOPESで`bot`を選択 + 下のBOT PERMISSIONSで`Administrator`を選択
    2. URLをコピーしてアクセス
    3. BOTをサーバーに追加できる

### GitHub App

- Callback URLは`{host}/auth/github/callback`
- Expire user authorization tokensは無効
- Webhookは無効でOK
- 権限は「Account permissions > Git SSH keysをRead-only」のみ
