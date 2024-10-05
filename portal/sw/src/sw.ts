declare var self: ServiceWorkerGlobalScope; export { };

import { skipWaiting, clientsClaim } from "workbox-core";
import { openDB } from "idb";
import { Notification, NotificationSchema } from "../../proto/isuxportal/resources/notification_pb";
import { fromBinary } from "@bufbuild/protobuf";

skipWaiting();
clientsClaim();

console.log("SW!");

const openDb = () => openDB("isuxportal-swKnownNotifications", 3, {
  upgrade(db) {
    db.createObjectStore('kv2', { keyPath: 'id' });
  }
});


self.addEventListener('activate', (e) => {
  console.log("SW! activate");
  if (new Date().getTime() > 1735657200000) { // 2025/1/1 00:00:00 JST
    self.registration.unregister();
    return;
  }

  const idbInitPromise = openDb();
  e.waitUntil(idbInitPromise);
});

const openUrl = (event: ExtendableEvent, path: string) => {
  const url = new URL(path, self.location.origin).href;
  const promise = self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
    const windowClients = clients as WindowClient[];
    const match = windowClients.find((c) => c.url === url);
    if (match) {
      return match.focus();
    } else {
      return self.clients.openWindow(url);
    }
  });
  event.waitUntil(promise);
}

const showNotification = async (n: Notification) => {
  const tag = `isuxportal-pushtag-${n.id}`;
  console.log("SW showNotification:", tag, n);

  const wasKnown = await (async () => {
    const obj = { id: n.id!.toString(), known: true };
    const db = await openDb();
    const txn = await db.transaction('kv2', 'readwrite');
    const store = await txn.objectStore('kv2');

    const known = (await store.get(obj.id))?.known;
    if (!known) {
      await store.put(obj);
    }
    await txn.done;
    return known;
  })();
  if (wasKnown) {
    console.log("SW showNotification knownSkip", tag);
    return;
  }

  let promise: Promise<void> | null = null;

  if (n.content.case === "contentTest") {
    promise = self.registration.showNotification("isuxportal test notification", { body: `test ${n.content.value.something} ${n.id}`, tag, data: `/contestant` });
  } else if (n.content.case === "contentBenchmarkJob") {
    promise = self.registration.showNotification(
      `Benchmark Job Completed`,
      {
        body: `Benchmark Job #${n.content.value.benchmarkJobId!} has finished.`,
        data: `/contestant/benchmark_jobs/${n.content.value.benchmarkJobId!}`,
        tag,
      },
    );
  } else if (n.content.case === "contentClarification") {
    const c = n.content.value;
    let title = "Clarification updated";
    if (!c.owned && !c.admin && !c.updated) {
      title = "新しい質問と回答が公開されました";
    } else if (!c.owned && !c.admin && c.updated) {
      title = "質問と回答が更新されました";
    } else if (!c.owned && c.admin && !c.updated) {
      title = "アナウンスが追加されました";
    } else if (!c.owned && c.admin && c.updated) {
      title = "アナウンスが更新されました";
    } else if (c.owned && !c.admin && !c.updated) {
      title = "質問/サポート依頼が回答されました";
    } else if (c.owned && !c.admin && c.updated) {
      title = "質問/サポート依頼の回答が更新されました";
    } else if (c.owned && c.admin && !c.updated) {
      title = "運営よりメッセージが届いています";
    } else if (c.owned && c.admin && c.updated) {
      title = "運営からのメッセージが更新されました";
    }

    promise = self.registration.showNotification(
      title,
      {
        body: `Clarification #${c.clarificationId!}`,
        data: `/contestant/clarifications`,
        tag,
      },
    );
  }
  await promise;
}

interface LocalNotificationMessage {
  kind: "localNotification";
  notifications: Notification[],
}

const handleLocalNotifications = async (data: LocalNotificationMessage) => {
  console.log("local notifications", data.notifications);

  for (const v of data.notifications) await showNotification(v);
};

self.addEventListener('message', (e) => {
  console.log("SW message", e);
  const data = e.data;
  switch (data.kind) {
    case "localNotification":
      e.waitUntil(handleLocalNotifications(data));
      break;
    default:
      console.warn("Unknown message received at sw", data);
      break;
  }
});

self.addEventListener('push', (e) => {
  console.log("SW push", e);
  if (!e.data) return;
  let notification: Notification | null = null;
  try {
    const wire = Uint8Array.from(atob(e.data.text()), c => c.charCodeAt(0));
    notification = fromBinary(NotificationSchema, wire);
  } catch (e) {
    console.error("SW push error while decoding", e);
  }
  console.log("SW push notification", notification);
  if (notification) {
    e.waitUntil(showNotification(notification));
  }
});

self.addEventListener('notificationclick', (e) => {
  if (e.notification.data && e.notification.data !== "") openUrl(e, e.notification.data);
});
