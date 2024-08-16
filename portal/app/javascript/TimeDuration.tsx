import type { Timestamp } from "@bufbuild/protobuf/wkt";

import dayjs from "dayjs";
import durationPlugin from "dayjs/plugin/duration";
import relativeTimePlugin from "dayjs/plugin/relativeTime";
dayjs.extend(durationPlugin);
dayjs.extend(relativeTimePlugin);

import React from "react";

export interface Props {
  a: Timestamp;
  b?: Timestamp | undefined | null;
}

export const TimeDuration: React.FC<Props> = (props: Props) => {
  const tA = dayjs(Number(props.a.seconds * 1000n + BigInt(props.a.nanos) / 1000000n));
  const tB = props.b ? dayjs(Number(props.b.seconds * 1000n + BigInt(props.b.nanos) / 1000000n)) : dayjs();
  const d = dayjs.duration(tB.diff(tA));
  return <span>{d.humanize(false)}</span>;
};
