import { ApiError, ApiClient } from "./ApiClient";

import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { AuthError } from "./AuthError";

import { Navbar } from "./Navbar";
import { TeamList } from "./TeamList";
import { AudienceDashboard } from "./AudienceDashboard";
import { Landing } from "./Landing";
import { Registration } from "./Registration";
import { EnvCheck } from "./EnvCheck";
import type { GetCurrentSessionResponse } from "../../proto/isuxportal/services/common/me_pb";
import { Contest_Status } from "../../proto/isuxportal/resources/contest_pb";

export interface Props {
  session: GetCurrentSessionResponse;
  client: ApiClient;
}

export interface State {}

export class AudienceApp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <BrowserRouter>
        <Navbar session={this.props.session} client={this.props.client} />

        <div className="container px-5 py-5">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {this.props.session.contest!.status == Contest_Status.FINISHED ||
                  this.props.session.contest!.status == Contest_Status.STARTED ? (
                    <AudienceDashboard session={this.props.session} client={this.props.client} />
                  ) : (
                    <Landing session={this.props.session} client={this.props.client} />
                  )}
                </>
              }
            />
            <Route path="/teams" element={<TeamList session={this.props.session} client={this.props.client} />} />
            <Route
              path="/registration"
              element={<Registration session={this.props.session} client={this.props.client} />}
            />
            <Route
              path="/registration/env_check"
              element={<EnvCheck session={this.props.session} client={this.props.client} />}
            />
            <Route path="/auth/failure" element={<AuthError />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
