import { ApiError, ApiClient } from "./ApiClient";

import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { ErrorMessage } from "./ErrorMessage";
import { BroadcastClock } from "./broadcast_view/BroadcastClock";
import { BroadcastLeaderboard } from "./broadcast_view/BroadcastLeaderboard";
import { BroadcastScoreChanges } from "./broadcast_view/BroadcastScoreChanges";
import type { GetCurrentSessionResponse } from "../../proto/isuxportal/services/common/me_pb";

export interface Props {
  session: GetCurrentSessionResponse;
  client: ApiClient;
}

export interface State {}

export class BroadcastViewApp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/broadcast_view/clock" element={<BroadcastClock contest={this.props.session.contest!} />} />
          <Route path="/broadcast_view/leaderboard" element={<BroadcastLeaderboard client={this.props.client} />} />
          <Route path="/broadcast_view/score_changes" element={<BroadcastScoreChanges client={this.props.client} />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
