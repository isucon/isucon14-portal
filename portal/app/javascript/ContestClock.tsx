import dayjs from "dayjs";
import durationPlugin from "dayjs/plugin/duration";
import relativeTimePlugin from "dayjs/plugin/relativeTime";
import React from "react";
import type { Contest } from "../../proto/isuxportal/resources/contest_pb";
dayjs.extend(durationPlugin);
dayjs.extend(relativeTimePlugin);

export interface Props {
  contest: Contest;
}

export const ContestClock: React.FC<Props> = ({ contest }) => {
  const [now, setNow] = React.useState(dayjs());
  React.useEffect(() => {
    let timer = setInterval(() => {
      setNow(dayjs());
    }, 500);
    return () => clearInterval(timer);
  });

  const contestStartsAt = dayjs(Number(contest.startsAt!.seconds * 1000n + BigInt(contest.startsAt!.nanos) / 1000000n));
  const contestEndsAt = dayjs(Number(contest.endsAt!.seconds * 1000n + BigInt(contest.endsAt!.nanos) / 1000000n));

  const duration = contestEndsAt.diff(contestStartsAt);
  const untilEnd = contestEndsAt.diff(now);

  const remaining = dayjs.duration(untilEnd < 0 ? 0 : untilEnd);
  const digits = (n: number) => Math.floor(n).toString().padStart(2, "0");

  return (
    <div className="isux-contest-clock">
      <div className="columns is-vcentered">
        <div className="column is-narrow">
          <p>
            日程: <time dateTime={contestStartsAt.toISOString()}>{contestStartsAt.format("YYYY-MM-DD HH:mm")}</time>〜
            <time dateTime={contestEndsAt.toISOString()}>{contestEndsAt.format("YYYY-MM-DD HH:mm")}</time>
          </p>
        </div>
        <div className="column is-3">
          <p>
            <progress className="progress is-small" max={100} value={100 - (untilEnd / duration) * 100}></progress>
          </p>
        </div>
        <div className="column is-4">
          <p>
            残り時間: {digits(remaining.asHours())}:{digits(remaining.minutes())}:{digits(remaining.seconds())}
          </p>
        </div>
      </div>
    </div>
  );
};
