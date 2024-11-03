import React, { useCallback } from "react";
import type { GetCurrentSessionResponse } from "../../../proto/isuxportal/services/common/me_pb";
import type { AdminApiClient } from "./AdminApiClient";
import { ErrorMessage } from "../ErrorMessage";

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
      </main>
    </>
  );
};
