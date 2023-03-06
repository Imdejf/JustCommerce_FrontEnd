import { conn } from "../api/BaseConnection";
import { IListPageRequest, IListPageResponse } from "../types/globalTypes";
import {
  IUserManagement,
  IUserManagementEditData,
  UserInterface,
  UserManagmentEditInterface,
} from "../types/userTypes";

const filesEndpoint = conn.endpoints.files;
const filesCategoryEndpoint = conn.endpoints.filesCategory;

const get = (userId: string): Promise<UserInterface> => {
  return conn.getJSON(`${filesEndpoint}/${userId}`, "json");
};

const getUser = (userId: string): Promise<UserInterface> => {
  return conn.getJSON(`${filesEndpoint}/${userId}`, "json");
};

const edit = (user: UserManagmentEditInterface): Promise<IUserManagement> => {
  return conn.putJSON(`${filesEndpoint}`, "json", user);
};

const activateUser = (UserId: string): Promise<IUserManagement> => {
  return conn.putJSON(`${filesEndpoint}/Activate`, "json", { UserId });
};

const activate = (userId: string): Promise<IUserManagement> => {
  return conn.patchJSON(`${filesEndpoint}/Activate`, "json", { userId });
};

const deactivateUser = (UserId: string): Promise<IUserManagement> => {
  return conn.putJSON(`${filesEndpoint}/Deactivate`, "json", { UserId });
};

const remove = (Id: string) => {
  return conn.deleteJSON(`${filesEndpoint}/${Id}`);
};

const getAll = (
  pageInfo: IListPageRequest
): Promise<IListPageResponse<UserInterface>> => {
  return conn.getJSON(`${filesEndpoint}`, "json", { ...pageInfo });
};

const getAllCategories = () => {
  return conn.getJSON(`${filesCategoryEndpoint}`, "json");
};

const addNewCategory = (category: string) => {
  return conn.postJSON(`${filesCategoryEndpoint}`, "json", category);
};

const addNewFile = (
  file: any,
  CategoryId: string,
  FileName: string,
  Base64String: string
) => {
  return conn.postJSON(`${filesEndpoint}`, "json", {
    ...file,
    CategoryId,
    FileName,
    File: {
      Base64String,
    },
  });
};

const filesService = {
  activate,
  remove,
  edit,
  getAll,
  get,
  getUser,
  activateUser,
  deactivateUser,
  getAllCategories,
  addNewCategory,
  addNewFile,
};

export default filesService;
