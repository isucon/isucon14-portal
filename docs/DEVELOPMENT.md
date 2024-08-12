# 開発環境

## ディレクトリ構成

```
.
├── bench-tool.go
│   ├── benchrun
│   └── testcli
├── docs
├── ecs
│   ├── nginx
│   ├── servicedef
│   └── taskdef
│       └── lib
├── envcheck
│   └── isucon-env-checker
├── materials
├── portal
│   ├── app
│   │   ├── assets
│   │   │   ├── config
│   │   │   ├── images
│   │   │   └── stylesheets
│   │   ├── controllers
│   │   │   ├── admin
│   │   │   ├── api
│   │   │   │   ├── admin
│   │   │   │   ├── audience
│   │   │   │   ├── bench
│   │   │   │   ├── contestant
│   │   │   │   └── registration
│   │   │   ├── concerns
│   │   │   ├── contestant
│   │   │   └── registration
│   │   ├── grpc
│   │   ├── helpers
│   │   ├── javascript
│   │   │   ├── admin
│   │   │   ├── broadcast_view
│   │   │   ├── contestant
│   │   │   └── packs
│   │   ├── jobs
│   │   ├── models
│   │   │   ├── cf_templates
│   │   │   └── concerns
│   │   └── views
│   │       ├── admin
│   │       │   ├── bypass_token
│   │       │   ├── impersonate
│   │       │   ├── root
│   │       │   └── sessions
│   │       ├── broadcast_view
│   │       ├── contestant
│   │       │   └── root
│   │       ├── layouts
│   │       ├── registration
│   │       │   └── registration
│   │       └── root
│   ├── bin
│   ├── config
│   │   ├── environments
│   │   ├── initializers
│   │   └── locales
│   ├── db
│   │   └── migrate
│   ├── lib
│   │   ├── assets
│   │   ├── google
│   │   │   └── protobuf
│   │   ├── isuxportal
│   │   │   ├── misc
│   │   │   │   └── bot
│   │   │   ├── resources
│   │   │   └── services
│   │   │       ├── admin
│   │   │       ├── audience
│   │   │       ├── bench
│   │   │       ├── common
│   │   │       ├── contestant
│   │   │       └── registration
│   │   ├── monkey_patches
│   │   └── tasks
│   ├── log
│   ├── public
│   ├── spec
│   │   ├── factories
│   │   └── models
│   ├── sw
│   │   └── src
│   ├── tmp
│   │   └── pids
│   ├── types
│   │   └── rails__ujs
│   └── vendor
├── proto
│   ├── google
│   │   └── protobuf
│   └── isuxportal
│       ├── misc
│       │   └── bot
│       ├── resources
│       └── services
│           ├── admin
│           ├── audience
│           ├── bench
│           ├── common
│           ├── contestant
│           └── registration
├── proto.go
│   └── isuxportal
│       ├── misc
│       │   └── bot
│       ├── resources
│       └── services
│           ├── admin
│           ├── audience
│           ├── bench
│           ├── common
│           ├── contestant
│           └── registration
├── supervisor
│   └── src
│       └── bin
└── terraform
    ├── prod
    └── stg
```



## bench-tool.go
ダミーのベンチマーカー。入力で指定された間隔で Fail / Success のレスポンスを supervisor に返す。
#### 技術スタック
- go

## ecs

ECS にデプロイするための設定群

- app(portal本体)
- benchmarker(ベンチマーカー)
- bot(Discord bot)
- notifyloop
  - 以下の二つの状況に対して運営に自動で 通知 を飛ばす
    - 150s 以上のベンチマーク実行
    - 2min 以上回答がされていない Clar

see: portal/app/jobs/long_running_check_job.rb

デプロイは [ecspresso](https://github.com/kayac/ecspresso) が使われている。

jsonnet が使われているので、VSCodeユーザーは Grafana.vscode-jsonnet を入れておくといい。

#### 技術スタック
- ecspresso
- docker
- sops
- awscli
- (jsonnet)


## envcheck

大会前に行われる環境構築チェック用のツール。ネットワークとか諸々必要な設定が構築されているか確認している。

#### 技術スタック
- go
- sops
- packer
- (cloudformation)

## materials
画像とか

## portal

portal 本体のコードが入っている。
- `app/grpc`
  - portal <-> supervisor 間の通信proto
- `app/javascript`
  - Admin Console のフロントエンド(React + Class Component)
- `app/models/cf_templates`
  - (たぶん) 大会前に行われる環境構築チェック用に使われる CloudFormation のテンプレート
- `bin/isuxportal-discord-bot`
  - Discord bot
- `config`
  - 設定ファイル群
    - Portalの環境変数
    - Railsの設定
    - newrelic の設定
- `db/migrate`
  - DB のマイグレーションファイル
- `lib/isuxportal`
  - portalのバック<->フロント間の通信protoのruby定義
- `spec`
  - RSpec のテストファイル
- `sw`
  - Service Worker の実装
- `types/rails__ujs`
  - https://github.com/rails/rails-ujs 
    - すでに public archive になってる・・・
    - というかRails 5.1.0 から公式になってるので外せそう

#### 技術スタック
- rails
- react
- proto
- rspec
  - Ruby のテストフレームワーク
- [shoryuken](https://github.com/ruby-shoryuken/shoryuken)
  - AWS SQS と連動した Active Job Worker
- [puma](https://github.com/puma/puma)
## proto

portal で使われる proto 定義

## proto.go

portal で使われる proto の go 定義


## supervisor

問題の benchmaker と portal の間に挟まって差分を吸収してくれるサービス

#### 技術スタック
- rust


## terraform

AWS に Portal をデプロイするための terraform

#### 技術スタック
- terraform