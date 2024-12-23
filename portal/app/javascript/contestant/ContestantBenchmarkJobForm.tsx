import { ApiError, ApiClient } from "../ApiClient";

import React from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { ErrorMessage } from "../ErrorMessage";
import { create } from "@bufbuild/protobuf";
import { EnqueueBenchmarkJobRequestSchema } from "../../../proto/isuxportal/services/contestant/benchmark_pb";
import type { GetCurrentSessionResponse } from "../../../proto/isuxportal/services/common/me_pb";

type Props = {
  session: GetCurrentSessionResponse;
  client: ApiClient;
};

export const ContestantBenchmarkJobForm: React.FC<Props> = (props: Props) => {
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
    targetId: string;
  }>({
    defaultValues: {
      targetId: window.localStorage.getItem("isuxportal-last-target-id") || "",
    },
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      setRequesting(true);
      const resp = await props.client.enqueueBenchmarkJob(
        create(EnqueueBenchmarkJobRequestSchema, {
          targetId: data.targetId ? BigInt(data.targetId) : 0n,
        }),
      );
      try {
        window.localStorage.setItem("isuxportal-last-target-id", data.targetId);
      } catch (e) {
        console.warn(e);
      }
      setRedirect(
        <Navigate
          to={{
            pathname: `/contestant/benchmark_jobs/${encodeURIComponent(resp.job!.id!.toString())}`,
          }}
        />,
      );
    } catch (e) {
      setError(e);
      setRequesting(false);
    }
  });

  return (
    <div className="card mt-5">
      {redirect}
      <div className="card-content">
        <form onSubmit={onSubmit}>
          <div className="field has-addons">
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select {...register("targetId")}>
                  {(props.session.contestantInstances || []).map((ci) => {
                    return (
                      <option key={ci.id.toString()} value={ci.id.toString()}>
                        {ci.number.toString()}: {ci.privateIpv4Address} ({ci.publicIpv4Address})
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="control">
              <button className="button is-primary" type="submit" disabled={requesting}>
                Enqueue
              </button>
            </div>
          </div>
          <p className="is-size-7">
            ベンチ対象サーバーを選択して Enqueue してください。最終計測には最後に利用したサーバーが利用されます。
          </p>
          {error ? <ErrorMessage error={error} /> : null}
        </form>
      </div>
    </div>
  );
};
