import { ApiClient } from "../ApiClient";
import React from "react";

import { Timestamp } from "../Timestamp";
import { ErrorMessage } from "../ErrorMessage";
import { useSearchParams } from "react-router-dom";
import {
  LeaderboardItemSchema,
  type Leaderboard,
  type LeaderboardItem,
} from "../../../proto/isuxportal/resources/leaderboard_pb";
import type { DashboardResponse } from "../../../proto/isuxportal/services/audience/dashboard_pb";
import { create } from "@bufbuild/protobuf";

interface TeamItemProps {
  position: number;
  lastPosition?: number;
  item: LeaderboardItem;
  changed: boolean;
}

const TeamItem: React.FC<TeamItemProps> = ({ position, lastPosition, changed, item }) => {
  const [animationClassName, setAnimationClassName] = React.useState<string | null>(null);
  const [animationEpoch, setAnimationEpoch] = React.useState<number>(0);

  const studentStatus = item.team!.student?.status && <span className="material-icons">school</span>;

  React.useEffect(() => {
    if (!lastPosition) return;
    if (!changed) return;
    const set = lastPosition && lastPosition != position;
    if (lastPosition > position) {
      setAnimationClassName("isux-broadcast-leaderboard-change-up");
    } else if (lastPosition < position) {
      setAnimationClassName("isux-broadcast-leaderboard-change-down");
    }
    if (!set) return;
    setAnimationEpoch(animationEpoch + 1);
  }, [lastPosition, position]);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setAnimationClassName(null);
    }, 4000);
    return () => {
      window.clearTimeout(timer);
    };
  }, [animationEpoch]);

  const classNames = ["isux-broadcast-leaderboard-item", "columns", "is-mobile", "is-vcentered", "is-gapless"];
  return (
    <div className={classNames.join(" ")}>
      <div className={`column isux-broadcast-leaderboard-item-position ${animationClassName}`}>
        <p>{position}</p>
      </div>
      <div className="column isux-broadcast-leaderboard-item-team">
        <p>{item.team!.name}</p>
      </div>
      <div className="column isux-broadcast-leaderboard-item-student">{studentStatus}</div>
      <div className="column has-text-right isux-broadcast-leaderboard-item-score">
        <p>{(item.latestScore?.score || 0n).toString()}</p>
      </div>
    </div>
  );
};

type Mode = "all" | "general" | "students" | "hidden";

interface Props {
  client: ApiClient;
}

export const BroadcastLeaderboard: React.FC<Props> = (props: Props) => {
  const { client } = props;

  const [query] = useSearchParams();
  const limit = parseInt(query.get("limit") || "15", 10);
  const showDummy = query.get("dummy") === "1";
  const mode = query.get("mode") || "all";
  const bottom = query.get("bottom") === "1";

  const [error, setError] = React.useState<Error | null>(null);
  const [requesting, setRequesting] = React.useState(false);
  const [dashboard, setDashboard] = React.useState<DashboardResponse | null>(null);
  const refresh = () => {
    if (requesting) return;
    setRequesting(true);
    client
      .getAudienceDashboard()
      .then((db) => {
        setDashboard(db);
        setError(null);
        setRequesting(false);
      })
      .catch((e) => {
        setError(e);
        setRequesting(false);
      });
  };
  React.useEffect(() => {
    if (!dashboard && !showDummy) refresh();
  }, [dashboard]);
  React.useEffect(() => {
    if (showDummy) return;

    // TODO: Retry with backoff
    const timer = setInterval(() => refresh(), 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {error ? <ErrorMessage error={error} /> : null}
      <BroadcastLeaderboardInner
        client={client}
        leaderboard={dashboard?.leaderboard!}
        limit={limit}
        showDummy={showDummy}
        mode={mode}
        bottom={bottom}
      />
    </>
  );
};

const usePrevious = function <T>(value: T) {
  const ref = React.useRef<T>();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

interface InnerProps {
  client: ApiClient;
  limit: number;
  showDummy?: boolean;
  mode?: string;
  bottom?: boolean;
  leaderboard?: Leaderboard;
}

const BroadcastLeaderboardInner: React.FC<InnerProps> = (props: InnerProps) => {
  const { leaderboard, mode, showDummy, limit } = props;
  const prevProps = usePrevious(props);
  const prevLeaderboard = prevProps?.leaderboard;

  type TeamStanding = {
    position: number;
    item: LeaderboardItem;
    lastPosition?: number;
    lastScore?: bigint;
  };
  const renderTeam = (key: string, { item, position, lastPosition, lastScore }: TeamStanding) => {
    return (
      <TeamItem
        item={item}
        position={position}
        lastPosition={lastPosition}
        changed={lastScore != item.latestScore?.score}
        key={`${key}-${item.team!.id!.toString()}`}
      />
    );
  };

  let teams: TeamStanding[];

  if (showDummy) {
    teams = [
      {
        position: 1,
        lastPosition: 1,
        lastScore: 14835n,
        item: create(LeaderboardItemSchema, {
          team: { id: 424242n, name: "あいうあいうあいう", student: { status: true } },
          bestScore: { score: 14835n },
          latestScore: { score: 14835n },
        }),
      },
      {
        position: 2,
        lastPosition: 3,
        lastScore: 11835n,
        item: create(LeaderboardItemSchema, {
          team: { id: 424243n, name: "なにぬなにぬなにぬ" },
          bestScore: { score: 11835n },
          latestScore: { score: 11835n },
        }),
      },
      {
        position: 3,
        lastPosition: 2,
        lastScore: 9835n,
        item: create(LeaderboardItemSchema, {
          team: {
            id: 400000n,
            name: "railsへの執着はもはや煩悩の域であり、開発者一同は瞑想したほうがいいと思います。",
          },
          bestScore: { score: 9835n },
          latestScore: { score: 9835n },
        }),
      },
    ];
  } else {
    if (!leaderboard) return <p>Loading</p>;

    const prevRanks = new Map(
      (prevLeaderboard?.teams || []).map((t, idx) => {
        return [t.team!.id, idx + 1];
      }),
    );
    const prevScores = new Map(
      (prevLeaderboard?.teams || []).map((t, idx) => {
        return [t.team!.id, t.latestScore?.score!];
      }),
    );

    // XXX: logic duplicate with chooseTeamList in Leaderboard.tsx
    const selectTeam = () => {
      switch (mode) {
        case "all":
          return leaderboard.teams!;
        case "general":
          return (leaderboard.teams || []).filter((i) => !i.team!.student!.status);
        case "students":
          return (leaderboard.teams || []).filter((i) => i.team!.student!.status);
        case "hidden":
          return leaderboard.hiddenTeams!;
        default:
          throw new Error("unknown mode");
      }
    };
    teams = selectTeam()
      .map((item, idx): TeamStanding => {
        return {
          position: idx + 1,
          lastPosition: prevRanks.get(item.team!.id!),
          lastScore: prevScores.get(item.team!.id!),
          item,
        };
      })
      .filter((team) => !!team.item.latestScore);
  }

  return (
    <div className="isux-broadcast-leaderboard-wrapper">
      <div className={`isux-broadcast-leaderboard ${props.bottom ? "isux-broadcast-bottomflex" : ""}`}>
        {teams.slice(0, limit || undefined).map((v) => renderTeam("standings", v))}
      </div>
    </div>
  );
};
