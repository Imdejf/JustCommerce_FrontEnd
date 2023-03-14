import { conn } from "../../api/BaseConnection";
import { IListPageRequest, IListPageResponse } from "../../types/globalTypes";
import {ICategory, CategoryInterface, SortedCategory} from "../../types/Category/categoryTypes"

const endpoint = conn.endpoints.category;

const add = (
  category: ICategory | any,
  base64: string,
  categoryId: string
  ) => {
  return conn.postJSON(endpoint, "json", { ...category });
};

const edit = (category: any) => {
  console.log(category)
  console.log("add")
  return conn.putJSON(endpoint, "json", category)
}

const getAll = (
    pageInfo: IListPageRequest,
  ): Promise<IListPageResponse<CategoryInterface>> => {

    return conn.getJSON(`${endpoint}`, "json", { ...pageInfo });
};

const getAllSorted = (storeId: string):Promise<SortedCategory[]> => {
  return conn.getJSON(`${endpoint}/sortedcategory`, "json", {storeId})
}

const getDropDown = (storeId: string, searchQuery: string ) => {
  return conn.getJSON(`${endpoint}`, "json", {storeId, searchQuery, pageNumber: 1, pageSize: 50})
}

const getById = (id: string): Promise<CategoryInterface> => {
  return conn.getJSON(`${endpoint}/${id}`, "json");
}

const remove = (id: string) => {
  return conn.deleteJSON(`${endpoint}/${id}`);
};

const categoryServices = {
    getAll,
    getDropDown,
    add,
    getById,
    edit,
    remove,
    getAllSorted
}

export default categoryServices;
