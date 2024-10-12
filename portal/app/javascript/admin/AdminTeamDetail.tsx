import { AdminApiClient } from "./AdminApiClient";

import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

import { ErrorMessage } from "../ErrorMessage";

import { AdminTeamEdit } from "./AdminTeamEdit";
import { AdminTeamCloudFormationDownloadButton } from "./AdminTeamCloudFormationDownloadButton";
import { Timestamp } from "../Timestamp";
import { AdminTeamTagList } from "./AdminTeamTagList";
import type { GetCurrentSessionResponse } from "../../../proto/isuxportal/services/common/me_pb";
import type { Team } from "../../../proto/isuxportal/resources/team_pb";
import type { Contestant } from "../../../proto/isuxportal/resources/contestant_pb";
import type { EnvCheck } from "../../../proto/isuxportal/resources/env_check_pb";

export interface Props {
  session: GetCurrentSessionResponse;
  client: AdminApiClient;
  teamId: bigint;
}

export interface State {
  team: Team | null;
  envChecks: EnvCheck[] | null;
  error: Error | null;
}

export const AdminTeamDetail = (props: Omit<Props, "teamId">) => {
  const { id: teamId } = useParams();
  if (!teamId) throw new Error("teamId is required");
  return <AdminTeamDetailInternal {...props} teamId={BigInt(teamId)} />;
};

class AdminTeamDetailInternal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      team: null,
      envChecks: null,
      error: null,
    };
  }

  public componentDidMount() {
    this.updateTeamInfo();
    this.updateEnvCheckList();
  }

  async updateTeamInfo() {
    try {
      const resp = await this.props.client.getTeam(this.props.teamId);
      this.setState({ team: resp.team! });
    } catch (error) {
      this.setState({ error });
    }
  }

  async updateEnvCheckList() {
    try {
      const resp = await this.props.client.listEnvChecks(this.props.teamId);
      this.setState({ envChecks: resp.envChecks });
    } catch (error) {
      this.setState({ error });
    }
  }

  public render() {
    return (
      <>
        <main>
          {this.renderError()}
          {this.renderContent()}
        </main>
      </>
    );
  }

  renderContent() {
    if (!this.state.team) return <p>Loading...</p>;
    return (
      <Routes>
        <Route
          path=""
          element={
            <>
              {this.renderTeam()}
              {this.renderMembers()}
              {this.renderEnvChecks()}
            </>
          }
        />
        <Route
          path="/edit"
          element={<AdminTeamEdit session={this.props.session} client={this.props.client} team={this.state.team} />}
        />
      </Routes>
    );
  }

  public renderTeam() {
    if (!this.state.team) return <p>Loading...</p>;
    return (
      <>
        <h3 className="title is-3">{this.state.team.name}</h3>
        <div className="card mt-5">
          <div className="card-header">
            <h5 className="card-header-title is-5">Details</h5>
          </div>
          <div className="card-content">
            <p className="subtitle">
              <AdminTeamTagList
                isStudent={this.state.team.student?.status ?? false}
                withdrawn={this.state.team.withdrawn!}
                disqualified={this.state.team.disqualified!}
                hidden={this.state.team.hidden!}
                finalParticipation={this.state.team.finalParticipation!}
              />
            </p>

            <div className="content">
              <p>ID: {this.state.team.id.toString()}</p>
              <p>
                代表者メールアドレス:{" "}
                <a href={`mailto:${this.state.team.detail!.emailAddress}`}>{this.state.team.detail!.emailAddress}</a>
              </p>
            </div>

            <div className="buttons">
              <Link to={`/admin/teams/${this.state.team.id}/edit`} className="button is-info">
                編集
              </Link>
              <AdminTeamCloudFormationDownloadButton client={this.props.client} teamId={this.state.team.id} type="test">
                事前チェック CloudFormationのダウンロード
              </AdminTeamCloudFormationDownloadButton>
              <AdminTeamCloudFormationDownloadButton
                client={this.props.client}
                teamId={this.state.team.id}
                type="qualify"
              >
                問題 CloudFormationのダウンロード
              </AdminTeamCloudFormationDownloadButton>
            </div>
            <div className="buttons">
              <Link to={`/admin/contestant_instances?team_id=${this.state.team.id}`} className="button">
                Contestant Instances
              </Link>
              <Link to={`/admin/benchmark_jobs?team_id=${this.state.team.id}`} className="button">
                Benchmark Jobs
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  renderMembers() {
    if (!this.state.team) return null;
    return this.state.team.members!.map((v) => this.renderMember(v));
  }

  renderMember(member: Contestant) {
    return (
      <div className="card mt-4" key={member.id.toString()}>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img src={member.detail!.avatarUrl || "https://avatars2.githubusercontent.com/u/10137?s=144"} />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-5">{member.name}</p>
              <p className="subtitle is-6">
                {member.detail!.isStudent ? <span className="tag is-info">学生</span> : null}
                <span>
                  GitHub:
                  <a href={`https://github.com/${member.detail!.githubLogin}`}>@{member.detail!.githubLogin}</a>
                </span>
                <span>
                  Discord:
                  {member.detail!.discordTag}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  public renderEnvChecks() {
    const envChecks = this.state.envChecks;
    let envCheckRows: React.ReactNode = (
      <tr>
        <td colSpan={8}>Loading</td>
      </tr>
    );
    if (envChecks) {
      if (envChecks.length > 0) {
        envCheckRows = envChecks.map((ec) => <AdminTeamEnvCheckRow envCheck={ec} />);
      } else {
        envCheckRows = (
          <tr>
            <td colSpan={8}>No result</td>
          </tr>
        );
      }
    }
    return (
      <div className="card mt-4">
        <div className="card-header">
          <h5 className="card-header-title is-5">チェッカー結果</h5>
        </div>
        <div className="card-content">
          <p className="subtitle">
            {this.teamHasPassedPreCheck() ? (
              <span className="tag is-success">競技環境確認完了済み</span>
            ) : (
              <span className="tag is-danger">競技環境確認未完了</span>
            )}
          </p>
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>IP</th>
                <th>Pass</th>
                <th>
                  <abbr title="Message">Msg</abbr>
                </th>
                <th>
                  <abbr title="AdminMessage">AdMsg</abbr>
                </th>
                <th>
                  <abbr title="RawData">Raw</abbr>
                </th>
                <th>
                  <abbr title="CreatedAt">At</abbr>
                </th>
              </tr>
            </thead>
            <tbody>{envCheckRows}</tbody>
          </table>
        </div>
      </div>
    );
  }

  teamHasPassedPreCheck() {
    return this.state.envChecks?.some((envCheck) => envCheck.name === "test-ssh" && envCheck.passed);
  }

  public renderError() {
    if (!this.state.error) return;
    return <ErrorMessage error={this.state.error} />;
  }
}

const AdminTeamEnvCheckRow = ({ envCheck }: { envCheck: EnvCheck }) => {
  type ModalName = "" | "message" | "adminMessage" | "rawData";
  const [openModalName, setOpenModalName] = useState<ModalName>("");
  const name = envCheck.name?.startsWith("qualify") ? (
    <span className="tag is-info">{envCheck.name}</span>
  ) : (
    <span className="tag is-light">{envCheck.name}</span>
  );
  const passed = envCheck.passed ? (
    <span className="tag is-success">
      <span className="material-icons-outlined">check</span>
    </span>
  ) : (
    <span className="tag is-danger">
      <span className="material-icons-outlined">close</span>
    </span>
  );
  const selectContent = (name: Exclude<ModalName, "">) => {
    switch (name) {
      case "message":
        return envCheck.message;
      case "adminMessage":
        return envCheck.adminMessage;
      case "rawData":
        return envCheck.rawData;
    }
    const check: never = name;
    throw new Error(`Unexpected openModalName: ${name}`);
  };
  const renderModal = () => {
    if (openModalName === "") return null;
    const content = selectContent(openModalName);
    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
          <pre>{content}</pre>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={() => setOpenModalName("")}></button>
      </div>
    );
  };
  return (
    <tr key={envCheck.id.toString()}>
      <td>{envCheck.id.toString()}</td>
      <td>{name}</td>
      <td>{envCheck.ipAddress}</td>
      <td>{passed}</td>
      <td onClick={() => setOpenModalName("message")}>
        <button className="button is-small">
          <span className="material-icons-outlined">launch</span>
        </button>
      </td>
      <td onClick={() => setOpenModalName("adminMessage")}>
        <button className="button is-small">
          <span className="material-icons-outlined">launch</span>
        </button>
      </td>
      <td onClick={() => setOpenModalName("rawData")}>
        <button className="button is-small">
          <span className="material-icons-outlined">launch</span>
        </button>
      </td>
      <td>
        <Timestamp timestamp={envCheck.createdAt!} />
      </td>
      {renderModal()}
    </tr>
  );
};
