import { AdminApiClient } from "./AdminApiClient";

import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

import { ErrorMessage } from "../ErrorMessage";

import { AdminTeamEdit } from "./AdminTeamEdit";
import { Timestamp } from "../Timestamp";
import { AdminTeamTagList } from "./AdminTeamTagList";
import type { GetCurrentSessionResponse } from "../../../proto/isuxportal/services/common/me_pb";
import type { Team } from "../../../proto/isuxportal/resources/team_pb";
import type { Contestant } from "../../../proto/isuxportal/resources/contestant_pb";

export interface Props {
  session: GetCurrentSessionResponse;
  client: AdminApiClient;
  teamId: bigint;
}

export interface State {
  team: Team | null;
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
      error: null,
    };
  }

  public componentDidMount() {
    this.updateTeamInfo();
  }

  async updateTeamInfo() {
    try {
      const resp = await this.props.client.getTeam(this.props.teamId);
      this.setState({ team: resp.team! });
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

  public renderError() {
    if (!this.state.error) return;
    return <ErrorMessage error={this.state.error} />;
  }
}
