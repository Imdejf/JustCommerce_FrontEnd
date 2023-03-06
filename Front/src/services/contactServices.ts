import { conn } from "../api/BaseConnection";
import { IListPageRequest, IListPageResponse } from "../types/globalTypes";
import { IUser, UserInterface } from "../types/userTypes";

const endpoint = conn.endpoints.auth;

const getAll = (
  pageInfo: IListPageRequest
): Promise<IListPageResponse<UserInterface>> => {
  return conn.getJSON(`${endpoint}/GetAllContacts`, "json", { ...pageInfo });
};

const contactServices = {
  getAll,
};

export default contactServices;
