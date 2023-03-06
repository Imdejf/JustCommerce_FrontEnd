import { ArtistPropItem } from 'types/artistTypes';
import { conn } from '../api/BaseConnection';
import { ITrack } from '../components/tracks/utils/trackTypes';
import { IListPageRequest, IListPageResponse } from '../types/globalTypes';

const endpoint = conn.endpoints.tracks;

const add = (track: ITrack | any) => {
  return conn.postJSON(`${endpoint.base}`, 'json', track);
};

const remove = (id: string) => {
  return conn.deleteJSON(`${endpoint.base}/${id}`);
};

const edit = (track: Partial<ITrack> & { trackId: string }) => {
  return conn.putJSON(`${endpoint.base}`, 'json', track);
};

const getAll = (pageInfo: IListPageRequest): Promise<IListPageResponse<ITrack>> => {
  return conn.getJSON<IListPageResponse<ITrack>>(endpoint.base, 'json', pageInfo);
};

const get = (id: string): Promise<ITrack> => {
  return conn.getJSON(`${endpoint.base}/${id}`, 'json');
};

const getArtists = (): Promise<ArtistPropItem[]> => {
  //TODO: remove formatting from this endpoint after backend is fixed
  return conn.getJSON<{ items: ArtistPropItem[] }>(endpoint.artists, 'json').then((response) => response.items);
};

const tracksService = {
  add,
  remove,
  edit,
  getAll,
  get,
  getArtists,
};

export default tracksService;
