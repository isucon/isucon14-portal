import { ApiClient } from "./ApiClient";

import React from "react";

import { ErrorMessage } from "./ErrorMessage";

import { create } from "@bufbuild/protobuf";
import type { GetCurrentSessionResponse } from "../../proto/isuxportal/services/common/me_pb";
import {
  GetRegistrationSessionQuerySchema,
  GetRegistrationSessionResponse_Status,
  type GetRegistrationSessionResponse,
} from "../../proto/isuxportal/services/registration/session_pb";
import { RegistrationForm } from "./RegistrationForm";
import { RegistrationLogin } from "./RegistrationLogin";
import { RegistrationStatus } from "./RegistrationStatus";

export interface Props {
  session: GetCurrentSessionResponse;
  client: ApiClient;
}

export interface State {
  session: GetCurrentSessionResponse;
  registrationSession: GetRegistrationSessionResponse | null;
  teamId: bigint | undefined;
  inviteToken: string | undefined;
  edit: boolean;
  error: Error | null;
}

export class Registration extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const params = new URLSearchParams(document.location.search);
    this.state = {
      session: this.props.session,
      registrationSession: null,
      teamId: BigInt(params.get("team_id") || "0"),
      inviteToken: params.get("invite_token") || undefined,
      edit: false,
      error: null,
    };
  }

  public componentDidMount() {
    this.updateRegistrationSession();
  }

  async updateRegistrationSession() {
    try {
      const registrationSession = await this.props.client.getRegistrationSession(
        create(GetRegistrationSessionQuerySchema, {
          teamId: this.state.teamId,
          inviteToken: this.state.inviteToken,
        }),
      );
      let session = this.state.session;
      if (this.state.registrationSession) {
        // XXX: Contestant name might be updated inside the registration page, and it is only included in GetCurrentSession response, not available in GetRegistrationSession.
        session = await this.props.client.getCurrentSession();
      }
      this.setState({ session, registrationSession, edit: false });
    } catch (err) {
      this.setState({ error: err });
    }
  }

  enableEdit() {
    this.setState({ edit: true });
  }

  public render() {
    return (
      <>
        <header>
          <h1 className="title is-1">参加登録</h1>
        </header>
        <main>
          {this.renderError()}
          {this.renderPhase()}
        </main>
      </>
    );
  }

  public renderError() {
    if (!this.state.error) return;
    return <ErrorMessage error={this.state.error} />;
  }

  public renderPhase() {
    if (this.state.registrationSession) {
      // XXX: If invalid invite token, team.leader is empty.
      if (this.state.registrationSession.team && !this.state.registrationSession.team.leader) {
        return (
          <div className="message is-danger">
            <div className="message-body">無効な招待 URL です。</div>
          </div>
        );
      }
      const login = (
        <>
          {this.renderTeam()}
          <RegistrationLogin
            client={this.props.client}
            session={this.state.session}
            registrationSession={this.state.registrationSession}
          />
        </>
      );
      const disclaimer = (
        <section className="mt-6">
          <h3 className="title is-3">注意事項</h3>
          <ul>
            <li>ISUCON14 への参加には への同意が必要です。</li>
            <li>
              ・
              <a href="/terms" target="_blank">
                ISUCON14 参加規約
              </a>
              への同意が必要です。
            </li>
            <li>・ISUCON14 への参加は1〜3名を1チームとします。</li>
            <li>・参加メンバーの追加・変更は11月7日(木)19:00まで可能です。</li>
            <li>・選手の皆さんご自身で用意したDiscord・AWSのアカウントを用いて参加・実施します。</li>
            <li>・AWSアカウントは代表者のみ必要で、メンバー全員は必要ありません。</li>
            <li>・AWSはクレジットカードの登録が必要となりますので、学生の方は特にご注意ください。</li>
            <li>
              ・ご登録いただいたチーム名、選手名、アイコン画像は、ISUCON
              公式サイトおよびポータルなど上で広く公開されるほか、入賞時にお送りする記念品等に印字させていただく場合があります。
            </li>
            <li>・チーム名、選手名、アイコン画像に公序良俗に反するものを使わないでください。</li>
            <li>
              ・チーム名、選手名に機種依存文字・絵文字・HTMLタグなどが入っていた場合、サイトへの表示時に表現を変えさせていただく場合があります。
            </li>
            <li>・チーム名は他のチームと重複するものは使用できません。</li>
            <li>・GitHub アカウントの情報はチームメンバー内で共有されますのであらかじめご了承ください。</li>
            <li>
              ・競技進行のため、全参加者はサポート/アナウンス用の Discord サーバー
              (サポートチャット)への参加が必要です。Discord
              アカウントの情報は全参加者にも共有されますのであらかじめご了承ください。
            </li>
            <li>・参加登録が完了すると、他のチームへの参加はできなくなります。</li>
            <li>
              ・1人目 (チーム代表者) の登録後、チームメンバーを招待するための URL を確認することができます。招待 URL
              を共有し、チームメンバー全員の登録をしてください。
            </li>
            <li>
              ・参加登録メールなどは送信されません。個別の連絡や、Discord
              が利用できない場合を想定してメールアドレスの記入をお願いしていますが、競技のアナウンスや連絡は、本ポータルサイトあるいは
              Discord 上で行われます。
            </li>
            <li>
              ・競技終了までは出題内容などのTweet、ブログ掲載、GitHubへの公開等をせず、他者へ漏らさないようお願いいたします。（ただし主催者が
              X(Twitter)、Web サイトにおいて公開している情報は除きます）
            </li>
            <li>
              ・その他に不正や運営の妨げになると判断した場合は、運営判断で参加をお断りしたり失格とする場合があります。ご注意ください。
            </li>
          </ul>
        </section>
      );
      switch (this.state.registrationSession.status) {
        case GetRegistrationSessionResponse_Status.NOT_LOGGED_IN:
          return login;
          break;
        case GetRegistrationSessionResponse_Status.CLOSED:
          return (
            <>
              {login}
              {disclaimer}
              <div className="message is-danger">
                <div className="message-body">
                  参加登録を現在受け付けていません (定員到達、締切後、もしくは受付開始前)
                </div>
              </div>
            </>
          );
          break;
        case GetRegistrationSessionResponse_Status.NOT_JOINABLE:
          return (
            <>
              {login}
              <div className="message is-danger">
                <div className="message-body">
                  招待元のチームメンバー数が上限に達しているため、この招待を利用して参加登録を進めることはできません。
                </div>
              </div>
            </>
          );
          break;
        case GetRegistrationSessionResponse_Status.CREATABLE:
        case GetRegistrationSessionResponse_Status.JOINABLE:
          return (
            <>
              {login}
              {disclaimer}
              <RegistrationForm
                client={this.props.client}
                session={this.state.session}
                inviteToken={this.state.inviteToken}
                registrationSession={this.state.registrationSession}
                updateRegistrationSession={this.updateRegistrationSession.bind(this)}
              />
            </>
          );
          break;
        case GetRegistrationSessionResponse_Status.JOINED:
          if (this.state.edit) {
            return (
              <RegistrationForm
                client={this.props.client}
                session={this.state.session}
                inviteToken={undefined}
                registrationSession={this.state.registrationSession}
                updateRegistrationSession={this.updateRegistrationSession.bind(this)}
              />
            );
          }
          return (
            <RegistrationStatus
              client={this.props.client}
              session={this.state.session}
              registrationSession={this.state.registrationSession}
              updateRegistrationSession={this.updateRegistrationSession.bind(this)}
              enableEdit={this.enableEdit.bind(this)}
            />
          );
          break;
        case GetRegistrationSessionResponse_Status.DISQUALIFIED:
          return (
            <>
              <div className="message is-danger">
                <div className="message-body">失格になっているため、参加登録ができません。</div>
              </div>
            </>
          );
      }
    } else {
      return <p>Loading...</p>;
    }
    const err = new Error("[BUG] undeterminable state");
    throw err;
  }

  renderTeam() {
    if (!this.state.registrationSession || !this.state.registrationSession.team) return;

    const team = this.state.registrationSession.team;
    return (
      <>
        <section className="mt-3">
          <h3 className="title is-3">チームから招待されています</h3>
          <p>
            {team.leader!.name} のチーム {team.name} からの招待を受諾して参加登録します。
          </p>
        </section>
      </>
    );
  }
}
