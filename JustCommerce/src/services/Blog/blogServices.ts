import { conn } from "../../api/BaseConnection";
import { IListPageRequest, IListPageResponse } from "../../types/globalTypes";
import {BlogCategoryInterface} from "../../types/Blog/blogTypes"

const endpoint = conn.endpoints.blog;

const getAll = (
    pageInfo: IListPageRequest,
  ): Promise<IListPageResponse<BlogCategoryInterface>> => {

    return conn.getJSON(`${endpoint}`, "json", { ...pageInfo });
};

const blogServices = {
    getAll,
}

export default blogServices;