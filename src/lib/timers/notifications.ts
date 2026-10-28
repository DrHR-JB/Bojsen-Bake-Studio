export function notificationsSupported(): boolean {
  return typeof window !== "undefined" && "Notification" in window;
}

export function notificationPermission(): NotificationPermission | "unsupported" {
  return notificationsSupported() ? Notification.permission : "unsupported";
}

export async function requestNotificationPermission(): Promise<NotificationPermission | "unsupported"> {
  if (!notificationsSupported()) return "unsupported";
  try {
    return await Notification.requestPermission();
  } catch {
    return Notification.permission;
  }
}

export function registerServiceWorker() {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("/sw.js").catch(() => {
    // Notifikationer falder tilbage til `new Notification` uden service worker.
  });
}

/**
 * Viser en browsernotifikation. På mobil (fx Chrome på Android) virker
 * `new Notification` ikke, så vi bruger service workerens `showNotification`, når den findes.
 */
export async function showNotification(title: string, body: string, tag: string) {
  if (!notificationsSupported() || Notification.permission !== "granted") return;
  const options: NotificationOptions = { body, tag, icon: "/icon.svg", requireInteraction: true };
  try {
    const registration = await navigator.serviceWorker?.getRegistration();
    if (registration) {
      await registration.showNotification(title, options);
      return;
    }
  } catch {
    // fald igennem til den simple variant
  }
  try {
    new Notification(title, options);
  } catch {
    // Browseren understøtter ikke notifikationer i denne kontekst.
  }
}
