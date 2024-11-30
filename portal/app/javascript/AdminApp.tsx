import { GetCurrentSessionResponse } from "../../proto/isuxportal/services/common/me_pb";
import { ApiError, ApiClient } from "./ApiClient";
import { AdminApiClient } from "./admin/AdminApiClient";

import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";

import { ErrorMessage } from "./ErrorMessage";
import { AdminNavbar } from "./admin/AdminNavbar";

import { AdminTeamList } from "./admin/AdminTeamList";
import { AdminTeamDetail } from "./admin/AdminTeamDetail";
import { AdminBenchmarkJobList } from "./admin/AdminBenchmarkJobList";
import { AdminBenchmarkJobDetail } from "./admin/AdminBenchmarkJobDetail";
import { AdminClarificationList } from "./admin/AdminClarificationList";
import { AdminClarificationDetail } from "./admin/AdminClarificationDetail";
import { AdminLastValidations } from "./admin/AdminLastValidations";
import { AdminContestantInstanceList } from "./admin/AdminContestantInstanceList";
import { AdminDashboard } from "./admin/AdminDashboard";
import { AdminUnpreparedStats } from "./admin/AdminUnpreparedStats";

export interface Props {
  session: GetCurrentSessionResponse;
  client: ApiClient;
}

export interface State {
  adminClient: AdminApiClient;
}

export class AdminApp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      adminClient: new AdminApiClient(this.props.client),
    };
  }

  public render() {
    return (
      <BrowserRouter>
        <AdminNavbar session={this.props.session} client={this.state.adminClient} />

        <div className="container px-5 py-5">
          <div className="columns">
            <div className="column is-3">
              <aside className="menu">
                <p className="menu-label">Contest</p>
                <ul className="menu-list">
                  <li>
                    <NavLink end to="/admin" className={({ isActive }) => (isActive ? "is-active" : "")}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/benchmark_jobs" className={({ isActive }) => (isActive ? "is-active" : "")}>
                      Benchmark Jobs
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/clarifications" className={({ isActive }) => (isActive ? "is-active" : "")}>
                      Clarifications
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/last_validations" className={({ isActive }) => (isActive ? "is-active" : "")}>
                      Last Validations
                    </NavLink>
                  </li>
                </ul>
                <p className="menu-label">DCIM</p>
                <ul className="menu-list">
                  <li>
                    <NavLink
                      to="/admin/contestant_instances"
                      className={({ isActive }) => (isActive ? "is-active" : "")}
                    >
                      Contestant Instances
                    </NavLink>
                  </li>
                </ul>

                <p className="menu-label">Registration</p>
                <ul className="menu-list">
                  <li>
                    <NavLink to="/admin/teams" className={({ isActive }) => (isActive ? "is-active" : "")}>
                      Teams
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/unprepared_stats" className={({ isActive }) => (isActive ? "is-active" : "")}>
                      Unprepared stats
                    </NavLink>
                  </li>
                </ul>
              </aside>
            </div>

            <div className="column is-9">
              <main>
                <Routes>
                  <Route
                    path="/admin"
                    element={<AdminDashboard session={this.props.session} client={this.state.adminClient} />}
                  />
                  <Route
                    path="/admin/teams"
                    element={<AdminTeamList session={this.props.session} client={this.state.adminClient} />}
                  />
                  <Route
                    path="/admin/teams/:id/*"
                    element={<AdminTeamDetail session={this.props.session} client={this.state.adminClient} />}
                  />
                  <Route
                    path="/admin/benchmark_jobs"
                    element={<AdminBenchmarkJobList session={this.props.session} client={this.state.adminClient} />}
                  />
                  <Route
                    path="/admin/benchmark_jobs/:id"
                    element={<AdminBenchmarkJobDetail session={this.props.session} client={this.state.adminClient} />}
                  />
                  <Route
                    path="/admin/clarifications"
                    element={<AdminClarificationList session={this.props.session} client={this.state.adminClient} />}
                  />
                  <Route
                    path="/admin/clarifications/:id"
                    element={<AdminClarificationDetail session={this.props.session} client={this.state.adminClient} />}
                  />
                  <Route
                    path="/admin/last_validations"
                    element={<AdminLastValidations session={this.props.session} client={this.state.adminClient} />}
                  />
                  <Route
                    path="/admin/contestant_instances"
                    element={
                      <AdminContestantInstanceList session={this.props.session} client={this.state.adminClient} />
                    }
                  />
                  <Route
                    path="/admin/unprepared_stats"
                    element={<AdminUnpreparedStats session={this.props.session} client={this.state.adminClient} />}
                  />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
