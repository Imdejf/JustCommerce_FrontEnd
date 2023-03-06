import { ArtistPropItem } from "types/artistTypes";
import {
  DigitalReleaseRequest,
  IDigitalRelease,
  IAddProduct,
} from "types/digitalReleaseTypes";
import { IListPageRequest, IListPageResponse } from "types/globalTypes";
import {
  AcademyInterface,
  PlayerProfileDetailInterface,
  PlayerProfileInterface,
} from "../types/userTypes";
import { conn } from "../api/BaseConnection";

const endpoint = conn.endpoints.academy;

const add = (digitalRelease: IDigitalRelease | any) => {
  return conn.postJSON(endpoint, "json", digitalRelease);
};

const remove = (id: string) => {
  return conn.deleteJSON(`${endpoint}/${id}`);
};

const edit = (digitalRelease: Partial<DigitalReleaseRequest>) => {
  return conn.putJSON(endpoint, "json", digitalRelease);
};

const getAll = (
  pageInfo: IListPageRequest,
): Promise<IListPageResponse<IDigitalRelease>> => {
  return conn.getJSON<IListPageResponse<IDigitalRelease>>(
    endpoint,
    "json",
    pageInfo,
  );
};

const getAllAcademies = (
  pageInfo: IListPageRequest,
): Promise<IListPageResponse<any>> => {
  return conn.getJSON(`${endpoint}`, "json", { ...pageInfo });
};

const getSingleAcademy = (id: string): Promise<AcademyInterface> => {
  return conn.getJSON(`${endpoint}/${id}`, "json");
};

const addAcademy = (playerProfile: any, type: number, country: number) => {
  return conn.postJSON(`${endpoint}`, "json", {
    ...playerProfile,
    Type: type,
    Country: country,
  });
};

const removeAcademy = (id: string) => {
  return conn.deleteJSON(`${endpoint}/${id}`);
};

const FirePlayer = (PlayerId: string, AcademyId: string) => {
  const body = {
    PlayerId,
    AcademyId,
  };
  return conn.deleteJSON(`${endpoint}/FirePlayer`, "json", body);
};

const editAcademy = (playerProfile: any) => {
  return conn.putJSON(endpoint, "json", playerProfile);
};

const hirePlayer = (
  PlayerId: string,
  AcademyId: string,
  AccessType: number,
) => {
  const body = {
    PlayerId,
    AcademyId,
    AccessType,
  };
  return conn.postJSON(`${endpoint}/HirePlayer`, "json", body);
};

const updateRelation = (
  PlayerId: string,
  AcademyId: string,
  AccessType: number,
) => {
  const body = {
    PlayerId,
    AcademyId,
    AccessType,
  };
  return conn.putJSON(`${endpoint}/UpdateRelation`, "json", body);
};

const academiesServices = {
  add,
  edit,
  remove,
  getAll,
  getAllAcademies,
  getSingleAcademy,
  addAcademy,
  removeAcademy,
  editAcademy,
  hirePlayer,
  updateRelation,
  FirePlayer,
};

export default academiesServices;
