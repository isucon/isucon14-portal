import { AdminApiClient } from "./AdminApiClient";

import React from "react";
import { Link } from "react-router-dom";

import { ErrorMessage } from "../ErrorMessage";
import { AdminTeamTagList } from "./AdminTeamTagList";
import type {
  ListTeamsResponse,
  ListTeamsResponse_TeamListItem,
} from "../../../proto/isuxportal/services/admin/teams_pb";
import type { GetCurrentSessionResponse } from "../../../proto/isuxportal/services/common/me_pb";

export interface Props {
  session: GetCurrentSessionResponse;
  client: AdminApiClient;
}

export interface State {
  teamList: ListTeamsResponse | null;
  error: Error | null;
}

export class AdminTeamList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      teamList: null,
      error: null,
    };
  }

  public componentDidMount() {
    this.updateTeamList();
  }

  async updateTeamList() {
    try {
      const teamList = await this.props.client.listTeams();
      this.setState({ teamList });
    } catch (error) {
      this.setState({ error });
    }
  }
  public render() {
    return (
      <>
        <header>
          <h1 className="title is-1">参加チームリスト</h1>
        </header>
        <main>
          {this.renderError()}
          {this.renderTeamList()}
        </main>
      </>
    );
  }

  public renderError() {
    if (!this.state.error) return;
    return <ErrorMessage error={this.state.error} />;
  }

  renderTeamList() {
    if (!this.state.teamList) return <p>Loading...</p>;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Team name</th>
            <th>Members</th>
            <th>Flags</th>
          </tr>
        </thead>
        <tbody>{this.state.teamList.teams!.map((team, i) => this.renderTeam(team, i))}</tbody>
      </table>
    );
  }

  renderTeam(team: ListTeamsResponse_TeamListItem, i: number) {
    return (
      <tr key={team.teamId.toString()}>
        <td>{team.teamId.toString()}</td>
        <td>
          <Link to={`/admin/teams/${encodeURIComponent(team.teamId.toString())}`}>{team.name}</Link>
        </td>
        <td>
          {team.memberNames!.map((name, j) => (
            <span key={j} className="mr-1">
              {name}
            </span>
          ))}
        </td>
        <td>
          <AdminTeamTagList
            isStudent={team.isStudent!}
            withdrawn={team.withdrawn!}
            disqualified={team.disqualified!}
            hidden={team.hidden!}
            finalParticipation={team.finalParticipation!}
          />
        </td>
      </tr>
    );
  }
}
