import { LanguageInterface } from "types/Language/languageTypes";
import { conn } from "../../api/BaseConnection";
import { IListPageRequest, IListPageResponse } from "types/globalTypes";
import { IProduct } from "types/Product/product";

const endpoint = conn.endpoints.product;

const add = (productOption: IProduct | any) => {
    console.log(productOption)
    return conn.postJSON(endpoint, "json", productOption);
  };
  
const edit = (productOption: any) => {
  return conn.putJSON(endpoint, "json", productOption)
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