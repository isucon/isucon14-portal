import React, { useEffect, useMemo, useState } from "react";
import type { GetCurrentSessionResponse } from "../../../proto/isuxportal/services/common/me_pb";
import type { AdminApiClient } from "./AdminApiClient";
import { ErrorMessage } from "../ErrorMessage";
import type { InstanceCommandExecuteRequestResult } from "../../../proto/isuxportal/resources/instance_command_execute_request_pb";
import { Timestamp } from "../Timestamp";
import { useParams } from "react-router-dom";

export interface Props {
  session: GetCurrentSessionResponse;
  client: AdminApiClient;
}

export const AdminLastValidationsCommandResult: React.FC<Props> = (props: Props) => {
  const { id: requestId } = useParams();
  if (!requestId) throw new Error("requestId is required");

  const [requesting, setRequesting] = React.useState(false);
  const [results, setResults] = React.useState<InstanceCommandExecuteRequestResult[] | null>(null);

  useEffect(() => {
    (async () => {
      setRequesting(true);
      try {
        const resp = await props.client.getInstanceCommandExecuteRequest(BigInt(requestId));
        setResults(resp.results);
      } catch (e) {
        setResults(null);
      } finally {
        setRequesting(false);
      }
    })();
  }, [props.client]);

  const rows = useMemo(() => {
    if (requesting) {
      return (
        <tr>
          <td colSpan={6}>Loading</td>
        </tr>
      );
    }
    if (!results || results.length <= 0) {
      return (
        <tr>
          <td colSpan={6}>No result</td>
        </tr>
      );
    }

    const resultsByTeamId = new Map<bigint, InstanceCommandExecuteRequestResult[]>();
    for (const result of results) {
      if (!resultsByTeamId.has(result.target!.teamId)) {
        resultsByTeamId.set(result.target!.teamId, []);
      }
      resultsByTeamId.get(result.target!.teamId)!.push(result);
    }
    return [...resultsByTeamId.values()].map((results) => (
      <InstanceCommandExecuteTeamResultRows
        client={props.client}
        results={results}
        key={results[0].target!.teamId.toString()}
      />
    ));
  }, [requesting, results]);

  return (
    <>
      <header>
        <h1 className="title is-1">Command Result (#{requestId})</h1>
      </header>
      <main className="mt-5">
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Team ID</th>
              <th>Instance Number</th>
              <th>Exit Code</th>
              <th>Finished At</th>
              <th>Output</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </main>
    </>
  );
};

const InstanceCommandExecuteTeamResultRows = ({
  client,
  results,
}: {
  client: AdminApiClient;
  results: InstanceCommandExecuteRequestResult[];
}) => {
  return (
    <>
      {[...results]
        .sort((a, b) => (a.target!.number > b.target!.number ? 1 : -1))
        .map((result, idx) => (
          <InstanceCommandExecuteResultRow
            client={client}
            result={result}
            teamIdLength={idx === 0 ? results.length : 0}
            key={result.id.toString()}
          />
        ))}
    </>
  );
};

const InstanceCommandExecuteResultRow = ({
  client,
  result,
  teamIdLength,
}: {
  client: AdminApiClient;
  result: InstanceCommandExecuteRequestResult;
  teamIdLength: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [requesting, setRequesting] = React.useState(false);
  const [modalContent, setModalContent] = useState<string | null>(null);

  useEffect(() => {
    if (!isModalOpen || requesting) return;
    (async () => {
      setRequesting(true);
      try {
        const resp = await client.getInstanceCommandExecuteRequestOutput(result.id!);
        setModalContent(resp.output!.output);
      } catch (e) {
        setModalContent(null);
      } finally {
        setRequesting(false);
      }
    })();
  }, [client, isModalOpen, result.id]);

  const renderModal = () => {
    if (!isModalOpen) return null;
    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">{requesting ? <p>Loading...</p> : <pre>{modalContent}</pre>}</div>
        <button className="modal-close is-large" aria-label="close" onClick={() => setIsModalOpen(false)}></button>
      </div>
    );
  };

  return (
    <tr>
      {teamIdLength > 0 ? <td rowSpan={teamIdLength}>{result.target!.teamId.toString()}</td> : null}
      <td>{result.target!.number.toString()}</td>
      <td className={result.exitCode != 0 ? "has-text-danger" : ""}>{result.exitCode.toString()}</td>
      <td>
        {result.finishedAt ? (
          <Timestamp timestamp={result.finishedAt!} />
        ) : (
          <span className="has-text-weight-bold">Running</span>
        )}
      </td>
      <td onClick={() => setIsModalOpen(true)}>
        <button className="button is-small">
          <span className="material-icons-outlined">launch</span>
        </button>
      </td>
      {renderModal()}
    </tr>
  );
};
