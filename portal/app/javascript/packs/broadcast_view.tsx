import "./broadcast_view.scss";
import { ApiClient } from "../ApiClient";
import { BroadcastViewApp } from "../BroadcastViewApp";
import React from "react";
import { createRoot } from "react-dom/client";

(async function () {
  const client = new ApiClient();
  const session = await client.getCurrentSession();
  const elem = document.getElementById("app")!;
  const root = createRoot(elem);
  root.render(
    <React.StrictMode>
      <BroadcastViewApp session={session} client={client} />
    </React.StrictMode>
  );
})();
