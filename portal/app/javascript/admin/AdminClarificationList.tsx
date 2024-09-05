import { AdminApiClient } from "./AdminApiClient";

import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Clarification } from "../Clarification";
import { ErrorMessage } from "../ErrorMessage";
import type { GetCurrentSessionResponse } from "../../../proto/isuxportal/services/common/me_pb";
import type { Clarification as ClarificationType } from "../../../proto/isuxportal/resources/clarification_pb";
import { create } from "@bufbuild/protobuf";
import { CreateClarificationRequestSchema } from "../../../proto/isuxportal/services/admin/clarifications_pb";

type ListFilterProps = {
  teamId: string | null;
  unansweredOnly: boolean;
};
const ListFilter: React.FC<ListFilterProps> = (props: ListFilterProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ListFilterProps>({
    defaultValues: props,
  });
  const onSubmit = handleSubmit((data) => {
    const search = new URLSearchParams();
    search.set("team_id", data.teamId || "");
    search.set("unanswered_only", data.unansweredOnly ? "1" : "0");
    navigate("/admin/clarifications?" + search.toString());
  });

  return (
    <div className="has-background-info-light card mt-5">
      <div className="card-content">
        <form onSubmit={onSubmit}>
          <div className="columns">
            <div className="column is-3 field">
              <label className="has-text-info-dark label" htmlFor="AdminClarificationListFilter-teamId">
                Team ID
              </label>
              <div className="control">
                <input className="input" type="text" id="AdminClarificationListFilter-teamId" {...register("teamId")} />
              </div>
            </div>
            <div className="column is-3 field">
              <label className="has-text-info-dark label" htmlFor="AdminClarificationListFilter-unansweredOnly">
                Unanswered Only
              </label>
              <div className="control">
                <input
                  type="checkbox"
                  id="AdminClarificationListFilter-unansweredOnly"
                  {...register("unansweredOnly")}
                />
              </div>
            </div>
            <div className="column is-3 field">
              <button className="button is-link" type="submit">
                Filter
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
interface FormProps {
  session: GetCurrentSessionResponse;
  client: AdminApiClient;
  onSubmit: (clar: ClarificationType) => any;
}

const ClarForm: React.FC<FormProps> = (props: FormProps) => {
  const [requesting, setRequesting] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);
  const {
    reset,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<{
    answer: string;
    question: string;
    teamId: string;
    unansweredOnly: boolean;
  }>({
    shouldUnregister: false,
    defaultValues: {
      answer: "",
      question: "",
      teamId: "",
    },
  });

  const onSubmit = handleSubmit(async (data, e) => {
    try {
      setRequesting(true);
      console.log(data);

      const teamIdString = data.teamId;
      let teamId;
      if (teamIdString === "") {
        teamId = 0;
      } else if (/^\d+$/.test(teamIdString)) {
        teamId = parseInt(teamIdString, 10);
      } else {
        throw new Error(`Invalid teamId: ${teamIdString}`);
      }

      const resp = await props.client.createClarification(
        create(CreateClarificationRequestSchema, {
          answer: data.answer,
          question: data.question,
          teamId: data.teamId !== "" ? BigInt(data.teamId) : 0n,
        }),
      );
      props.onSubmit(resp.clarification!);
      e!.target.reset();
      setError(null);
    } catch (e) {
      setError(e);
    } finally {
      setRequesting(false);
    }
  });

  return (
    <div className="card mt-5">
      <div className="card-header">
        <h4 className="is-4 card-header-title">Create a clarification</h4>
      </div>
      <div className="card-content">
        <form onSubmit={onSubmit}>
          <div className="columns">
            <div className="column field is-6">
              <label className="label" htmlFor="AdminClarificationListForm-question">
                Question
              </label>
              <div className="control">
                <textarea
                  className="textarea"
                  {...register("question")}
                  id="AdminClarificationListForm-question"
                  placeholder=""
                  autoFocus
                />
              </div>
            </div>
            <div className="column field is-6">
              <div className="control">
                <label className="label" htmlFor="AdminClarificationListForm-answer">
                  Answer
                </label>
                <div className="control">
                  <textarea
                    className="textarea"
                    {...register("answer")}
                    id="AdminClarificationListForm-answer"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="AdminClarificationListForm-teamId">
              Team ID
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                id="AdminClarificationListForm-teamId"
                {...register("teamId")}
                placeholder="optional; disclosed to the all teams if not set"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-primary" type="submit" disabled={requesting}>
                Send
              </button>
            </div>
          </div>
          {error ? <ErrorMessage error={error} /> : null}
        </form>
      </div>
    </div>
  );
};

export interface Props {
  session: GetCurrentSessionResponse;
  client: AdminApiClient;
  teamId: string | null;
  unansweredOnly: boolean;
}

export const AdminClarificationList = (props: Omit<Props, "teamId" | "unansweredOnly">) => {
  const [query] = useSearchParams();
  return (
    <AdminClarificationListInternal
      {...props}
      teamId={query.get("team_id")}
      unansweredOnly={query.get("unanswered_only") === "1"}
    />
  );
};

const AdminClarificationListInternal: React.FC<Props> = (props: Props) => {
  const { teamId, unansweredOnly } = props;
  const [error, setError] = React.useState<Error | null>(null);
  const [list, setList] = React.useState<ClarificationType[] | null>(null);

  React.useEffect(() => {
    props.client
      .listClarifications(teamId ? BigInt(teamId) : undefined, unansweredOnly)
      .then((resp) => setList(resp.clarifications))
      .catch((e) => setError(e));
  }, [location.search]);
  const onClarSubmit = (clar: ClarificationType) => {
    setList(list ? [clar, ...list] : [clar]);
  };

  const renderList = () => {
    if (!list) return null;
    return list.map((clar) => {
      return <Clarification clarification={clar} admin={true} key={clar.id!.toString()} />;
    });
  };

  return (
    <>
      <ClarForm session={props.session} client={props.client} onSubmit={onClarSubmit} />
      <ListFilter teamId={teamId} unansweredOnly={unansweredOnly} />
      {error ? <ErrorMessage error={error} /> : null}
      {list ? renderList() : <p>Loading..</p>}
    </>
  );
};
