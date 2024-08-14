import { ApiClient } from "../ApiClient";
import { updateNavBarSession } from "../NavbarSession";
import { AudienceApp } from "../AudienceApp";
import React from "react";
import { createRoot } from "react-dom/client";

(async function () {
  const client = new ApiClient();
  const session = await client.getCurrentSession();
  updateNavBarSession(session);
  const elem = document.getElementById("app")!;
  const root = createRoot(elem);
  root.render(
    <React.StrictMode>
      <AudienceApp session={session} client={client} />
    </React.StrictMode>
  );
})();
