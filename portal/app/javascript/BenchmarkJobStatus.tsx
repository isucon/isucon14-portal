import { BenchmarkJob_Status } from "../../proto/isuxportal/resources/benchmark_job_pb";

import React from "react";

export interface Props {
  status: BenchmarkJob_Status;
}

const COLORS = {
  [BenchmarkJob_Status.PENDING]: "dark",
  [BenchmarkJob_Status.RUNNING]: "warning",
  [BenchmarkJob_Status.CANCELLED]: "info",
  [BenchmarkJob_Status.FINISHED]: "success",
  [BenchmarkJob_Status.ERRORED]: "danger",
} as const;

export const BenchmarkJobStatus: React.FC<Props> = (props: Props) => {
  const color = COLORS[props.status];

  return <span className={`tag is-${color}`}>{BenchmarkJob_Status[props.status]}</span>;
};
