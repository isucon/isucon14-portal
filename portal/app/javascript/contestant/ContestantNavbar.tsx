import { ApiError, ApiClient } from "../ApiClient";
import * as Rails from "@rails/ujs";

import React from "react";
import { Link } from "react-router-dom";

import { ErrorMessage } from "../ErrorMessage";
import type { GetCurrentSessionResponse } from "../../../proto/isuxportal/services/common/me_pb";

export interface Props {
  session: GetCurrentSessionResponse;
  client: ApiClient;

  unreadNotificationExists: boolean;
}

export interface State {}

export class ContestantNavbar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <nav className="navbar is-info" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/contestant">
              ISUCON14 Contest
            </Link>
          </div>
          <div className="navbar-menu is-active">
            <div className="navbar-start">
              <Link className="navbar-item" to="/contestant">
                <span className="material-icons" aria-hidden={true}>
                  leaderboard
                </span>
                ダッシュボード
              </Link>
              <Link className="navbar-item" to="/contestant/contestant_instances">
                <span className="material-icons" aria-hidden={true}>
                  memory
                </span>
                サーバーリスト
              </Link>
              <Link className="navbar-item" to="/contestant/benchmark_jobs">
                <span className="material-icons" aria-hidden={true}>
                  local_fire_department
                </span>
                ベンチマーク
              </Link>
              <Link className="navbar-item" to="/contestant/clarifications">
                <span
                  className="material-icons"
                  aria-hidden={!this.props.unreadNotificationExists}
                  aria-label={this.props.unreadNotificationExists ? "未読あり" : ""}
                >
                  {this.props.unreadNotificationExists ? "mark_email_unread" : "email"}
                </span>
                質問/サポート
              </Link>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  <span className="material-icons" aria-hidden={true}>
                    sticky_note_2
                  </span>
                  ドキュメント
                </a>
                <div className="navbar-dropdown">
                  <a className="navbar-item" href="/teams">
                    チーム一覧
                  </a>
                  <a className="navbar-item" href="/terms">
                    規約
                  </a>
                  <a className="navbar-item" href="/rules">
                    レギュレーション
                  </a>
                  <a className="navbar-item" href="/docs">
                    当日マニュアル
                  </a>
                  <a className="navbar-item" href="/">
                    パブリックダッシュボード
                  </a>
                  <Link className="navbar-item" to="/contestant/discord">
                    Discord
                  </Link>
                </div>
              </div>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="media isux-navbar-contestant">
                  <div className="media-left">
                    <p className="image">
                      <img src={this.props.session.contestant!.detail!.avatarUrl} height={32} width={32} />
                    </p>
                  </div>
                  <div className="media-content">
                    <p className="">{this.props.session.contestant!.name}</p>
                    <div className="level is-size-7 is-mobile">
                      <div className="level-left">{this.props.session.team!.name}</div>
                      <div className="level-right">(チームID: {this.props.session.team!.id.toString()})</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="navbar-item">
                <div className="buttons"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  public renderNavbarLoginButtons() {
    return (
      <>
        <a className="button is-light" href="/session" onClick={this.onLogout.bind(this)}>
          ログアウト
        </a>
      </>
    );
  }

  onLogout(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/session";
    document.body.appendChild(form);

    const csrfToken = document.createElement("input");
    csrfToken.type = "hidden";
    csrfToken.name = Rails.csrfParam() || "";
    csrfToken.value = Rails.csrfToken() || "";
    form.appendChild(csrfToken);

    const method = document.createElement("input");
    method.type = "hidden";
    method.name = "_method";
    method.value = "delete";
    form.appendChild(method);

    form.submit();
  }
}
