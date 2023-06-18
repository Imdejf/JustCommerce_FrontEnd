import { conn } from '../api/BaseConnection';
import { IAddress, IListPageRequest, IListPageResponse } from '../types/globalTypes';
import { ILicensor, IPatron } from '../types/licensorTypes';

const endpoint = conn.endpoints.licensors;

const add = (licensor: ILicensor | any) => {
  return conn.postJSON(`${endpoint}`, 'json', licensor);
};

const remove = (id: string) => {
  return conn.deleteJSON(`${endpoint}/${id}`);
};

const edit = (licensor: ILicensor | any) => {
  return conn.putJSON(`${endpoint}`, 'json', licensor);
};

const getAll = (pageInfo: IListPageRequest): Promise<IListPageResponse<ILicensor>> => {
  return conn.getJSON(endpoint, 'json', pageInfo);
};

interface TEMP_LIC_RES extends Omit<ILicensor, 'address'> {
  adress: IAddress;
}

const get = (id: string): Promise<ILicensor> => {
  // return conn.getJSON(`${endpoint}/${id}`, 'json');

  //TODO: remove after BE fix
  return new Promise((resolve, reject) => {
    conn.getJSON(`${endpoint}/${id}`, 'json').then((resp: any) => {
      const { adress, ...restOfData }: TEMP_LIC_RES = resp;
      resolve({ address: adress, ...restOfData });
    });
  });
};

const getPartons = (): Promise<Array<IPatron>> => {
  return conn.getJSON(`${endpoint}/Patrons`, 'json');
};

const licensorsService = {
  add,
  remove,
  edit,
  get,
  getAll,
  getPartons,
};

export default licensorsService;
