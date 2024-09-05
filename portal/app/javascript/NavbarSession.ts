import { ApiClient } from "./ApiClient";
import type { GetCurrentSessionResponse } from "../../proto/isuxportal/services/common/me_pb";

export function updateNavBarSession(session: GetCurrentSessionResponse) {
  if (session.contestant) {
    document.body.classList.add("isux-session-user");
  } else {
    document.body.classList.add("isux-session-guest");
  }
  console.log(session);
}

export async function fetchAndUpdateNavbarSession() {
  const client = new ApiClient();
  updateNavBarSession(await client.getCurrentSession());
}
