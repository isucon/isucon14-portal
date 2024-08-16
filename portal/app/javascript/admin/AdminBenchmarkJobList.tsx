import { isuxportal } from "../pb_admin";
import { ApiError, ApiClient } from "../ApiClient";
import { AdminApiClient } from "./AdminApiClient";

import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { ErrorMessage } from "../ErrorMessage";
import { TimeDuration } from "../TimeDuration";
import { Timestamp } from "../Timestamp";
import { BenchmarkJobStatus } from "../BenchmarkJobStatus";

import { AdminBenchmarkJobForm } from "./AdminBenchmarkJobForm";
import ReactPaginate from "react-paginate";

type ListFilterProps = {
  teamId: string | null;
  status: string | null;
  failedOnly: boolean;
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
    search.set("status", data.status ?? "");
    search.set("failed_only", data.failedOnly ? "1" : "0");
    setRedirect(
      <Navigate
        to={{
          pathname: "/admin/benchmark_jobs",
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
              <label className="has-text-info-dark label" htmlFor="AdminBenchmarkJobListFilter-teamId">
                Team ID
              </label>
              <div className="control">
                <input className="input" type="text" id="AdminBenchmarkJobListFilter-teamId" {...register("teamId")} />
              </div>
            </div>
            <div className="column is-3 field">
              <label className="has-text-info-dark label" htmlFor="AdminBenchmarkJobListFilter-status">
                Status
              </label>
              <div className="control">
                <div className="select" id="AdminBenchmarkJobListFilter-status">
                  <select {...register("status")}>
                    <option value={""}>-----</option>
                    <option value={isuxportal.proto.resources.BenchmarkJob.Status.PENDING.toString()}>PENDING</option>
                    <option value={isuxportal.proto.resources.BenchmarkJob.Status.RUNNING.toString()}>RUNNING</option>
                    <option value={isuxportal.proto.resources.BenchmarkJob.Status.ERRORED.toString()}>ERRORED</option>
                    <option value={isuxportal.proto.resources.BenchmarkJob.Status.CANCELLED.toString()}>
                      CANCELLED
                    </option>
                    <option value={isuxportal.proto.resources.BenchmarkJob.Status.FINISHED.toString()}>FINISHED</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="column is-3 field">
              <label className="has-text-info-dark label" htmlFor="AdminBenchmarkJobListFilter-failedOnly">
                Failed only
              </label>
              <div className="control">
                <input type="checkbox" id="AdminBenchmarkJobListFilter-failedOnly" {...register("failedOnly")} />
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
  session: isuxportal.proto.services.common.GetCurrentSessionResponse;
  client: AdminApiClient;
  teamId: string | null;
  status: isuxportal.proto.resources.BenchmarkJob.Status | null;
  failedOnly: boolean;
}

export interface State {
  list: isuxportal.proto.services.admin.ListBenchmarkJobsResponse | null;
  error: Error | null;
  pageCount: number;
  currentPage: number;
}

const parseBenchmarkJobStatus = (
  statusString: string | null,
): isuxportal.proto.resources.BenchmarkJob.Status | null => {
  if (statusString === null || statusString === "") return null;

  const status = +statusString;

  switch (status) {
    case isuxportal.proto.resources.BenchmarkJob.Status.PENDING:
      return isuxportal.proto.resources.BenchmarkJob.Status.PENDING;
    case isuxportal.proto.resources.BenchmarkJob.Status.RUNNING:
      return isuxportal.proto.resources.BenchmarkJob.Status.RUNNING;
    case isuxportal.proto.resources.BenchmarkJob.Status.ERRORED:
      return isuxportal.proto.resources.BenchmarkJob.Status.ERRORED;
    case isuxportal.proto.resources.BenchmarkJob.Status.CANCELLED:
      return isuxportal.proto.resources.BenchmarkJob.Status.CANCELLED;
    case isuxportal.proto.resources.BenchmarkJob.Status.FINISHED:
      return isuxportal.proto.resources.BenchmarkJob.Status.FINISHED;
  }
  console.warn("Unexpected status", status);
  return null;
};

export const AdminBenchmarkJobList = (props: Omit<Props, "teamId" | "status" | "failedOnly">) => {
  const [query] = useSearchParams();
  return (
    <AdminBenchmarkJobListInternal
      {...props}
      teamId={query.get("team_id")}
      status={parseBenchmarkJobStatus(query.get("status"))}
      failedOnly={query.get("failed_only") === "1"}
    />
  );
};

const ItemCountPerPage = 15;
class AdminBenchmarkJobListInternal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      list: null,
      error: null,
      pageCount: 0,
      currentPage: 0,
    };
  }

  public componentDidMount() {
    this.updateList(0);
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps !== this.props) this.updateList();
  }

  async updateList(page?: number) {
    try {
      const list = await this.props.client.listBenchmarkJobs(
        this.props.teamId ? parseInt(this.props.teamId, 10) : null,
        this.props.status ?? undefined,
        this.props.failedOnly,
        page,
      );
      const pageCount = list.maxPage as number;
      this.setState({ list, pageCount });
    } catch (error) {
      this.setState({ error });
    }
  }

  public render() {
    return (
      <>
        <header>
          <h1 className="title is-1">Benchmark Jobs</h1>
        </header>
        <main>
          {this.renderForm()}
          {this.renderFilter()}
          {this.renderError()}
          {this.renderList()}
          {this.renderPaginate()}
        </main>
      </>
    );
  }

  public renderError() {
    if (!this.state.error) return;
    return <ErrorMessage error={this.state.error} />;
  }

  renderForm() {
    return <AdminBenchmarkJobForm session={this.props.session} client={this.props.client} />;
  }

  renderFilter() {
    return (
      <ListFilter
        teamId={this.props.teamId}
        status={this.props.status?.toString() ?? null}
        failedOnly={this.props.failedOnly}
      />
    );
  }

  renderPaginate() {
    const handlePageClick = (selectedItem: { selected: number }) => {
      this.setState({ currentPage: selectedItem.selected });
      this.updateList(selectedItem.selected);
    };

    return (
      <ReactPaginate
        previousLabel="previous"
        nextLabel="next"
        breakLabel="..."
        breakClassName="pagination-list pagination-ellipsis"
        pageCount={this.state.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination is-centered"
        pageClassName="pagination-list"
        pageLinkClassName="pagination-link"
        activeLinkClassName="is-current"
        disabledClassName="pagination-nextprevious-disabled"
        nextClassName="pagination-next"
        previousClassName="pagination-previous"
        // subContainerClassName={'pages pagination'}
      />
    );
  }

  renderList() {
    if (!this.state.list) return <p>Loading...</p>;
    const itemIndexBegin = this.state.currentPage * ItemCountPerPage;
    const itemIndexEnd = (this.state.currentPage + 1) * ItemCountPerPage;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Team</th>
            <th>Score</th>
            <th>Instance</th>
            <th>Status</th>
            <th>Time</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>{this.state.list.jobs!.map((job, i) => this.renderJob(job, i))}</tbody>
      </table>
    );
  }

  renderJob(job: isuxportal.proto.resources.IBenchmarkJob, i: number) {
    const id = job.id!.toString();
    return (
      <tr key={id}>
        <td>
          <Link to={`/admin/benchmark_jobs/${encodeURIComponent(id)}`}>#{id}</Link>
        </td>
        <td>
          <Link to={`/admin/teams/${encodeURIComponent(job.team!.id!.toString())}`}>
            {job.team!.id}: {job.team!.name}
          </Link>
        </td>
        <td>{job.score}</td>
        <td>{job.instanceName}</td>
        <td>
          <BenchmarkJobStatus status={job.status!} />
        </td>
        <td>
          <Timestamp timestamp={job.createdAt!} />
        </td>
        <td>
          <TimeDuration a={job.createdAt!} b={job.finishedAt} />
        </td>
      </tr>
    );
  }
}
