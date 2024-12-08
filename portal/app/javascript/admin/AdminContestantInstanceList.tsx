import { ApiError, ApiClient } from "../ApiClient";
import { AdminApiClient } from "./AdminApiClient";

import React from "react";
import { BrowserRouter, Navigate, Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { ErrorMessage } from "../ErrorMessage";
import { TimeDuration } from "../TimeDuration";
import { Timestamp } from "../Timestamp";
import { ContestantInstanceStatus } from "../ContestantInstanceStatus";
import type { ListContestantInstancesResponse } from "../../../proto/isuxportal/services/admin/contestant_instances_pb";
import type { GetCurrentSessionResponse } from "../../../proto/isuxportal/services/common/me_pb";
import type { ContestantInstance } from "../../../proto/isuxportal/resources/contestant_instance_pb";

type ListFilterProps = {
  teamId: string | null;
};
const ListFilter: React.FC<ListFilterProps> = (props: ListFilterProps) => {
  const [redirect, setRedirect] = React.useState<JSX.Element | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ListFilterProps>({
    defaultValues: props,
  });
  const onSubmit = handleSubmit((data) => {
    const search = new URLSearchParams();
    search.set("team_id", data.teamId || "");
    setRedirect(
      <Navigate
        to={{
          pathname: "/admin/contestant_instances",
          search: `?${search.toString()}`,
        }}
      />,
    );
  });

  return (
    <div className="block has-background-info-light card mt-5">
      {redirect}
      <div className="card-content">
        <form onSubmit={onSubmit}>
          <div className="columns">
            <div className="column is-3 field">
              <label className="has-text-info-dark label" htmlFor="AdminContestantInstanceListFilter-teamId">
                Team ID
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="AdminContestantInstanceListFilter-teamId"
                  {...register("teamId")}
                />
              </div>
            </div>
            <div className="column is-3 field">
              <button className="button is-link" type="submit">
                Filter
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export interface Props {
  session: GetCurrentSessionResponse;
  client: AdminApiClient;
  teamId: string | null;
}

export interface State {
  list: ListContestantInstancesResponse | null;
  error: Error | null;
}

export const AdminContestantInstanceList = (props: Omit<Props, "teamId">) => {
  const [query] = useSearchParams();
  return <AdminContestantInstanceListInternal {...props} teamId={query.get("team_id")} />;
};

class AdminContestantInstanceListInternal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      list: null,
      error: null,
    };
  }

  public componentDidMount() {
    this.updateList();
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps !== this.props) this.updateList();
  }

  async updateList() {
    try {
      const list = await this.props.client.listContestantInstances(
        this.props.teamId ? BigInt(this.props.teamId) : null,
      );
      this.setState({ list });
    } catch (error) {
      this.setState({ error });
    }
  }

  public render() {
    return (
      <>
        <header>
          <h1 className="title is-1">Contestant Instances</h1>
        </header>
        <main>
          {this.renderFilter()}
          {this.renderError()}
          {this.renderList()}
        </main>
      </>
    );
  }

  public renderError() {
    if (!this.state.error) return;
    return <ErrorMessage error={this.state.error} />;
  }

  renderFilter() {
    return <ListFilter teamId={this.props.teamId} />;
  }

  renderList() {
    if (!this.state.list) return <p>Loading...</p>;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cloud ID</th>
            <th>Team</th>
            <th>Number</th>
            <th>Private Address</th>
            <th>Public Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{this.state.list.contestantInstances!.map((ci, i) => this.renderContestantInstance(ci, i))}</tbody>
      </table>
    );
  }

  renderContestantInstance(ci: ContestantInstance, i: number) {
    const id = ci.id!.toString();
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>
          <a
            href={`https://ap-northeast-1.console.aws.amazon.com/ec2/v2/home?region=ap-northeast-1#InstanceDetails:instanceId=${ci.cloudId}`}
          >
            {ci.cloudId}
          </a>
        </td>
        <td className="isux-word-break-all">
          <Link to={`/admin/teams/${ci.team!.id}`}>
            {ci.team!.name} (#{ci.team!.id.toString()})
          </Link>
        </td>
        <td>{ci.number.toString()}</td>
        <td>{ci.privateIpv4Address}</td>
        <td>{ci.publicIpv4Address}</td>
        <td>
          <ContestantInstanceStatus status={ci.status!} />
        </td>
      </tr>
    );
  }
}
