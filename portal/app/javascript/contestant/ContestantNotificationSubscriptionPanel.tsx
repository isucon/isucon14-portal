import { ApiError, ApiClient } from "../ApiClient";

import React from "react";

import { ErrorMessage } from "../ErrorMessage";
import type { GetCurrentSessionResponse } from "../../../proto/isuxportal/services/common/me_pb";

export interface Props {
  session: GetCurrentSessionResponse;
  client: ApiClient;

  serviceWorker: ServiceWorkerRegistration | null;
  localNotificationEnabled: boolean;
  setLocalNotificationEnabled: (flag: boolean) => any;
}

export const ContestantNotificationSubscriptionPanel: React.FC<Props> = (props: Props) => {
  const [sub, setSub] = React.useState<PushSubscription | null | undefined>(undefined);

  if (!("serviceWorker" in navigator)) return <></>;
  if (!("Notification" in window)) return <></>;

  const sw = props.serviceWorker;

  React.useEffect(() => {
    if (!sw) return;
    sw.pushManager
      .getSubscription()
      .then((s) => setSub(s))
      .catch((e) => console.warn("getSubscription failed:", e));
  }, [sw]);

  if (!sw) return <></>;
  if (sub === undefined) return <></>;

  return <ContestantNotificationSubscriptionPanelInner {...props} serviceWorker={sw} pushSubscription={sub} />;
};

export interface InnerProps extends Props {
  serviceWorker: ServiceWorkerRegistration;
  pushSubscription: PushSubscription | null;
}

const ContestantNotificationSubscriptionPanelInner: React.FC<InnerProps> = (props: InnerProps) => {
  const [pushSubscription, setPushSubscription] = React.useState(props.pushSubscription);

  if (pushSubscription) {
    const doUnsubscribe = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      try {
        await props.client.unsubscribeNotification(pushSubscription);
      } catch (e) {
        console.error("Unsubscribe API failed", e);
      }
      pushSubscription.unsubscribe();
      props.setLocalNotificationEnabled(false);
      setPushSubscription(null);
    };

    return (
      <button className="button is-small" onClick={doUnsubscribe}>
        <span className="material-icons" aria-label={"通知を無効にする"}>
          notifications_active
        </span>
      </button>
    );
  } else {
    const doSubscribe = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      try {
        const perm = await Notification.requestPermission();
        if (perm === "denied") {
          alert("ブラウザで通知が拒否されているため有効にできません");
          return;
        }
        if (perm === "default") {
          alert("通知が許可されませんでした (有効にできません)");
          return;
        }
      } catch (e) {
        console.error("requestPermission failure", e);
        alert("requestPermission failure");
      }
      try {
        const sub = await props.serviceWorker.pushManager.subscribe({
          applicationServerKey: props.session.pushVapidKey!,
          userVisibleOnly: true,
        });
        await props.client.subscribeNotification(sub);
        setPushSubscription(sub);
        props.setLocalNotificationEnabled(true);
      } catch (e) {
        console.error("Failed to subscribe", e);
        alert("Failed to subscribe");
      }
    };

    return (
      <button className="button is-small" onClick={doSubscribe}>
        通知を有効にする
        <span className="material-icons" aria-hidden={true}>
          notifications_none
        </span>
      </button>
    );
  }
};
