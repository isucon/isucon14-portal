import React from "react";
import type { BenchmarkJob_EnqueuedBy } from "../../proto/isuxportal/resources/benchmark_job_pb";

export interface Props {
  enqueuedBy: BenchmarkJob_EnqueuedBy;
}

export const EnqueuedBy: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <img src={props.enqueuedBy.avatarUrl} width="32" height="32" /> {props.enqueuedBy.name}
    </div>
  );
};
