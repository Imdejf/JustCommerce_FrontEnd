import { conn } from '../api/BaseConnection';
import { ConditionTemplate, ICondition } from '../types/conditionTypes';

const endpoint = conn.endpoints.conditions;

const add = (condition: ICondition) => {
  return conn.postJSON(`${endpoint.base}`, 'json', condition);
};

const remove = (id: string) => {
  return conn.deleteJSON(`${endpoint.base}/${id}`);
};

const edit = ({ id, ...condition }: ICondition) => {
  return conn.putJSON(`${endpoint.base}`, 'json', { conditionPackId: id, ...condition });
};

const getAll = (): Promise<Array<ICondition>> => {
  return conn.getJSON<Array<ICondition>>(endpoint.templates, 'json');
};

const get = (id: string): Promise<ConditionTemplate> => {
  return conn.getJSON(`${endpoint.base}/${id}`, 'json');
};

const getNewTemplate = (): Promise<ConditionTemplate> => {
  return conn.getJSON(`${endpoint.templates}/New`, 'json');
};

const getForLicensor = (licensorId: string): Promise<Array<ConditionTemplate>> => {
  return conn.getJSON(`${endpoint.licensor}/${licensorId}`, 'json');
};

const conditionsService = {
  add,
  remove,
  edit,
  getAll,
  get,
  getNewTemplate,
  getForLicensor,
};

export default conditionsService;
