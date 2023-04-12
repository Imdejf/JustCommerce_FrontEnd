import { LanguageInterface } from "types/Language/languageTypes";
import { conn } from "../../api/BaseConnection";
import { IListPageRequest, IListPageResponse } from "types/globalTypes";
import { IProduct } from "types/Product/product";

const endpoint = conn.endpoints.product;

const add = (product: IProduct | any) => {
    return conn.postJSON(endpoint + "/product", "json", product);
  };
  
const edit = (product: any) => {
  return conn.putJSON(endpoint + "/product", "json", product)
}

const getAll = (
  pageInfo: IListPageRequest,
): Promise<IListPageResponse<IProduct>> => {

  return conn.getJSON(`${endpoint}`, "json", { ...pageInfo });
};

const getById = (id: string): Promise<IProduct> => {
  return conn.getJSON(`${endpoint}/${id}`, "json");
}

const remove = (id: string) => {
  return conn.deleteJSON(`${endpoint}/${id}`);
};

const productOptionServices = {
    getAll,
    add,
    getById,
    edit,
    remove
}

export default productOptionServices;