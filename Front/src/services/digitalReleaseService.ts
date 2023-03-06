import { ArtistPropItem } from 'types/artistTypes';
import { DigitalReleaseRequest, IDigitalRelease } from 'types/digitalReleaseTypes';
import { IListPageRequest, IListPageResponse } from 'types/globalTypes';

import { conn } from '../api/BaseConnection';

const endpoint = conn.endpoints.digitalReleases;

const add = (digitalRelease: IDigitalRelease | any) => {
  return conn.postJSON(endpoint.base, 'json', digitalRelease);
};

const remove = (id: string) => {
  return conn.deleteJSON(`${endpoint.base}/${id}`);
};

const edit = (digitalRelease: Partial<DigitalReleaseRequest>) => {
  return conn.putJSON(endpoint.base, 'json', digitalRelease);
};

const getAll = (pageInfo: IListPageRequest): Promise<IListPageResponse<IDigitalRelease>> => {
  return conn.getJSON<IListPageResponse<IDigitalRelease>>(endpoint.base, 'json', pageInfo);
};

const get = (id: string): Promise<IDigitalRelease> => {
  return conn.getJSON(`${endpoint.base}/${id}`, 'json');
};

const getArtists = (): Promise<ArtistPropItem[]> => {
  //TODO: remove formatting from this endpoint after backend is fixed
  return conn.getJSON<{ items: ArtistPropItem[] }>(endpoint.artists, 'json').then((response) => response.items);
};

const digitalReleasesService = {
  add,
  edit,
  remove,
  getAll,
  get,
  getArtists,
};

export default digitalReleasesService;
