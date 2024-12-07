import React from "react";
import { Link } from "react-router-dom";

import { BenchmarkJobStatus } from "./BenchmarkJobStatus";
import { Timestamp } from "./Timestamp";
import { BenchmarkJob_Status, type BenchmarkJob } from "../../proto/isuxportal/resources/benchmark_job_pb";
import type { Team } from "../../proto/isuxportal/resources/team_pb";
import { EnqueuedBy } from "./EnqueuedBy";

export interface Props {
  job: BenchmarkJob;
  admin?: boolean;
}

const renderJobSummary = (job: BenchmarkJob, admin: boolean) => {
  return (
    <div className="card mt-5">
      <header className="card-header">
        <h4 className="is-4 card-header-title">Summary</h4>
      </header>
      <div className="card-content">
        <p>
          <b>ID:</b> {job.id.toString()}
        </p>
        <p>
          <b>Target:</b> #{job.target!.number.toString()}: {job.target!.privateIpv4Address} (
          {job.target!.publicIpv4Address}) {admin ? `(#${job.target!.id.toString()}, ${job.target!.cloudId})` : null}
        </p>
        <p>
          <b>Status:</b> <BenchmarkJobStatus status={job.status!} />
        </p>
        <p>
          <b>Enqueued By:</b> {job.enqueuedBy ? <EnqueuedBy enqueuedBy={job.enqueuedBy} /> : "Unknown"}
        </p>
        {admin ? (
          <p>
            <b>Is Post Validation:</b> {job.postValidation ? "Yes" : "No"}
          </p>
        ) : null}
        <p>
          <b>Enqueued At:</b> <Timestamp timestamp={job.createdAt!} />
        </p>
        <p>
          <b>Updated At:</b> <Timestamp timestamp={job.updatedAt!} />
        </p>
        <p>
          <b>Started At:</b> {job.startedAt ? <Timestamp timestamp={job.startedAt} /> : "N/A"}
        </p>
        <p>
          <b>Finished At:</b> {job.finishedAt ? <Timestamp timestamp={job.finishedAt} /> : "N/A"}
        </p>
      </div>
    </div>
  );
};

const renderTeam = (team: Team) => {
  return (
    <div className="card mt-5">
      <header className="card-header">
        <h4 className="is-4 card-header-title">Team</h4>
      </header>
      <div className="card-content">
        <p>
          <Link to={`/admin/teams/${encodeURIComponent(team.id!.toString())}`}>
            {team.name} (#{team.id!.toString()})
          </Link>
        </p>
      </div>
    </div>
  );
};

const renderJobResult = (job: BenchmarkJob, admin: boolean) => {
  if (!job.result) return;
  const { result } = job;
  return (
    <div className="card mt-5">
      <header className="card-header">
        <h4 className="is-4 card-header-title">Result</h4>
      </header>
      <div className="card-content">
        <p>
          {result.finished ? (
            <span className="tag is-info">Finished</span>
          ) : (
            <span className="tag is-warning">In progress</span>
          )}
          {result.finished ? (
            result.passed ? (
              <span className="tag is-success ml-2">Passed</span>
            ) : (
              <span className="tag is-danger ml-2">Failed</span>
            )
          ) : null}
        </p>
        {job.status === BenchmarkJob_Status.ERRORED ? (
          <div className="message is-danger my-2">
            <div className="message-body">
              ベンチマーカーでエラーが発生しました。
              {admin ? "" : "しばらく経って運営からアナウンスがない場合は、質問でご確認ください。"}
            </div>
          </div>
        ) : null}
        <p>
          <b>Marked At:</b> <Timestamp timestamp={result.markedAt!} />
        </p>
        <p>
          <b>Score:</b> {result.score.toString()}
        </p>
        {result.scoreBreakdown ? (
          <p>
            <b>Score Breakdown:</b> base={result.scoreBreakdown.raw.toString()}, deduction=
            {result.scoreBreakdown.deduction.toString()}
          </p>
        ) : null}
      </div>
    </div>
  );
};

const renderJobExecution = (job: BenchmarkJob, admin: boolean) => {
  if (!job.result) return;
  if (!job.result.execution) return;
  const { execution } = job.result;
  return (
    <div className="card mt-5">
      <header className="card-header">
        <h4 className="is-4 card-header-title">Conclusion</h4>
      </header>
      <div className="card-content">
        <p>
          <b>Reason:</b> {execution.reason}
        </p>
        {admin ? (
          <p>
            <b>Exit status:</b> {execution.exitStatus}{" "}
            {execution.signaled ? <span>(Signaled: {execution.exitSignal})</span> : null}
          </p>
        ) : null}

        <div className="mt-3">
          <h5 className="subtitle is-5">Stdout</h5>
          <pre>{execution.stdout}</pre>
          <StdoutWithColor stdout={execution.stdout} />

          {admin ? (
            <>
              <h5 className="subtitle is-5">Stderr</h5>
              <pre>{execution.stderr}</pre>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export const BenchmarkJobDetail: React.FC<Props> = (props: Props) => {
  const { job } = props;
  return (
    <>
      <section>
        {renderJobSummary(job, !!props.admin)}
        {props.admin ? renderTeam(job.team!) : null}
        {renderJobResult(job, !!props.admin)}
        {renderJobExecution(job, !!props.admin)}
      </section>
    </>
  );
};

const StdoutWithColor = ({ stdout }: { stdout: string }) => {
  const lines = stdout.trim().split("\n");
  return (
    <pre>
      {lines.map((line, idx) => (
        <StdoutLineWithColor line={line} key={idx} />
      ))}
    </pre>
  );
};

const levelToColor = {
  info: "",
  warn: "has-text-warning",
  error: "has-text-danger",
};
const stdoutLineRE = /^\s*(time=[\d:.]+\s+level=(INFO|WARN|ERROR))(\s+msg=.*)$/;
const StdoutLineWithColor = ({ line }: { line: string }) => {
  const match = line.match(stdoutLineRE);
  if (!match)
    return (
      <span>
        {line}
        {"\n"}
      </span>
    );

  const [, prefix, level, suffix] = match;
  const lev = level.toLowerCase() as "info" | "warn" | "error";
  return (
    <>
      <span className="has-text-grey">{prefix}</span>
      <span className={levelToColor[lev]}>{suffix}</span>
      {"\n"}
    </>
  );
};
