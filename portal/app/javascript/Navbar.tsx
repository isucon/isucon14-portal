import * as Rails from "@rails/ujs";
import { ApiClient } from "./ApiClient";

import React from "react";
import { Link } from "react-router-dom";

import { Contest_Status } from "../../proto/isuxportal/resources/contest_pb";
import type { GetCurrentSessionResponse } from "../../proto/isuxportal/services/common/me_pb";

export interface Props {
  session: GetCurrentSessionResponse;
  client: ApiClient;
}

export interface State {}

export class Navbar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <nav className="navbar isux-navbar" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <img src="/isucon14_logo_white.png" />
            </Link>
          </div>
          <div className="navbar-menu is-active">
            <div className="navbar-start">
              <Link className="navbar-item" to="/teams">
                チーム一覧
              </Link>
              <a className="navbar-item" href="/terms" target="_blank" rel="noreferrer noopener">
                規約
              </a>
              {this.renderRulesButton()}
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  {this.renderNavbarContestButton()}
                  {this.renderMyPageButton()}
                  {this.renderNavbarLoginButtons()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  public renderRulesButton() {
    const status = this.props.session.contest?.status;
    if (status !== Contest_Status.STANDBY && status !== Contest_Status.REGISTRATION) {
      return (
        <a className="navbar-item" href="/rules" target="_blank" rel="noreferrer noopener">
          レギュレーション
        </a>
      );
    }
    return null;
  }

  public renderNavbarContestButton() {
    return this.props.session.contest?.status === Contest_Status.STARTED && this.props.session.contestant ? (
      <a className="button is-light" href="/contestant">
        競技ページ
      </a>
    ) : null;
  }

  public renderMyPageButton() {
    return (
      <a className="button is-light" href="/registration">
        {this.props.session.contestant ? "マイページ" : "参加登録"}
      </a>
    );
  }

  public renderNavbarLoginButtons() {
    if (this.props.session.contestant) {
      return (
        <>
          <a className="button is-light" href="/session" onClick={this.onLogout.bind(this)}>
            ログアウト
          </a>
        </>
      );
    } else {
      const replacedLoginPath =
        this.loginPath()
          .replace(/back_to=[^&]+&?/, "")
          .replace(/\?$/, "") +
        "?back_to=" +
        encodeURIComponent("/registration");
      return (
        <>
          <a
            className="button is-light"
            href={
              this.props.session.contest?.status === Contest_Status.REGISTRATION ? replacedLoginPath : this.loginPath()
            }
          >
            ログイン
          </a>
        </>
      );
    }
  }

  loginPath() {
    return (document.querySelector('meta[name="isux:github-auth-path"]')! as HTMLMetaElement).content;
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
