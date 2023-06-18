import { conn } from "../api/BaseConnection";
import { IListPageRequest, IListPageResponse } from "../types/globalTypes";
import {
  IUserManagement,
  IUserManagementEditData,
  UserInterface,
  UserManagmentEditInterface,
} from "../types/userTypes";

const endpoint = conn.endpoints.users;
const profileEndpoint = conn.endpoints.profile;
const userEndpoint = conn.endpoints.auth;

const get = (userId: string): Promise<UserInterface> => {
  return conn.getJSON(`${userEndpoint}/${userId}`, "json");
};

const getUser = (userId: string): Promise<UserInterface> => {
  return conn.getJSON(`${userEndpoint}/${userId}`, "json");
};

const edit = (user: UserManagmentEditInterface): Promise<IUserManagement> => {
  return conn.putJSON(`${userEndpoint}`, "json", user);
};

const activateUser = (UserId: string): Promise<IUserManagement> => {
  return conn.putJSON(`${userEndpoint}/Activate`, "json", { UserId });
};

const activate = (userId: string): Promise<IUserManagement> => {
  return conn.patchJSON(`${endpoint}/Activate`, "json", { userId });
};

const deactivateUser = (UserId: string): Promise<IUserManagement> => {
  return conn.putJSON(`${userEndpoint}/Deactivate`, "json", { UserId });
};

const remove = (Id: string) => {
  return conn.deleteJSON(`${userEndpoint}/${Id}`);
};

const getAll = (
  pageInfo: IListPageRequest,
): Promise<IListPageResponse<UserInterface>> => {
  return conn.getJSON(`${userEndpoint}/GetAllUser`, "json", { ...pageInfo });
};

const usersService = {
  activate,
  remove,
  edit,
  getAll,
  get,
  getUser,
  activateUser,
  deactivateUser,
};

export default usersService;
