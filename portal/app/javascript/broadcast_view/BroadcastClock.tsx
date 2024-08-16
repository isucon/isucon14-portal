import React from "react";
import dayjs from "dayjs";
import durationPlugin from "dayjs/plugin/duration";
import relativeTimePlugin from "dayjs/plugin/relativeTime";
import type { Contest } from "../../../proto/isuxportal/resources/contest_pb";
dayjs.extend(durationPlugin);
dayjs.extend(relativeTimePlugin);

export interface Props {
  contest: Contest;
}

export const BroadcastClock: React.FC<Props> = ({ contest }) => {
  const [now, setNow] = React.useState(dayjs());
  React.useEffect(() => {
    let timer = setInterval(() => {
      setNow(dayjs());
    }, 100);
    return () => clearInterval(timer);
  });

  const contestStartsAt = dayjs(Number(contest.startsAt!.seconds * 1000n + BigInt(contest.startsAt!.nanos) / 1000000n));
  const contestFreezesAt = dayjs(
    Number(contest.freezesAt!.seconds * 1000n + BigInt(contest.freezesAt!.nanos) / 1000000n),
  );
  const contestEndsAt = dayjs(Number(contest.endsAt!.seconds * 1000n + BigInt(contest.endsAt!.nanos) / 1000000n));

  const duration = contestEndsAt.diff(contestStartsAt);
  const untilStart = contestStartsAt.diff(now);
  const untilEnd = contestEndsAt.diff(now);
  const untilFreeze = contestFreezesAt.diff(now);

  const remaining = dayjs.duration(untilEnd);
  const digits = (n: number) => (n < 10 ? `0${Math.floor(n)}` : `${Math.floor(n)}`);

  let status = "running";
  let text = (
    <p>
      {digits(remaining.hours())}:{digits(remaining.minutes())}:{digits(remaining.seconds())}
    </p>
  );
  let progress = <progress max={100} value={100 - (untilEnd / duration) * 100}></progress>;
  if (untilEnd <= 0) {
    status = "end";
    text = <p>00:00:00</p>;
    progress = <progress className="frozen" max={100} value={100}></progress>;
  } else if (untilFreeze <= 0) {
    status = "frozen";
    progress = <progress className="frozen" max={100} value={100 - (untilEnd / duration) * 100}></progress>;
  } else if (untilStart > 0) {
    status = "before";
    text = <p>--:--:--</p>;
    progress = <progress max={100} value={0}></progress>;
  }

  return (
    <div className={`isux-broadcast-clock isux-broadcast-clock--${status} mt-1`}>
      <div className="columns">
        <div className="column is-12 isux-broadcast-clock-text px-0 mx-0 py-0 my-0">{text}</div>
      </div>
      <div className="columns">
        <div className="column is-12">
          <div className="isux-broadcast-clock-progress">
            {progress}
            <div className="overlay"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
