import type { Notification } from "../../../proto/isuxportal/resources/notification_pb";
import type { ApiClient, ApiError } from "../ApiClient";

export class ContestantNotificationsObserver {
  client: ApiClient;
  last?: bigint;
  requesting: boolean;

  timer?: number;

  public onLastAnsweredClarificationIdChange?: (id: bigint | undefined) => any;
  public onNewNotifications?: (notifications: Notification[]) => any;

  lastAnsweredClarificationId?: bigint;

  constructor(client: ApiClient) {
    this.client = client;
    this.last = undefined;
    this.requesting = false;
  }

  public start() {
    if (this.timer) return;
    console.log("ContestantNotificationsObserver: start");
    this.poll();
    this.timer = window.setInterval(this.poll.bind(this), 20000);
  }

  public shutdown() {
    if (!this.timer) return;
    console.log("ContestantNotificationsObserver: shutdown");
    window.clearInterval(this.timer);
  }

  public async poll() {
    if (this.requesting) return;
    try {
      this.requesting = true;
      const resp = await this.client.listNotifications(this.last);

      const lastAnsweredClarificationId =
        resp.lastAnsweredClarificationId === 0n ? undefined : resp.lastAnsweredClarificationId;
      if (
        lastAnsweredClarificationId !== this.lastAnsweredClarificationId &&
        this.onLastAnsweredClarificationIdChange
      ) {
        console.log("ContestantNotificationsObserver: lastAnsweredClarificationId change", lastAnsweredClarificationId);
        this.onLastAnsweredClarificationIdChange(lastAnsweredClarificationId);
      }

      this.lastAnsweredClarificationId = lastAnsweredClarificationId;

      if (resp.notifications.length > 0 && this.onNewNotifications) {
        console.log("ContestantNotificationsObserver: observed newNotifications", resp.notifications);
        this.onNewNotifications(resp.notifications);
      }

      const last = resp.notifications[resp.notifications.length - 1];
      this.last = last?.id || this.last;
    } catch (e) {
      console.error("ContestantNotificationsObserver: error while polling", e);
      this.requesting = false;
    }
    this.requesting = false;
  }
}
