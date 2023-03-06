import { conn } from "../../api/BaseConnection";
import { IListPageRequest, IListPageResponse } from "../../types/globalTypes";
import {IAttribute, AttributeInterface} from "../../types/Attribute/attributeTypes"

const endpoint = conn.endpoints.attribute;

const add = (attribute: IAttribute | any) => {
    console.log(attribute)
    return conn.postJSON(endpoint, "json", attribute);
  };
  
const edit = (attribute: any) => {
  return conn.putJSON(endpoint, "json", attribute)
}

const getAll = (
  pageInfo: IListPageRequest,
): Promise<IListPageResponse<AttributeInterface>> => {

  return conn.getJSON(`${endpoint}`, "json", { ...pageInfo });
};

const getById = (id: string): Promise<AttributeInterface> => {
  return conn.getJSON(`${endpoint}/${id}`, "json");
}

const remove = (id: string) => {
  return conn.deleteJSON(`${endpoint}/${id}`);
};

const attributeServices = {
    getAll,
    add,
    getById,
    edit,
    remove
}

export default attributeServices;