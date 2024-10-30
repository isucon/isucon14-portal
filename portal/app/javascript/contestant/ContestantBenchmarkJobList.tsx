import { ApiError, ApiClient } from "../ApiClient";

import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { ErrorMessage } from "../ErrorMessage";

import { BenchmarkJobList } from "../BenchmarkJobList";

import { ContestantBenchmarkJobForm } from "./ContestantBenchmarkJobForm";
import type { GetCurrentSessionResponse } from "../../../proto/isuxportal/services/common/me_pb";
import type { ListBenchmarkJobsResponse } from "../../../proto/isuxportal/services/contestant/benchmark_pb";

export interface Props {
  session: GetCurrentSessionResponse;
  client: ApiClient;
}

export interface State {
  list: ListBenchmarkJobsResponse | null;
  error: Error | null;
}

export class ContestantBenchmarkJobList extends React.Component<Props, State> {
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

  async updateList() {
    try {
      const list = await this.props.client.listBenchmarkJobs();
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

  renderForm() {
    return <ContestantBenchmarkJobForm session={this.props.session} client={this.props.client} />;
  }

  renderList() {
    if (!this.state.list) return <p>Loading...</p>;
    return <BenchmarkJobList list={this.state.list.jobs} />;
  }
}
