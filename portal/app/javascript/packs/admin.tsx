import { ApiClient } from "../ApiClient";
import { updateNavBarSession } from "../NavbarSession";
import { AdminApp } from "../AdminApp";
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
      <AdminApp session={session} client={client} />
    </React.StrictMode>
  );
})();
