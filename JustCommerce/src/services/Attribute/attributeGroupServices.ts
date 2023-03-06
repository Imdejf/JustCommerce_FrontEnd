import { conn } from "../../api/BaseConnection";
import { IListPageRequest, IListPageResponse } from "../../types/globalTypes";
import {IAttributeGroup, AttributeGroupInterface} from "../../types/Attribute/attributeGroupTypes"

const endpoint = conn.endpoints.attributeGroup;

const add = (attributeGroup: IAttributeGroup | any) => {
  return conn.postJSON(endpoint, "json", attributeGroup);
};

const edit = (attributeGroup: any) => {
  return conn.putJSON(endpoint, "json", attributeGroup)
}

const getAll = (
    pageInfo: IListPageRequest,
  ): Promise<IListPageResponse<AttributeGroupInterface>> => {

    return conn.getJSON(`${endpoint}`, "json", { ...pageInfo });
};

const getDropDown = (storeId: string, searchQuery: string ) => {
  return conn.getJSON(`${endpoint}`, "json", {storeId, searchQuery, pageNumber: 1, pageSize: 50})
}

const getById = (id: string): Promise<AttributeGroupInterface> => {
  return conn.getJSON(`${endpoint}/${id}`, "json");
}

const remove = (id: string) => {
  return conn.deleteJSON(`${endpoint}/${id}`);
};

const attributeGroupServices = {
    getAll,
    getDropDown,
    add,
    getById,
    edit,
    remove
}

export default attributeGroupServices;
