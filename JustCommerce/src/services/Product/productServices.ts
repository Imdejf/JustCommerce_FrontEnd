import { LanguageInterface } from "types/Language/languageTypes";
import { conn } from "../../api/BaseConnection";
import { IListPageRequest, IListPageResponse } from "types/globalTypes";
import { IProduct, ProductListItemDTO, ProductDTO, IProductOption, IProductVariation } from "types/Product/product";

const endpoint = conn.endpoints.product;

const add = (product: IProduct | any) => {
    return conn.postJSON(endpoint + "/product", "json", product);
  };
  
const addOptionValue = (optionValue: IProductOption | any) => {
  return conn.postJSON(endpoint + "/ProductOption", "json", optionValue);
}

const addVariation = (variation: IProductVariation | any) => {
  return conn.postJSON(endpoint + "/ProductVariation", "json", variation);
}

const editVariation = (variation: IProductVariation | any) => {
  return conn.putJSON(endpoint + "/ProductVariation", "json", variation);
}


const editOptionValue = (optionValue: IProductOption | any) => {
  return conn.putJSON(endpoint + "/ProductOption", "json", optionValue);
}

const edit = (product: any) => {
  return conn.putJSON(endpoint + "/product", "json", product)
}

const getAll = (
  pageInfo: IListPageRequest,
): Promise<IListPageResponse<ProductListItemDTO>> => {
  return conn.getJSON(`${endpoint + "/product"}`, "json", { ...pageInfo });
};

const getById = (id: string): Promise<ProductDTO> => {
  return conn.getJSON(`${endpoint + "/product"}/${id}`, "json");
}

const remove = (id: string) => {
  return conn.deleteJSON(`${endpoint}/${id}`);
};

const productOptionServices = {
    getAll,
    add,
    addOptionValue,
    editOptionValue,
    editVariation,
    addVariation,
    getById,
    edit,
    remove
}

export default productOptionServices;