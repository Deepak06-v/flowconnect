import { createContext, useEffect, useState } from "react";
import { socket } from "../utils/socket";
import { fetchNotifications } from "../api/notificationApi";

type NotificationPayload = Record<string, unknown>;

export const NotificationContext = createContext<any>(null);

export const NotificationProvider = ({ children }: any) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const userId = "USER_ID"; // replace with auth

  useEffect(() => {
    socket.emit("register", userId);

    socket.on("receive_notification", (data: NotificationPayload) => {
      setNotifications((prev) => [data, ...prev]);
    });

    fetchNotifications(userId).then(setNotifications);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};