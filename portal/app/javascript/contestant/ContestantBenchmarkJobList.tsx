import { ApiClient } from "../ApiClient";

import React from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { ErrorMessage } from "../ErrorMessage";

import { BenchmarkJobList } from "../BenchmarkJobList";

import { ContestantBenchmarkJobForm } from "./ContestantBenchmarkJobForm";
import type { GetCurrentSessionResponse } from "../../../proto/isuxportal/services/common/me_pb";
import type { ListBenchmarkJobsResponse } from "../../../proto/isuxportal/services/contestant/benchmark_pb";
import { BenchmarkJob_Status } from "../../../proto/isuxportal/resources/benchmark_job_pb";
import { parseBenchmarkJobStatus } from "../BenchmarkJobStatus";

export interface Props {
  session: GetCurrentSessionResponse;
  client: ApiClient;
  status: BenchmarkJob_Status | null;
}

export interface State {
  list: ListBenchmarkJobsResponse | null;
  error: Error | null;
}

export const ContestantBenchmarkJobList = (props: Omit<Props, "status">) => {
  const [searchParams] = useSearchParams();
  const status = parseBenchmarkJobStatus(searchParams.get("status"));
  return <ContestantBenchmarkJobListInternal {...props} status={status} />;
};

class ContestantBenchmarkJobListInternal extends React.Component<Props, State> {
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

  public componentDidUpdate(prevProps: Props) {
    if (prevProps !== this.props) this.updateList();
  }

  async updateList() {
    try {
      const list = await this.props.client.listBenchmarkJobs(this.props.status ?? undefined);
      this.setState({ list });
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
        </main>
      </>
    );
  }

  public renderError() {
    if (!this.state.error) return;
    return <ErrorMessage error={this.state.error} />;
  }

  renderFilter() {
    return <ListFilter status={this.props.status?.toString()} />;
  }

  renderForm() {
    return <ContestantBenchmarkJobForm session={this.props.session} client={this.props.client} />;
  }

  renderList() {
    if (!this.state.list) return <p>Loading...</p>;
    return <BenchmarkJobList list={this.state.list.jobs} />;
  }
}

const ListFilter = ({ status }: { status: string | undefined }) => {
  let [, setSearchParams] = useSearchParams();
  const { register, handleSubmit } = useForm({
    defaultValues: { status },
  });
  const onSubmit = handleSubmit((data) => {
    setSearchParams((params) => {
      params.set("status", data.status ?? "");
      return params;
    });
  });

  return (
    <div className="block has-background-info-light card mt-5">
      <div className="card-content">
        <form onSubmit={onSubmit}>
          <div className="columns">
            <div className="column is-3 field">
              <label className="has-text-info-dark label" htmlFor="ContestantBenchmarkJobListFilter-status">
                Status
              </label>
              <div className="control">
                <div className="select" id="ContestantBenchmarkJobListFilter-status">
                  <select {...register("status")}>
                    <option value={""}>-----</option>
                    <option value={BenchmarkJob_Status.PENDING.toString()}>PENDING</option>
                    <option value={BenchmarkJob_Status.RUNNING.toString()}>RUNNING</option>
                    <option value={BenchmarkJob_Status.ERRORED.toString()}>ERRORED</option>
                    <option value={BenchmarkJob_Status.CANCELLED.toString()}>CANCELLED</option>
                    <option value={BenchmarkJob_Status.FINISHED.toString()}>FINISHED</option>
                  </select>
                </div>
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
