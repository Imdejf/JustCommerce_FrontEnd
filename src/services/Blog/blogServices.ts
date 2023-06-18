import { conn } from "../../api/BaseConnection";
import { IListPageRequest, IListPageResponse } from "../../types/globalTypes";
import { BlogCategoryInterface } from "../../types/Blog/blogTypes"

const endpoint = conn.endpoints.blog;

const getAll = (
    pageInfo: IListPageRequest,
  ): Promise<IListPageResponse<BlogCategoryInterface>> => {

    return conn.getJSON(`${endpoint}`, "json", { ...pageInfo });
};

const getById = (id: string): Promise<BlogCategoryInterface> => {
  return conn.getJSON(`${endpoint}/${id}`, "json");
}

const add = (
  category: any,
  ) => {
  return conn.postJSON(endpoint, "json", { ...category });
};


const blogServices = {
    getAll,
    getById,
    add
}

export default blogServices;