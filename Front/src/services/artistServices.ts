import { conn } from "../api/BaseConnection";
import {
  ArtistNewStoredFile,
  ArtistStoredFile,
  IArtist,
  IArtistDTO,
  IArtistResponse,
  IPresspack,
  ArtistInterface,
} from "../types/artistTypes";
import { IListPageRequest, IListPageResponse } from "../types/globalTypes";

const endpoint = conn.endpoints.applicationUser;

const add = (artist: IArtist | any) => {
  return conn.postJSON(`${endpoint}`, "json", artist);
};

const remove = (id: string) => {
  return conn.deleteJSON(`${endpoint}/${id}`);
};

const edit = (artist: IArtist | any) => {
  return conn.putJSON(`${endpoint}`, "json", artist);
};

const getAll = (
  pageInfo: IListPageRequest,
): Promise<IListPageResponse<ArtistInterface>> => {
  return conn.getJSON(`${endpoint}`, "json", { ...pageInfo });
};

const activateArtist = (Id: string): Promise<ArtistInterface> => {
  return conn.putJSON(`${endpoint}/Activate/${Id}`, "json");
};

const deactivateArtist = (Id: string): Promise<ArtistInterface> => {
  return conn.putJSON(`${endpoint}/Deactivate/${Id}`, "json");
};

const get = (id: string): Promise<ArtistInterface> => {
  return conn.getJSON(`${endpoint}/${id}`, "json");
};

const addPressPack = (pressPack: any): Promise<any> => {
  return conn.postJSON(`${endpoint}`, "json", pressPack);
};

const editPressPack = (pressPack: any): Promise<any> => {
  return conn.putJSON(`${endpoint}`, "json", pressPack);
};

const getPressPack = (artistId: string): Promise<IPresspack> => {
  return conn.getJSON(`${endpoint}/ByArtistId/${artistId}`, "json");
};

const addStoredFiles = (
  file: ArtistNewStoredFile,
): Promise<ArtistStoredFile> => {
  return conn.postJSON(`${endpoint}`, "json", file);
};

const removeStoredFiles = (id: string): Promise<any> => {
  return conn.deleteJSON(`${endpoint}/${id}`, "json");
};

const getStoredFiles = (artistId: string): Promise<ArtistStoredFile[]> => {
  return conn.getJSON(`${endpoint}/ByArtistId/${artistId}`, "json");
};

// const getAllOrders = (UserId: string) => {
//   const body = {
//     PageSize: "100",
//     PageNumber: "1",
//     UserId,
//   };
//   return conn.getJSON(`${endpoint}/Order`, "json", body);
// };

const getAllOrders = (
  pageInfo: IListPageRequest,
): Promise<IListPageResponse<ArtistInterface>> => {
  return conn.getJSON(`${endpoint}/Order`, "json", {
    ...pageInfo,
  });
};

const artistsService = {
  add,
  remove,
  edit,
  getAll,
  get,
  addPressPack,
  editPressPack,
  getPressPack,
  addStoredFiles,
  removeStoredFiles,
  getStoredFiles,
  activateArtist,
  deactivateArtist,
  getAllOrders,
};

export default artistsService;
