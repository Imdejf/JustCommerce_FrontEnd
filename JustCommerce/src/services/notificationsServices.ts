import { conn } from "../api/BaseConnection";
import { IListPageRequest, IListPageResponse } from "../types/globalTypes";
import {
  IUserManagement,
  IUserManagementEditData,
  UserInterface,
  UserManagmentEditInterface,
} from "../types/userTypes";

const notificationEndpoint = conn.endpoints.notification;

const get = (userId: string): Promise<UserInterface> => {
  return conn.getJSON(`${notificationEndpoint}/${userId}`, "json");
};

const edit = (user: UserManagmentEditInterface): Promise<IUserManagement> => {
  return conn.putJSON(`${notificationEndpoint}`, "json", user);
};

const activate = (userId: string): Promise<IUserManagement> => {
  return conn.patchJSON(`${notificationEndpoint}/Activate`, "json", { userId });
};

const remove = (Id: string) => {
  return conn.deleteJSON(`${notificationEndpoint}/${Id}`);
};

const grantNotification = (UserId: string, NotificationType: number) => {
  const body = {
    UserId,
    NotificationType,
  };

  return conn.postJSON(
    `${notificationEndpoint}/SubscribeNotification`,
    "json",
    body,
  );
};

const revokeNotification = (UserId: string, NotificationType: number) => {
  const body = {
    UserId,
    NotificationType,
  };

  return conn.postJSON(
    `${notificationEndpoint}/UnsubscribeNotification`,
    "json",
    body,
  );
};

const getAllNotifications = (UserId: string) => {
  const body = {
    UserId,
    PageSize: 99,
    PageNumber: 1,
  };
  return conn.getJSON(
    `${notificationEndpoint}/GetLatestNotification`,
    "json",
    body,
  );
};

const seeNotification = (UserId: string, SendNotificationId: string) => {
  const body = {
    UserId,
    SendNotificationId,
  };
  return conn.putJSON(`${notificationEndpoint}/SeeNotification`, "json", body);
};

const completeNotification = (UserId: string, SendNotificationId: string) => {
  const body = {
    UserId,
    SendNotificationId,
  };
  return conn.putJSON(
    `${notificationEndpoint}/CompleteNotification`,
    "json",
    body,
  );
};

const clearAllNotifications = (userId: string) => {
  return conn.deleteJSON(
    `${notificationEndpoint}/ClearNotifications/${userId}`,
  );
};

const notificationsServices = {
  activate,
  remove,
  edit,
  get,
  grantNotification,
  revokeNotification,
  getAllNotifications,
  seeNotification,
  completeNotification,
  clearAllNotifications,
};

export default notificationsServices;
