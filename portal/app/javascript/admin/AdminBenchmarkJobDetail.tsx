import { AdminApiClient } from "./AdminApiClient";

import React from "react";

import { BenchmarkJobDetail } from "../BenchmarkJobDetail";

import { ErrorMessage } from "../ErrorMessage";
import { ReloadButton } from "../ReloadButton";
import { useParams } from "react-router-dom";
import type { GetCurrentSessionResponse } from "../../../proto/isuxportal/services/common/me_pb";
import { BenchmarkJob_Status, type BenchmarkJob } from "../../../proto/isuxportal/resources/benchmark_job_pb";

export interface Props {
  session: GetCurrentSessionResponse;
  client: AdminApiClient;
  id: bigint;
}

export interface State {
  job: BenchmarkJob | null;
  error: Error | null;
  requesting: boolean;
  timer: number | null;
}

export const AdminBenchmarkJobDetail = (props: Omit<Props, "id">) => {
  const { id } = useParams();
  if (!id) throw new Error("id is required");
  return <AdminBenchmarkJobDetailInternal {...props} id={BigInt(id)} />;
};

class AdminBenchmarkJobDetailInternal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      job: null,
      error: null,
      requesting: false,
      timer: null,
    };
  }

  public componentDidMount() {
    this.updateJob();
    this.setState({ timer: window.setInterval(this.updateJob.bind(this), 5000) });
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps !== this.props) this.updateJob();
  }

  public componentWillUnmount() {
    if (this.state.timer) window.clearInterval(this.state.timer);
  }

  async updateJob() {
    if (this.state.requesting) return;
    try {
      this.setState({ requesting: true });
      const resp = await this.props.client.getBenchmarkJob(this.props.id);
      this.setState({ job: resp.job!, requesting: false, error: null });
    } catch (error) {
      this.setState({ error, requesting: false });
    }
  }

  public render() {
    return (
      <>
        <header>
          <div className="level">
            <div className="level-left">
              <h1 className="title is-1">Job #{this.props.id}</h1>
            </div>
            <div className="level-right">
              <ReloadButton requesting={this.state.requesting} onClick={this.updateJob.bind(this)} />
            </div>
          </div>
        </header>
        <main>
          {this.renderError()}
          {this.renderJob()}
        </main>
      </>
    );
  }

  public renderError() {
    if (!this.state.error) return;
    return <ErrorMessage error={this.state.error} />;
  }

  renderJob() {
    if (!this.state.job) return <p>Loading...</p>;
    return (
      <>
        <BenchmarkJobDetail job={this.state.job} admin={true} />
        <div className="card mt-5">
          <div className="card-content">
            <button
              onClick={this.onCancelClick.bind(this)}
              disabled={!this.isJobCancellable()}
              className="button is-danger"
            >
              Cancel
            </button>
          </div>
        </div>
      </>
    );
  }

  isJobCancellable() {
    if (!this.state.job) return undefined;
    return (
      !this.state.requesting &&
      (this.state.job.status == BenchmarkJob_Status.PENDING || this.state.job.status == BenchmarkJob_Status.RUNNING)
    );
  }

  public async onCancelClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!this.state.job) throw new Error("[BUG] onCancelClick must not be called without a job");
    if (this.state.requesting) return;
    try {
      this.setState({ requesting: true });
      const resp = await this.props.client.cancelBenchmarkJob(this.state.job.id);
      this.setState({ requesting: false, error: null, job: resp.job! });
    } catch (e) {
      this.setState({ requesting: false, error: e });
    }
  }
}
