import { ApiError, ApiClient } from "../ApiClient";
import * as Rails from "@rails/ujs";

import React, { useState } from "react";
import { Link, useMatch } from "react-router-dom";

import { ErrorMessage } from "../ErrorMessage";
import type { ContestantInstance } from "../../../proto/isuxportal/resources/contestant_instance_pb";

type Props = {
  instances: ContestantInstance[];
};

export const ContestantCloudFormationMessage = ({ instances }: Props) => {
  const [closed, setClosed] = useState(
    (window.localStorage.getItem("isuxportal-closed-cloudformation-message") || "false") === "true",
  );
  const onCloseButtonClick = () => {
    window.localStorage.setItem("isuxportal-closed-cloudformation-message", "true");
    setClosed(true);
  };

  const isServerListRoute = !!useMatch({ path: "/contestant/contestant_instances", end: true });

  if (isServerListRoute) return null;
  if (instances.length > 0) return null;
  if (closed) return null;

  return (
    <div className="notification is-info is-light">
      <button className="delete" onClick={onCloseButtonClick}></button>
      インスタンスの登録が完了していません。CloudFormationのテンプレートは
      <Link to="/contestant/contestant_instances">サーバーリスト</Link>からダウンロードできます。
      インスタンスの起動後には画面のリロードが必要です。
    </div>
  );
};
