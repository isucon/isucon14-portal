import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { GetCurrentSessionResponse } from "../../../proto/isuxportal/services/common/me_pb";
import type { AdminApiClient } from "./AdminApiClient";
import { ErrorMessage } from "../ErrorMessage";
import type { InstanceCommandExecuteRequest } from "../../../proto/isuxportal/resources/instance_command_execute_request_pb";
import { Timestamp } from "../Timestamp";
import { Link } from "react-router-dom";
import { create } from "@bufbuild/protobuf";
import {
  TriggerBenchmarksRequestSchema,
  TriggerEnvCheckRequestSchema,
  TriggerInstanceRestartRequestSchema,
} from "../../../proto/isuxportal/services/admin/last_validations_pb";

export interface Props {
  session: GetCurrentSessionResponse;
  client: AdminApiClient;
}

export const AdminLastValidations: React.FC<Props> = (props: Props) => {
  return (
    <>
      <header>
        <h1 className="title is-1">Last Validations</h1>
      </header>
      <main className="mt-5">
        <CommandTriggerForm client={props.client} />
        <InstanceCommandExecuteRequests client={props.client} />
      </main>
    </>
  );
};

const CommandTriggerForm = (props: { client: AdminApiClient }) => {
  const [rawTeamIds, setRawTeamIds] = useState("");
  const teamIds = useMemo(
    () => (rawTeamIds.trim() === "" ? [] : rawTeamIds.split(",").map((v) => BigInt(v.trim()))),
    [rawTeamIds],
  );

  const [triggerEnvCheckResult, setTriggerEnvCheckResult] = React.useState<true | Error | null>(null);
  const triggerEnvCheckClick = useCallback(async () => {
    if (teamIds.length === 0 && !confirm("全チームに実行しますか？")) {
      return;
    }
    await props.client.triggerEnvCheck(create(TriggerEnvCheckRequestSchema, { teamIds }));
  }, [teamIds, props.client]);

  const [triggerInstanceRestartResult, setTriggerInstanceRestartResult] = React.useState<true | Error | null>(null);
  const triggerInstanceRestartClick = useCallback(async () => {
    if (teamIds.length === 0 && !confirm("全チームに実行しますか？")) {
      return;
    }
    await props.client.triggerInstanceRestart(create(TriggerInstanceRestartRequestSchema, { teamIds }));
  }, [teamIds, props.client]);

  const [triggerBenchmarksResult, setTriggerBenchmarksResult] = React.useState<true | Error | null>(null);
  const triggerBenchmarksClick = useCallback(async () => {
    if (teamIds.length === 0 && !confirm("全チームに実行しますか？")) {
      return;
    }
    await props.client.triggerBenchmarks(create(TriggerBenchmarksRequestSchema, { teamIds, postValidation: false }));
  }, [teamIds, props.client]);

  const [triggerPostValidationBenchmarksResult, setTriggerPostValidationBenchmarksResult] = React.useState<
    true | Error | null
  >(null);
  const triggerPostValidationBenchmarksClick = useCallback(async () => {
    if (teamIds.length === 0 && !confirm("全チームに実行しますか？")) {
      return;
    }
    await props.client.triggerBenchmarks(create(TriggerBenchmarksRequestSchema, { teamIds, postValidation: true }));
  }, [teamIds, props.client]);

  return (
    <div className="card">
      <div className="card-content">
        <form>
          <div className="columns">
            <div className="column is-3 field">
              <label className="label" htmlFor="AdminLastValidationsCommandTriggerForm-teamId">
                Team IDs
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="AdminLastValidationsCommandTriggerForm-teamIds"
                  placeholder="空の場合は全チームが対象になります。例) 1,2,3"
                  onChange={(e) => setRawTeamIds(e.target.value)}
                />
              </div>
            </div>
            <div className="column is-3 field">
              <TriggerButton
                buttonLabel="Trigger Env Check"
                func={triggerEnvCheckClick}
                first
                result={triggerEnvCheckResult}
                setResult={setTriggerEnvCheckResult}
              />
              <TriggerButton
                buttonLabel="Trigger Instance Restart"
                func={triggerInstanceRestartClick}
                result={triggerInstanceRestartResult}
                setResult={setTriggerInstanceRestartResult}
              />
              <TriggerButton
                buttonLabel="Trigger Benchmarks"
                func={triggerBenchmarksClick}
                result={triggerBenchmarksResult}
                setResult={setTriggerBenchmarksResult}
              />
              <TriggerButton
                buttonLabel="Trigger Post Validation Benchmarks"
                func={triggerPostValidationBenchmarksClick}
                result={triggerPostValidationBenchmarksResult}
                setResult={setTriggerPostValidationBenchmarksResult}
              />
            </div>
          </div>
          {triggerEnvCheckResult !== true && triggerEnvCheckResult ? (
            <ErrorMessage error={triggerEnvCheckResult} />
          ) : null}
          {triggerInstanceRestartResult !== true && triggerInstanceRestartResult ? (
            <ErrorMessage error={triggerInstanceRestartResult} />
          ) : null}
          {triggerBenchmarksResult !== true && triggerBenchmarksResult ? (
            <ErrorMessage error={triggerBenchmarksResult} />
          ) : null}
          {triggerPostValidationBenchmarksResult !== true && triggerPostValidationBenchmarksResult ? (
            <ErrorMessage error={triggerPostValidationBenchmarksResult} />
          ) : null}
        </form>
      </div>
    </div>
  );
};

const TriggerButton = ({
  buttonLabel,
  func,
  first = false,
  result,
  setResult,
}: {
  buttonLabel: string;
  func: () => Promise<void>;
  first?: boolean;
  result: true | Error | null;
  setResult: (e: true | Error | null) => void;
}) => {
  const [requesting, setRequesting] = React.useState(false);

  const onClick = useCallback(async () => {
    if (requesting) return;

    setRequesting(true);
    try {
      await func();
      setResult(true);
    } catch (e) {
      setResult(e);
    } finally {
      setRequesting(false);
    }
  }, [requesting, func]);

  return (
    <div className={`is-flex is-align-items-center ${first ? "" : "mt-1"}`}>
      <button className="button is-light" type="button" disabled={requesting} onClick={onClick}>
        {buttonLabel}
      </button>
      {result === true ? (
        <span className="icon ml-2">
          <i className="material-icons-outlined" aria-hidden={"true"}>
            check
          </i>
        </span>
      ) : null}
    </div>
  );
};

const InstanceCommandExecuteRequests = (props: { client: AdminApiClient }) => {
  const [requesting, setRequesting] = React.useState(false);
  const [requests, setRequests] = React.useState<InstanceCommandExecuteRequest[] | null>(null);

  useEffect(() => {
    (async () => {
      setRequesting(true);
      try {
        const resp = await props.client.listInstanceCommandExecuteRequests();
        setRequests(resp.requests);
      } catch (e) {
        setRequests(null);
      } finally {
        setRequesting(false);
      }
    })();
  }, [props.client]);

  const rows = useMemo(
    () =>
      requesting ? (
        <tr>
          <td colSpan={6}>Loading</td>
        </tr>
      ) : requests && requests.length > 0 ? (
        requests.map((request) => <InstanceCommandExecuteRequestRow request={request} key={request.id.toString()} />)
      ) : (
        <tr>
          <td colSpan={6}>No result</td>
        </tr>
      ),
    [requesting, requests],
  );

  return (
    <table className="table is-striped is-fullwidth mt-5">
      <thead>
        <tr>
          <th>ID</th>
          <th>Command</th>
          <th>Triggered At</th>
          <th>Total Target</th>
          <th>Total Finished</th>
          <th>Finished %</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

const InstanceCommandExecuteRequestRow = ({ request }: { request: InstanceCommandExecuteRequest }) => {
  return (
    <tr>
      <td>
        <Link to={`/admin/last_validations/command_result/${request.id.toString()}`}>{request.id.toString()}</Link>
      </td>
      <td>
        <code>{request.command}</code>
      </td>
      <td>
        <Timestamp timestamp={request.createdAt!} />
      </td>
      <td>{request.totalTargetCount.toString()}</td>
      <td>{request.totalFinishedCount.toString()}</td>
      <td>
        {request.totalTargetCount === 0n
          ? "---"
          : ((Number(request.totalFinishedCount) / Number(request.totalTargetCount)) * 100).toFixed(2)}
        %
      </td>
    </tr>
  );
};
