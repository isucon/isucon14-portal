import React from "react";
import { ApiClient } from "./ApiClient";

import { create } from "@bufbuild/protobuf";
import { Link } from "react-router-dom";
import type { Contestant } from "../../proto/isuxportal/resources/contestant_pb";
import { EnvCheckStatus } from "../../proto/isuxportal/resources/env_check_pb";
import type { GetCurrentSessionResponse } from "../../proto/isuxportal/services/common/me_pb";
import { ActivateCouponRequestSchema } from "../../proto/isuxportal/services/registration/activate_coupon_pb";
import type { GetRegistrationSessionResponse } from "../../proto/isuxportal/services/registration/session_pb";
import { ErrorMessage } from "./ErrorMessage";

export interface Props {
  client: ApiClient;
  session: GetCurrentSessionResponse;
  registrationSession: GetRegistrationSessionResponse;
  updateRegistrationSession: () => void;
  enableEdit: () => void;
}

export interface State {
  discordInviteUrl: string | undefined;
  error: Error | null;
}

export class RegistrationStatus extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      discordInviteUrl: undefined,
      error: null,
    };
  }

  componentDidMount() {
    fetch(`https://discord.com/api/guilds/${this.props.registrationSession.discordServerId}/widget.json`)
      .then((response) => response.json())
      .then(({ instant_invite }: { instant_invite: string }) => {
        this.setState({ discordInviteUrl: instant_invite });
      });
  }

  onEditButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    this.props.enableEdit();
  }

  async onWithdrawButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (!confirm("本当にキャンセルしてよろしいですか? この操作は元に戻すことができません。")) return;
    try {
      await this.props.client.deleteRegistration();
      alert("参加をキャンセルしました。");
      document.location.href = "/";
    } catch (error) {
      this.setState({ error });
    }
  }

  async onActivateCouponButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    event?.preventDefault();
    try {
      const teamId = this.props.registrationSession.team?.id;
      await this.props.client.activateCoupon(create(ActivateCouponRequestSchema, { teamId }));
      document.location.href = "/registration";
    } catch (error) {
      this.setState({ error });
    }
  }

  onCopyTargetInputClick(event: React.MouseEvent<HTMLInputElement>) {
    if (event.target instanceof HTMLInputElement) {
      event.target.select();
    }
  }

  onCopyCouponButtonClickIndex(index: number) {
    const c = this.props.registrationSession.coupon?.code;
    const code = c ? c[index] : "";
    return async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      await navigator.clipboard.writeText(code);
    };
  }

  async onCopyInviteButtonClick(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    await navigator.clipboard.writeText(this.props.registrationSession.memberInviteUrl);
  }

  public render() {
    return (
      <>
        <section className="isux-registration-status-complete mt-2">
          <h3 className="title is-3">登録完了</h3>
          <ol>
            <li>
              必要に応じ、下記より招待 URL をコピー & チームメンバーへ共有し、チームメンバーの参加登録を行ってください
              (代表者を含め 3 人まで)。
            </li>
            <li>
              代表者・メンバー問わず、Discord サーバーへ <b>必ず</b> 参加してください。各種アナウンスは原則 Discord
              もしくは本サイト (ポータル) において行われます。
            </li>
          </ol>
        </section>

        <div className="mt-3">
          <div className="columns">
            <section className="column is-6">
              <h4 className="title is-4">チーム: {this.props.registrationSession.team!.name}</h4>
              {this.renderStatus()}
              <div className="field">
                <label className="label">招待URL</label>
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <input
                      className="input"
                      type="text"
                      readOnly
                      value={this.props.registrationSession.memberInviteUrl}
                      onClick={this.onCopyTargetInputClick.bind(this)}
                    />
                  </div>
                  <div className="control">
                    <button className="button" onClick={this.onCopyInviteButtonClick.bind(this)}>
                      <span className="material-icons">content_copy</span>
                    </button>
                  </div>
                </div>
              </div>

              {this.props.registrationSession.coupon ? (
                <div className="field">
                  <label className="label">クーポン</label>
                  {this.renderCoupon()}
                </div>
              ) : null}

              <h5 className="title is-5 mt-3">メンバーリスト</h5>
              {this.renderTeamMembers()}
            </section>

            <section className="column is-6">
              <h4 className="title is-4">Discord</h4>
              <iframe
                src={`https://discord.com/widget?id=${this.props.registrationSession.discordServerId}&theme=dark`}
                width="350"
                height="500"
                allowTransparency={true}
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              ></iframe>
            </section>
          </div>
        </div>

        <section className="mt-3">
          <h4 className="title is-4">登録内容の編集</h4>
          <p className="block">
            <div className="buttons">
              <button className="button is-primary" onClick={this.onEditButtonClick.bind(this)}>
                編集
              </button>
            </div>
            選手名・学生申告といった登録内容の修正ができます。チーム名は代表者のみが変更可能です。
          </p>
          <p className="block">
            <div className="buttons">
              <a className="button is-primary" href={this.discordAuthPath()}>
                Discord再連携
              </a>
            </div>
            連携しているDiscordのアカウントを変更できます。
          </p>
          <p className="block">
            <button className="button is-danger" onClick={this.onWithdrawButtonClick.bind(this)}>
              辞退
            </button>
            <br />
            参加をキャンセルします。
            {this.props.registrationSession.team!.leaderId == this.props.session.contestant!.id ? (
              <strong>代表者のため、辞退するとチームとして参加辞退となります。</strong>
            ) : (
              <span>チームメンバーであるため、チームから離脱します (他のメンバーには影響しません)。</span>
            )}
          </p>
          {this.renderError()}
        </section>
      </>
    );
  }

  discordAuthPath() {
    return (document.querySelector('meta[name="isux:discord-auth-path"]') as HTMLMetaElement).content;
  }

  renderStatus() {
    const isSshKeySynced = this.props.registrationSession.team!.members!.every(
      (member) => member.detail!.isSshKeyRegistered,
    );
    const isDiscordSynced = this.props.registrationSession.team!.members!.every(
      (member) => member.detail!.isDiscordGuildMember,
    );
    const envCheckStatus = this.props.registrationSession.envCheckStatus;

    let message: React.ReactNode = "現時点での準備が整っています。次のアナウンスをお待ちください。";
    let isOk = true;
    if (!isDiscordSynced || !isSshKeySynced) {
      message = (
        <>
          参加準備が整っていません。
          <ul>
            {!isSshKeySynced && (
              <li>
                GitHubからSSHキーを取得できていないメンバーがいます。GitHubにSSHキーを登録していない場合、
                <a
                  target="_blank"
                  href="https://docs.github.com/ja/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account"
                >
                  新しいSSHキーを追加
                </a>
                し、本サイト (ポータル)に再ログインしてください。
              </li>
            )}
            {!isDiscordSynced && (
              <li>
                <a target="_blank" href={this.state.discordInviteUrl}>
                  Discordサーバーへの参加
                </a>
                が完了していないメンバーがいます。参加後しばらく経っても本サイト
                (ポータル)に反映されない場合、Discordサーバー内 #readme チャンネルのメッセージをご覧ください。
              </li>
            )}
          </ul>
        </>
      );
      isOk = false;
    } else if (envCheckStatus !== EnvCheckStatus.PREPARING && envCheckStatus !== EnvCheckStatus.DONE) {
      message = (
        <>
          参加準備が整っていません。<Link to="/registration/env_check">競技環境確認</Link>を行ってください。
        </>
      );
      isOk = false;
    }

    return (
      <div className={`notification ${isOk ? "is-info" : "is-danger"}`}>{this.renderConditions(isOk, message)}</div>
    );
  }

  renderCoupon() {
    if (this.props.registrationSession.coupon?.activate) {
      return (
        <div>
          <div className="field has-addons">
            <div className="field-label is-normal">
              <label className="label">AWS</label>
            </div>
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                readOnly
                value={
                  this.props.registrationSession.coupon?.code ? this.props.registrationSession.coupon?.code[0] : ""
                }
                onClick={this.onCopyTargetInputClick.bind(this)}
              />
            </div>
            <div className="control">
              <button className="button" onClick={this.onCopyCouponButtonClickIndex(0).bind(this)}>
                <span className="material-icons">content_copy</span>
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <button className="button is-info" onClick={this.onActivateCouponButtonClick.bind(this)}>
          クーポンを獲得
        </button>
      );
    }
  }

  renderTeamMembers() {
    return this.props.registrationSession.team!.members!.map((member) => this.renderTeamMember(member));
  }

  renderTeamMember(member: Contestant) {
    return (
      <div className="card mt-2 isux-registration-member-card" key={member.id.toString()}>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img src={member.detail!.avatarUrl || ""} />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-5">{member.name}</p>
              <p className="subtitle is-6">
                {this.props.registrationSession.team!.leaderId == member.id ? (
                  <span className="tag is-danger mr-1">代表者</span>
                ) : null}
                {member.detail!.isStudent ? <span className="tag is-info mr-1">学生</span> : null}
                GitHub @{member.detail!.githubLogin}, Discord {member.detail!.discordTag}
              </p>
            </div>
          </div>
          <div className="content">
            {this.renderConditionsBoolean(
              !!member.detail!.isSshKeyRegistered,
              "GitHubにSSH鍵が登録されています",
              "GitHubにSSH鍵が登録されていません",
            )}
            {this.renderConditionsBoolean(
              !!member.detail!.isDiscordGuildMember,
              "Discordサーバーに参加しています",
              "Discordサーバーに参加していません",
            )}
          </div>
        </div>
      </div>
    );
  }

  renderConditionsBoolean(isOk: boolean, okMessage: React.ReactNode, ngMessage: React.ReactNode) {
    return this.renderConditions(isOk, isOk ? okMessage : ngMessage);
  }

  renderConditions(isOk: boolean, message: React.ReactNode) {
    return (
      <span className="icon-text">
        <span className="icon">
          <span className={`material-icons-outlined status-${isOk ? "ok" : "ng"}`}>
            {isOk ? "check_circle" : "cancel"}
          </span>
        </span>
        <span>{message}</span>
      </span>
    );
  }

  renderError() {
    if (!this.state.error) return null;
    return <ErrorMessage error={this.state.error} />;
  }
}
