import type { Timestamp as TimestampType } from "@bufbuild/protobuf/wkt";
import dayjs from "dayjs";

import React from "react";

export interface Props {
  timestamp: TimestampType;
  short?: boolean;
}

export const Timestamp: React.FC<Props> = (props: Props) => {
  const ts = props.timestamp;
  const t = dayjs(Number(ts.seconds * 1000n + BigInt(ts.nanos) / 1000000n));
  return <time dateTime={t.toISOString()}>{t.format(props.short ? "HH:mm:ss" : "YYYY-MM-DD HH:mm:ss.SSS")}</time>;
};
