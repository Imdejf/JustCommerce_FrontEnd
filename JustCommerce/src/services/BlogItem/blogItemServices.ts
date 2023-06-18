import { conn } from "../../api/BaseConnection";
import { IListPageRequest, IListPageResponse } from "../../types/globalTypes";
import { IBlogItemInterface } from "types/BlogItem/blogItemTypes";

const endpoint = conn.endpoints.blogItem;

const getAll = (
    pageInfo: IListPageRequest,
  ): Promise<IListPageResponse<IBlogItemInterface>> => {
    console.log(pageInfo)
    return conn.getJSON(`${endpoint}`, "json", { 
      pageNumber: pageInfo.pageNumber,
      pageSize: pageInfo.pageSize,
      searchString: pageInfo.searchString,
      categoryId: pageInfo.storeId
     });
};

const getById = (id: string): Promise<IBlogItemInterface> => {
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