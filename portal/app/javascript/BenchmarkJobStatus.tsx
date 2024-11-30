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

export const parseBenchmarkJobStatus = (statusString: string | null): BenchmarkJob_Status | null => {
  if (statusString === null || statusString === "") return null;

  const status = +statusString;

  switch (status) {
    case BenchmarkJob_Status.PENDING:
      return BenchmarkJob_Status.PENDING;
    case BenchmarkJob_Status.RUNNING:
      return BenchmarkJob_Status.RUNNING;
    case BenchmarkJob_Status.ERRORED:
      return BenchmarkJob_Status.ERRORED;
    case BenchmarkJob_Status.CANCELLED:
      return BenchmarkJob_Status.CANCELLED;
    case BenchmarkJob_Status.FINISHED:
      return BenchmarkJob_Status.FINISHED;
  }
  console.warn("Unexpected status", status);
  return null;
};
