import { conn } from "../api/BaseConnection";
import { IListPageRequest, IListPageResponse } from "../types/globalTypes";
import {
  IUserManagement,
  IUserManagementEditData,
  UserInterface,
  UserManagmentEditInterface,
} from "../types/userTypes";

const permissionEndpoint = conn.endpoints.permission;

const get = (userId: string): Promise<UserInterface> => {
  return conn.getJSON(`${permissionEndpoint}/${userId}`, "json");
};

const getUser = (userId: string): Promise<UserInterface> => {
  return conn.getJSON(`${permissionEndpoint}/${userId}`, "json");
};

const edit = (user: UserManagmentEditInterface): Promise<IUserManagement> => {
  return conn.putJSON(`${permissionEndpoint}`, "json", user);
};

const activateUser = (UserId: string): Promise<IUserManagement> => {
  return conn.putJSON(`${permissionEndpoint}/Activate`, "json", { UserId });
};

const activate = (userId: string): Promise<IUserManagement> => {
  return conn.patchJSON(`${permissionEndpoint}/Activate`, "json", { userId });
};

const deactivateUser = (UserId: string): Promise<IUserManagement> => {
  return conn.putJSON(`${permissionEndpoint}/Deactivate`, "json", { UserId });
};

const remove = (Id: string) => {
  return conn.deleteJSON(`${permissionEndpoint}/${Id}`);
};

const getAll = (
  pageInfo: IListPageRequest,
): Promise<IListPageResponse<UserInterface>> => {
  return conn.getJSON(`${permissionEndpoint}`, "json", { ...pageInfo });
};

const getAllProfiles = () => {
  return conn.getJSON(`${permissionEndpoint}/GetProfiles`, "json");
};

const grantPermissionForUser = (
  UserId: string,
  PermissionDomainName: string,
  PermissionFlagValue: number,
) => {
  const body = {
    UserId,
    PermissionDomainName,
    PermissionFlagValue,
  };

  return conn.postJSON(
    `${permissionEndpoint}/GrantPermissionForUser`,
    "json",
    body,
  );
};

const revokePermissionFromUser = (
  UserId: string,
  PermissionDomainName: string,
  PermissionFlagValue: number,
) => {
  const body = {
    UserId,
    PermissionDomainName,
    PermissionFlagValue,
  };

  return conn.postJSON(
    `${permissionEndpoint}/RevokePermissionFromUser`,
    "json",
    body,
  );
};

const permissionsServices = {
  activate,
  remove,
  edit,
  getAll,
  get,
  getUser,
  activateUser,
  deactivateUser,
  getAllProfiles,
  grantPermissionForUser,
  revokePermissionFromUser,
};

export default permissionsServices;
