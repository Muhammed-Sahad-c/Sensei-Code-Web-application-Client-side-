import { userAxiosInstance } from "../axios/instance";

export const getUnreadedNotifications = (email) => {
  return userAxiosInstance.get("/getunreadednotifications", {
    headers: { email: email },
  });
};

export const deleteNotifications = (id, email) => {
  return userAxiosInstance.post("/deletenotifications", {
    notificationId: id,
    email: email,
  });
};
