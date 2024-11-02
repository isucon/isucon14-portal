import React from "react";
import type { GetCurrentSessionResponse } from "../../../proto/isuxportal/services/common/me_pb";
import type { AdminApiClient } from "./AdminApiClient";

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
      <main>Content</main>
    </>
  );
};
