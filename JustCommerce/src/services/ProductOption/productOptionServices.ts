import { LanguageInterface } from "types/Language/languageTypes";
import { conn } from "../../api/BaseConnection";
import { IProductOption, ProductOptionInterface } from "types/ProductOption/productOptionTypes";
import { IListPageRequest, IListPageResponse } from "types/globalTypes";

const endpoint = conn.endpoints.productOption;

const add = (productOption: IProductOption | any) => {
    return conn.postJSON(endpoint, "json", productOption);
  };
  
const edit = (productOption: any) => {
  return conn.putJSON(endpoint, "json", productOption)
}

const getAll = (
  pageInfo: IListPageRequest,
): Promise<IListPageResponse<ProductOptionInterface>> => {

  return conn.getJSON(`${endpoint}`, "json", { ...pageInfo });
};

const getById = (id: string): Promise<ProductOptionInterface> => {
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