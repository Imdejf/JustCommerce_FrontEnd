import { conn } from '../api/BaseConnection';
import { IProvider } from '../types/providerTypes';
import { IListPageRequest, IListPageResponse } from '../types/globalTypes';

const endpoint = conn.endpoints.providers;

const add = (provider: IProvider | any) => {
  return conn.postJSON(`${endpoint}`, 'json', provider);
};

const remove = (id: string) => {
  return conn.deleteJSON(`${endpoint}/${id}`);
};

const edit = (provider: Partial<IProvider> & { providerId: string }) => {
  return conn.putJSON(`${endpoint}`, 'json', provider);
};

const getAll = (pageInfo: IListPageRequest): Promise<IListPageResponse<IProvider>> => {
  return conn.getJSON<IListPageResponse<IProvider>>(endpoint, 'json', pageInfo);
};

const get = (id: string): Promise<IProvider> => {
  return conn.getJSON(`${endpoint}/${id}`, 'json');
};

const providersService = {
  add,
  remove,
  edit,
  getAll,
  get,
};

export default providersService;
