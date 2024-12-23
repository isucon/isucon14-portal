import React from "react";
import AvatarEditor from "react-avatar-editor";
import { ApiClient } from "./ApiClient";

import { create } from "@bufbuild/protobuf";
import type { GetCurrentSessionResponse } from "../../proto/isuxportal/services/common/me_pb";
import { CreateTeamRequestSchema } from "../../proto/isuxportal/services/registration/create_team_pb";
import { JoinTeamRequestSchema } from "../../proto/isuxportal/services/registration/join_pb";
import {
  GetRegistrationSessionResponse_Status,
  UpdateRegistrationRequestSchema,
  type GetRegistrationSessionResponse,
} from "../../proto/isuxportal/services/registration/session_pb";
import { ErrorMessage } from "./ErrorMessage";

export interface Props {
  client: ApiClient;
  session: GetCurrentSessionResponse;
  inviteToken: string | undefined;
  registrationSession: GetRegistrationSessionResponse;
  updateRegistrationSession: () => void;
}

export interface State {
  teamName: string;
  name: string;
  emailAddress: string;
  isStudent: boolean;
  isInPerson: boolean;
  avatarurl: string;
  avatarfile: File | null;
  requesting: boolean;
  requestError: Error | null;
}

export class RegistrationForm extends React.Component<Props, State> {
  private editor: React.RefObject<AvatarEditor>;
  private input: React.RefObject<HTMLInputElement>;
  constructor(props: Props) {
    super(props);
    this.state = {
      teamName: this.props.registrationSession.team?.name ?? "",
      name: this.props.session.contestant?.name ?? "",
      emailAddress: this.props.registrationSession.team?.detail?.emailAddress ?? "",
      isStudent: this.props.session.contestant?.detail!.isStudent ?? false,
      isInPerson: this.props.session.contestant?.detail!.isInPerson ?? false,
      avatarurl: this.props.session.contestant?.detail!.avatarUrl ?? this.props.registrationSession.githubAvatarUrl,
      avatarfile: null,
      requesting: false,
      requestError: null,
    };

    this.editor = React.createRef();
    this.input = React.createRef();

    this.onLoad = this.onLoad.bind(this);
  }

  public async onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (this.state.requesting) return;
    try {
      this.setState({ requesting: true });
      if (this.state.avatarfile !== null) {
        const { url, uploadPresigned } = await this.props.client.getAvatarUrl();
        const blob = await this.cropImage();
        await this.uploadAvatar(uploadPresigned, blob);
        this.setState({ avatarurl: url });
      }

      if (this.isEditing()) {
        await this.updateRegistration();
      } else {
        if (this.props.registrationSession.team) {
          await this.joinTeam();
        } else {
          await this.createTeam();
        }
      }
      this.setState({ requestError: null, requesting: false });
      this.props.updateRegistrationSession();
    } catch (err) {
      this.setState({ requestError: err, requesting: false });
    }
  }

  public onChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value as unknown,
    } as Pick<State, keyof State>);
  }

  public onLoad(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    this.setState({ avatarfile: file });
  }

  public async cropImage() {
    if (this.editor === null) return new Blob();
    const canvas = this.editor.current?.getImageScaledToCanvas();
    if (canvas === undefined) return new Blob();

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to convert canvas to Blob."));
        }
      }, "image/png");
    });
    return blob;
  }

  createTeam() {
    return this.props.client.createTeam(
      create(CreateTeamRequestSchema, {
        teamName: this.state.teamName,
        emailAddress: this.state.emailAddress,
        name: this.state.name,
        isStudent: this.state.isStudent,
        isInPerson: this.state.isInPerson,
        avatarUrl: this.state.avatarurl,
      }),
    );
  }

  joinTeam() {
    return this.props.client.joinTeam(
      create(JoinTeamRequestSchema, {
        inviteToken: this.props.inviteToken,
        teamId: this.props.registrationSession.team!.id,
        name: this.state.name,
        isStudent: this.state.isStudent,
        isInPerson: this.state.isInPerson,
        avatarUrl: this.state.avatarurl,
      }),
    );
  }

  updateRegistration() {
    return this.props.client.updateRegistration(
      create(UpdateRegistrationRequestSchema, {
        teamName: this.state.teamName,
        emailAddress: this.state.emailAddress,
        name: this.state.name,
        isStudent: this.state.isStudent,
        isInPerson: this.state.isInPerson,
        avatarUrl: this.state.avatarurl,
      }),
    );
  }

  uploadAvatar(url: string, data: Blob) {
    // url に対して PUT リクエストを送信する
    return fetch(url, {
      method: "PUT",
      body: data,
      headers: {
        "Content-Type": "image/png",
      },
    });
  }

  isEditing() {
    return this.props.registrationSession.status == GetRegistrationSessionResponse_Status.JOINED;
  }

  public render() {
    return (
      <>
        <section className="mt-6">
          <h3 className="title is-3">{this.isEditing() ? "編集" : "詳細の入力"}</h3>
          <form onSubmit={this.onSubmit.bind(this)}>
            {this.renderTeamFormFields()}
            {this.renderContestantFormFields()}

            <div className="field">
              <div className="control">
                <button className="button is-primary" disabled={this.state.requesting}>
                  {this.isEditing() ? "保存" : "参加規約に同意して登録"}
                </button>
              </div>
              <p className="help">
                <a href="/terms" target="_blank">
                  参加規約を確認する
                </a>
              </p>
            </div>

            {this.renderError()}
          </form>
        </section>
      </>
    );
  }

  public renderTeamFormFields() {
    if (
      this.props.registrationSession.team &&
      this.props.registrationSession.team.leaderId != this.props.session.contestant?.id
    ) {
      const leader = this.props.registrationSession.team.leader!;
      return (
        <>
          <div className="field">
            <label className="label" htmlFor="fieldTeamName">
              チーム名
            </label>
            <div className="control">
              <input
                className="input"
                disabled
                id="fieldTeamName"
                value={this.props.registrationSession.team.name || ""}
              />
            </div>
            {this.isEditing() ? (
              <p className="help">
                代表者 {leader.name}{" "}
                のチームへ参加しています。チーム名・代表者メールアドレスは代表者のみが変更可能です。
              </p>
            ) : (
              <p className="help">招待を利用し、代表者 {leader.name} のチームへ参加します。</p>
            )}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="field">
            <label className="label" htmlFor="fieldTeamName">
              チーム名
            </label>
            <div className="control">
              <input
                className="input"
                required
                id="fieldTeamName"
                name="teamName"
                value={this.state.teamName}
                onChange={this.onChange.bind(this)}
              />
            </div>
            {this.isEditing() ? (
              <p className="help"></p>
            ) : (
              <p className="help">
                現在ログインしている方を代表とするチームを作成します。代表者は変更できません。既存のチームへ参加する場合、代表者もしくはチームメンバーの方より招待
                URL を受け取ってください。
              </p>
            )}
          </div>

          <div className="field">
            <label className="label" htmlFor="fieldEmailAddress">
              代表者メールアドレス
            </label>
            <div className="control">
              <input
                className="input"
                type="email"
                autoComplete="email"
                spellCheck={false}
                required
                id="fieldEmailAddress"
                name="emailAddress"
                value={this.state.emailAddress}
                onChange={this.onChange.bind(this)}
              />
            </div>
            <p className="help">確認メールなどは送信されません。</p>
          </div>
          <div className="field">
            <label className="label">オフライン会場での参加を希望しますか?</label>
            <div className="control">
              <label>
                <input
                  className="checkbox"
                  type="checkbox"
                  name="isInPerson"
                  checked={this.state.isInPerson}
                  onChange={this.onChange.bind(this)}
                />{" "}
                はい
              </label>
            </div>
            <p className="help">
              <a target="_blank" href="https://www.z-lodge.com">
                LODGE（ガーデンテラス紀尾井町17F）
              </a>
              での参加を希望する場合は、チェックを入れてください。
              なお、席に限りがありますので、希望者多数の場合は抽選でのご案内となります。
              詳細は後日当選者のみにご案内いたします。
            </p>
          </div>
        </>
      );
    }
  }

  public renderContestantFormFields() {
    return (
      <>
        <div className="field">
          <label className="label" htmlFor="fieldName">
            {!this.props.registrationSession.team ? "代表" : ""}選手名
          </label>
          <div className="control">
            <input
              className="input"
              required
              id="fieldName"
              name="name"
              value={this.state.name}
              onChange={this.onChange.bind(this)}
            />
          </div>
          <p className="help">
            公開されます。本名でなくて構いません (id, HN,
            その他匿名な記入でも問題ありません)。複数名の名前を記載することはできません (2
            人目以降の登録は、登録後確認できる招待URLを利用して、それぞれ個別に登録してください)。
          </p>
        </div>
        {this.renderAvatar()}
        <div className="field">
          <label className="label">学生ですか?</label>
          <div className="control">
            <label>
              <input
                className="checkbox"
                type="checkbox"
                name="isStudent"
                checked={this.state.isStudent}
                onChange={this.onChange.bind(this)}
              />{" "}
              はい
            </label>
          </div>
        </div>
      </>
    );
  }

  public renderAvatar() {
    return (
      <>
        <div className="field">
          <label className="label" htmlFor="fieldName">
            アイコン画像
          </label>
          <AvatarEditor
            ref={this.editor}
            image={this.state.avatarfile === null ? this.state.avatarurl : this.state.avatarfile}
            border={20}
            width={170}
            height={170}
            color={[255, 255, 255, 0.6]} // RGBA
          />
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              name="resume"
              accept="image/png, image/jpeg"
              ref={this.input}
              onChange={this.onLoad}
            />
            <span className="button is-info">変更</span>
          </label>
        </div>
      </>
    );
  }

  public renderError() {
    if (!this.state.requestError) return null;
    return <ErrorMessage error={this.state.requestError} />;
  }
}
