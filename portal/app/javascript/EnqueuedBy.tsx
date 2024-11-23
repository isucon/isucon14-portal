import React from "react";
import type { BenchmarkJob_EnqueuedBy } from "../../proto/isuxportal/resources/benchmark_job_pb";

export interface Props {
  enqueuedBy: BenchmarkJob_EnqueuedBy;
}

export const EnqueuedBy: React.FC<Props> = (props: Props) => {
  return (
    <div className="is-inline-flex is-align-items-center">
      <img src={props.enqueuedBy.avatarUrl} width="24" height="24" className="mr-1" /> {props.enqueuedBy.name}
    </div>
  );
};
