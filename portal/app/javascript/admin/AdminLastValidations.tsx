import React, { useCallback } from "react";
import type { GetCurrentSessionResponse } from "../../../proto/isuxportal/services/common/me_pb";
import type { AdminApiClient } from "./AdminApiClient";
import { ErrorMessage } from "../ErrorMessage";

export interface Props {
  session: GetCurrentSessionResponse;
  client: AdminApiClient;
}

export const AdminLastValidations: React.FC<Props> = (props: Props) => {
  const [requesting, setRequesting] = React.useState(false);
  const [triggerEnvCheckResult, setTriggerEnvCheckResult] = React.useState<true | Error | null>(null);

  const onTriggerEnvCheckClick = useCallback(async () => {
    if (requesting) return;

    setRequesting(true);
    try {
      await props.client.triggerEnvCheck();
      setTriggerEnvCheckResult(true);
    } catch (e) {
      setTriggerEnvCheckResult(e);
    } finally {
      setRequesting(false);
    }
  }, [requesting, props.client]);

  return (
    <>
      <header>
        <h1 className="title is-1">Last Validations</h1>
      </header>
      <main className="mt-5">
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
      </main>
    </>
  );
};
