import { conn } from '../api/BaseConnection';
import { IListPageRequest, IListPageResponse } from '../types/globalTypes';
import {
  ISalesChannel,
  ISalesChannelGroup,
  ISalesChannelProvider,
  ISalesChannelRequest,
  ISalesChannelSubGroup,
} from '../types/salesChannelTypes';

const endpoints = conn.endpoints.salesChannel;

const add = (salesChannel: Partial<ISalesChannelRequest>) => {
  return conn.postJSON(`${endpoints.salesChannel}`, 'json', salesChannel);
};

const remove = (id: string) => {
  return conn.deleteJSON(`${endpoints.salesChannel}/${id}`);
};

const edit = (salesChannel: Partial<ISalesChannelRequest & { salesChannelId: string }>) => {
  return conn.putJSON(`${endpoints.salesChannel}`, 'json', salesChannel);
};

const getAll = (pageInfo: IListPageRequest): Promise<IListPageResponse<ISalesChannel>> => {
  return conn.getJSON(endpoints.salesChannel, 'json', pageInfo);
};

const get = (id: string): Promise<ISalesChannel> => {
  return conn.getJSON(`${endpoints.salesChannel}/${id}`, 'json');
};

const getGroups = (): Promise<Array<ISalesChannelGroup>> => {
  return conn.getJSON(endpoints.groups, 'json');
};

const addSubGroup = (group: number, name: string): Promise<ISalesChannelSubGroup> => {
  return conn.postJSON(endpoints.subGroups, 'json', { name, group, isFromParentSource: false });
};

const getSubGroups = (groupId: number): Promise<Array<ISalesChannelSubGroup>> => {
  return conn.getJSON(`${endpoints.subGroups}/InGroup/${groupId}`, 'json');
};

const getProviders = (): Promise<Array<ISalesChannelProvider>> => {
  return conn.getJSON(endpoints.providers, 'json');
};

const salesChannelsService = {
  add,
  remove,
  edit,
  get,
  getAll,
  getGroups,
  addSubGroup,
  getSubGroups,
  getProviders,
};

export default salesChannelsService;
