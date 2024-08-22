import React from "react";
import { Link } from "react-router-dom";

import { TimeDuration } from "./TimeDuration";
import { Timestamp } from "./Timestamp";
import { BenchmarkJobStatus } from "./BenchmarkJobStatus";
import type { BenchmarkJob } from "../../proto/isuxportal/resources/benchmark_job_pb";

export interface Props {
  list: BenchmarkJob[];
}

export const BenchmarkJobList: React.FC<Props> = (props: Props) => {
  const renderJob = (job: BenchmarkJob, i: number) => {
    const id = job.id!.toString();
    return (
      <tr key={id}>
        <td>
          <Link to={`/contestant/benchmark_jobs/${encodeURIComponent(id)}`}>#{id}</Link>
        </td>
        <td className="has-text-right">{job.score.toString()}</td>
        <td>
          <BenchmarkJobStatus status={job.status} />
        </td>
        <td>
          <Timestamp timestamp={job.createdAt!} />
        </td>
        <td>
          <TimeDuration a={job.createdAt!} b={job.finishedAt} />
        </td>
      </tr>
    );
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Score</th>
          <th>Status</th>
          <th>Time</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>{props.list.map(renderJob)}</tbody>
    </table>
  );
};
