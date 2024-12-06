import { AdminApiClient } from "./AdminApiClient";

import React from "react";
import { BrowserRouter, Navigate, Route, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { ErrorMessage } from "../ErrorMessage";
import type { GetCurrentSessionResponse } from "../../../proto/isuxportal/services/common/me_pb";
import { create } from "@bufbuild/protobuf";
import { EnqueueBenchmarkJobRequestSchema } from "../../../proto/isuxportal/services/admin/benchmark_pb";

type Props = {
  session: GetCurrentSessionResponse;
  client: AdminApiClient;
};

export const AdminBenchmarkJobForm: React.FC<Props> = (props: Props) => {
  const [redirect, setRedirect] = React.useState<JSX.Element | null>(null);
  const [requesting, setRequesting] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<{
    teamId: string;
    targetNumber: string;
  }>({
    defaultValues: {},
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      setRequesting(true);
      const resp = await props.client.enqueueBenchmarkJob(
        create(EnqueueBenchmarkJobRequestSchema, {
          teamId: BigInt(data.teamId),
          targetNumber: data.targetNumber ? BigInt(data.targetNumber) : 0n,
        }),
      );
      setRedirect(
        <Navigate
          to={{
            pathname: `/admin/benchmark_jobs/${encodeURIComponent(resp.job!.id.toString())}`,
          }}
        />,
      );
    } catch (e) {
      setError(e);
    } finally {
      setRequesting(false);
    }
  });

  return (
    <div className="card mt-5">
      {redirect}
      <div className="card-content">
        <form onSubmit={onSubmit}>
          <div className="columns">
            <div className="column is-3 field">
              <label className="label" htmlFor="AdminBenchmarkJobForm-teamId">
                Team ID
              </label>
              <div className="control">
                <input className="input" type="text" id="AdminBenchmarkJobForm-teamId" {...register("teamId")} />
              </div>
            </div>
            <div className="column is-3 field">
              <label className="label" htmlFor="AdminBenchmarkJobForm-targetNumber">
                Target Instance Number
              </label>
              <div className="control">
                <input className="input" type="text" id="AdminBenchmarkJobForm-targetNumber" {...register("targetNumber")} />
              </div>
            </div>
            <div className="column is-3 field">
              <button className="button is-link" type="submit" disabled={requesting}>
                Enqueue
              </button>
            </div>
          </div>
          {error ? <ErrorMessage error={error} /> : null}
        </form>
      </div>
    </div>
  );
};
