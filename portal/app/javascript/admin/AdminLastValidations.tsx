import React, { useCallback, useEffect, useMemo } from "react";
import type { GetCurrentSessionResponse } from "../../../proto/isuxportal/services/common/me_pb";
import type { AdminApiClient } from "./AdminApiClient";
import { ErrorMessage } from "../ErrorMessage";
import type { InstanceCommandExecuteRequest } from "../../../proto/isuxportal/resources/instance_command_execute_request_pb";
import { Timestamp } from "../Timestamp";
import { Link } from "react-router-dom";

export interface Props {
  session: GetCurrentSessionResponse;
  client: AdminApiClient;
}

export const AdminLastValidations: React.FC<Props> = (props: Props) => {
  const [requestingTriggerEnvCheck, setRequestingTriggerEnvCheck] = React.useState(false);
  const [triggerEnvCheckResult, setTriggerEnvCheckResult] = React.useState<true | Error | null>(null);

  const onTriggerEnvCheckClick = useCallback(async () => {
    if (requestingTriggerEnvCheck) return;

    setRequestingTriggerEnvCheck(true);
    try {
      await props.client.triggerEnvCheck();
      setTriggerEnvCheckResult(true);
    } catch (e) {
      setTriggerEnvCheckResult(e);
    } finally {
      setRequestingTriggerEnvCheck(false);
    }
  }, [requestingTriggerEnvCheck, props.client]);

  const [requestingTriggerInstanceRestart, setRequesting] = React.useState(false);
  const [triggerInstanceRestartResult, setTriggerInstanceRestartResult] = React.useState<true | Error | null>(null);

  const onTriggerInstanceRestartClick = useCallback(async () => {
    if (requestingTriggerInstanceRestart) return;

    setRequesting(true);
    try {
      await props.client.triggerInstanceRestart();
      setTriggerInstanceRestartResult(true);
    } catch (e) {
      setTriggerInstanceRestartResult(e);
    } finally {
      setRequesting(false);
    }
  }, [requestingTriggerInstanceRestart, props.client]);

  return (
    <>
      <header>
        <h1 className="title is-1">Last Validations</h1>
      </header>
      <main className="mt-5">
        <div className="block">
          {triggerEnvCheckResult !== true && triggerEnvCheckResult ? (
            <ErrorMessage error={triggerEnvCheckResult} />
          ) : null}
          <div className="is-flex is-align-items-center">
            <button className="button is-light" onClick={onTriggerEnvCheckClick}>
              Trigger Env Check on All Teams
            </button>
            {triggerEnvCheckResult === true ? (
              <span className="icon ml-2">
                <i className="material-icons-outlined" aria-hidden={"true"}>
                  check
                </i>
              </span>
            ) : null}
          </div>
        </div>
        <div className="block">
          {triggerInstanceRestartResult !== true && triggerInstanceRestartResult ? (
            <ErrorMessage error={triggerInstanceRestartResult} />
          ) : null}
          <div className="is-flex is-align-items-center">
            <button className="button is-light" onClick={onTriggerInstanceRestartClick}>
              Trigger Instance Restart on All Teams
            </button>
            {triggerInstanceRestartResult === true ? (
              <span className="icon ml-2">
                <i className="material-icons-outlined" aria-hidden={"true"}>
                  check
                </i>
              </span>
            ) : null}
          </div>
        </div>

        <InstanceCommandExecuteRequests client={props.client} />
      </main>
    </>
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
    <table className="table is-striped is-fullwidth">
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
          : (Number(request.totalFinishedCount / request.totalTargetCount) * 100).toFixed(2)}
        %
      </td>
    </tr>
  );
};
