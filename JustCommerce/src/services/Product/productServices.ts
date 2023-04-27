import { LanguageInterface } from "types/Language/languageTypes";
import { conn } from "../../api/BaseConnection";
import { IListPageRequest, IListPageResponse } from "types/globalTypes";
import { IProduct, ProductListItemDTO, ProductDTO, IProductOption, IProductVariation, IProductAttributeValue, ProductCategoryDTO, IRelatedProduct } from "types/Product/product";

const endpoint = conn.endpoints.product;

const add = (product: IProduct | any) => {
    return conn.postJSON(endpoint + "/product", "json", product);
  };
  
const addOptionValue = (optionValue: IProductOption | any) => {
  return conn.postJSON(endpoint + "/ProductOption", "json", optionValue);
}

const addAtribute = (optionValue: IProductAttributeValue | any) => {
  return conn.postJSON(endpoint + "/AttributeValue", "json", optionValue);
}

const addVariation = (variation: IProductVariation | any) => {
  return conn.postJSON(endpoint + "/ProductVariation", "json", variation);
}

const editVariation = (variation: IProductVariation | any) => {
  return conn.putJSON(endpoint + "/ProductVariation", "json", variation);
}

const editRelatedProduct = (optionValue: IRelatedProduct | any) => {
  return conn.putJSON(endpoint + "/RelatedProduct", "json", optionValue);
}

const editAtribute = (optionValue: IProductAttributeValue | any) => {
  return conn.putJSON(endpoint + "/AttributeValue", "json", optionValue);
}

const editCategories = (optionValue: ProductCategoryDTO | any) => {
  return conn.putJSON(endpoint + "/ProductCategory", "json", optionValue);
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
    addAtribute,
    editCategories,
    editOptionValue,
    editVariation,
    editRelatedProduct,
    addVariation,
    getById,
    editAtribute,
    edit,
    remove
}

export default productOptionServices;