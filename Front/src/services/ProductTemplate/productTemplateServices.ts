import { LanguageInterface } from "types/Language/languageTypes";
import { conn } from "../../api/BaseConnection";
import { IProductTemplate, ProductTemplateInterface } from "types/ProductTemplate/productTemplateTypes";
import { IListPageRequest, IListPageResponse } from "types/globalTypes";

const endpoint = conn.endpoints.productTemplate;

const add = (productTemplate: IProductTemplate | any) => {
    return conn.postJSON(endpoint, "json", productTemplate);
};

const edit = (productTemplate: any) => {
    return conn.putJSON(endpoint, "json", productTemplate)
};

const getById = (id: string): Promise<ProductTemplateInterface> => {
    return conn.getJSON(`${endpoint}/${id}`, "json");
}

const remove = (id: string) => {
    return conn.deleteJSON(`${endpoint}/${id}`);
};  

const getAll = (
    pageInfo: IListPageRequest,
  ): Promise<IListPageResponse<ProductTemplateInterface>> => {

    return conn.getJSON(`${endpoint}`, "json", { ...pageInfo });
};

const languageServices = {
    getAll,
    getById,
    add,
    edit,
    remove
}

export default languageServices;