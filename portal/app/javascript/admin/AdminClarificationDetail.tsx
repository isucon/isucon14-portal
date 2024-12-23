import { AdminApiClient } from "./AdminApiClient";

import React from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Clarification } from "../Clarification";
import { ErrorMessage } from "../ErrorMessage";
import type { GetCurrentSessionResponse } from "../../../proto/isuxportal/services/common/me_pb";
import type { Clarification as ClarificationType } from "../../../proto/isuxportal/resources/clarification_pb";
import { create } from "@bufbuild/protobuf";
import { RespondClarificationRequestSchema } from "../../../proto/isuxportal/services/admin/clarifications_pb";

interface QuickButtonProps {
  caption?: string;
  id?: string;
  body: string;
  onClick: (body: string) => any;
}

const ClarQuickButton: React.FC<QuickButtonProps> = (props: QuickButtonProps) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.onClick(props.body);
  };
  return (
    <button className="button" onClick={onClick}>
      {props.id ? <span>({props.id}) </span> : null} {props.caption ?? props.body.slice(0, 25)}
    </button>
  );
};

interface FormProps {
  session: GetCurrentSessionResponse;
  client: AdminApiClient;
  clarification: ClarificationType;
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
    disclose: boolean;
  }>({
    shouldUnregister: false,
    defaultValues: {
      question: props.clarification.question!,
      answer: props.clarification.answer!,
      disclose: props.clarification.disclosed!,
    },
  });

  const [list, setList] = React.useState<ClarificationType[] | null>(null);
  React.useEffect(() => {
    props.client
      .listClarifications()
      .then((resp) => setList(resp.clarifications))
      .catch((e) => setError(e));
  }, []);

  const onSubmit = handleSubmit(async (data, e) => {
    try {
      setRequesting(true);
      console.log(data);
      const resp = await props.client.respondClarification(
        create(RespondClarificationRequestSchema, {
          id: props.clarification.id,
          answer: data.answer,
          question: data.question,
          disclose: data.disclose,
        }),
      );
      props.onSubmit(resp.clarification!);
      setRequesting(false);
    } catch (e) {
      setError(e);
      setRequesting(false);
    }
  });

  const onQuickButton = (body: string) => {
    setValue("answer", body, { shouldDirty: true });
  };

  return (
    <div className="card mt-5">
      <div className="card-header">
        <h4 className="is-4 card-header-title">Response</h4>
      </div>
      <div className="card-content">
        <form onSubmit={onSubmit}>
          <div className="columns">
            <div className="column is-6">
              <div className="field">
                <label className="label" htmlFor="AdminClarificationDetail-question">
                  Question
                </label>
                <div className="control">
                  <textarea
                    className="textarea"
                    {...register("question")}
                    id="AdminClarificationDetail-question"
                    placeholder=""
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="checkbox">
                    <input type="checkbox" {...register("disclose")} />
                    Disclose (Visible to all teams)
                  </label>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-primary" type="submit" disabled={requesting}>
                    Respond
                  </button>
                </div>
              </div>
            </div>

            <div className="column is-6">
              <div className="field">
                <div className="control">
                  <label className="label" htmlFor="AdminClarificationDetail-answer">
                    Answer
                  </label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      {...register("answer")}
                      id="AdminClarificationDetail-answer"
                      placeholder=""
                      autoFocus
                    />
                  </div>
                </div>

                <section className="mt-5">
                  <h5 className="is-5 subtitle">Quick Response</h5>
                  <div className="buttons">
                    <ClarQuickButton body="はい" caption="Yes" onClick={onQuickButton} />
                    <ClarQuickButton body="いいえ" caption="No" onClick={onQuickButton} />
                    <ClarQuickButton
                      body="ドキュメント (マニュアル、レギュレーション、ルール等) や既存のアナウンスに記載されています。"
                      caption="Answered in task description"
                      onClick={onQuickButton}
                    />
                    <ClarQuickButton
                      body="運営側 (競技環境等) の問題ではありません。"
                      caption="This is a problem on your end"
                      onClick={onQuickButton}
                    />
                    <ClarQuickButton
                      body="質問が不明瞭のため回答できません。"
                      caption="Invalid question"
                      onClick={onQuickButton}
                    />
                    <ClarQuickButton body="その内容には回答できません。" caption="No comment" onClick={onQuickButton} />
                  </div>
                </section>

                <section className="mt-5">
                  <h5 className="is-5 subtitle">Past Responses</h5>
                  {list ? (
                    <div className="buttons are-small">
                      {list
                        .filter(
                          (v) =>
                            v.answered &&
                            v.question !== "Discord Support Channel Log" &&
                            v.answer &&
                            !v.answer.match(/^既に Clarification /),
                        )
                        .map((v) => (
                          <ClarQuickButton
                            id={v.id.toString()}
                            body={`${
                              v.disclosed ? `既に Clarification #${v.id} で回答されている内容です(再掲します)\n\n` : ""
                            }${v.answer!}`}
                            caption={v.answer!.slice(0, 25)}
                            onClick={onQuickButton}
                            key={v.id.toString()}
                          />
                        ))}
                    </div>
                  ) : (
                    <p>Loading</p>
                  )}
                </section>
              </div>
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
  id: string;
}

export const AdminClarificationDetail = (props: Omit<Props, "id">) => {
  const { id } = useParams();
  if (!id) throw new Error("id is required");
  return <AdminClarificationDetailInternal {...props} id={id} />;
};

const AdminClarificationDetailInternal: React.FC<Props> = (props: Props) => {
  const [error, setError] = React.useState<Error | null>(null);
  const [clar, setClar] = React.useState<ClarificationType | null>(null);

  React.useEffect(() => {
    props.client
      .getClarification(BigInt(props.id))
      .then((resp) => setClar(resp.clarification!))
      .catch((e) => setError(e));
  }, []);
  const onClarSubmit = (clar: ClarificationType) => {
    setClar(clar);
  };

  return (
    <>
      {error ? <ErrorMessage error={error} /> : null}
      {clar ? <Clarification clarification={clar} admin={true} /> : <p>Loading..</p>}
      {clar ? (
        <ClarForm session={props.session} client={props.client} onSubmit={onClarSubmit} clarification={clar} />
      ) : null}
    </>
  );
};
