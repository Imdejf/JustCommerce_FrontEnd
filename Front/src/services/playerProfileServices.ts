import { ArtistPropItem } from "types/artistTypes";
import {
  DigitalReleaseRequest,
  IDigitalRelease,
  IAddProduct,
} from "types/digitalReleaseTypes";
import { IListPageRequest, IListPageResponse } from "types/globalTypes";
import {
  Countries,
  PlayerCard,
  PlayerProfileDetailInterface,
  PlayerProfileInterface,
} from "../types/userTypes";
import { conn } from "../api/BaseConnection";

const endpoint = conn.endpoints.playerProfile;

const add = (digitalRelease: IDigitalRelease | any) => {
  return conn.postJSON(endpoint, "json", digitalRelease);
};

const remove = (id: string) => {
  return conn.deleteJSON(`${endpoint}/${id}`);
};

const removeSubscription = (SubscriptionId: string) => {
  return conn.deleteJSON(`${endpoint}/Subscription/${SubscriptionId}`);
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

const getAllPlayerProfiles = (
  pageInfo: IListPageRequest,
): Promise<IListPageResponse<any>> => {
  return conn.getJSON(`${endpoint}`, "json", { ...pageInfo });
};

const getAllCountries = (): Promise<Countries> => {
  return conn.getJSON(`${endpoint}/Countries`, "json");
};

const getSinglePlayerProfile = (
  id: string,
): Promise<PlayerProfileDetailInterface> => {
  return conn.getJSON(`${endpoint}/${id}`, "json");
};

const addPlayerProfile = (
  playerProfile: any,
  date: any,
  gender: any,
  userId: any,
  country: any,
  target: any,
  dominantLeg: any,
  prefferedPosition: any,
) => {
  return conn.postJSON(`${endpoint}`, "json", {
    ...playerProfile,
    Birthdate: date,
    Gender: gender,
    UserId: userId,
    Country: country,
    Card: {
      TargetId: target,
      DominantLeg: dominantLeg,
      PreferredPosition: prefferedPosition,
      DisciplineId: "03641162-2934-11ed-bb1c-0242ac1b0002",
      FifaId: playerProfile.FifaId,
      Characteristics: playerProfile.Characteristics,
      PlayerId: playerProfile.PlayerId,
    },
  });
};

const addNewSubscription = (ProfileId: string, From: string, To: string) => {
  const body = {
    ProfileId,
    From,
    To,
  };

  return conn.postJSON(`${endpoint}/Subscription`, "json", body);
};

const getPlayerCard = (profileId: string): Promise<PlayerCard> => {
  return conn.getJSON(
    `${endpoint}/GetPlayerCardByProfileId/${profileId}`,
    "json",
  );
};
const getMedicalCard = (
  ProfileId: string,
  dateFrom: string,
  dateTo: string,
): Promise<PlayerCard> => {
  const body = {
    ProfileId: ProfileId,
    From: dateFrom,
    To: dateTo,
  };
  return conn.getJSON(`${endpoint}/MedicalCard`, "json", body);
};

const removePlayerProfile = (id: string) => {
  return conn.deleteJSON(`${endpoint}/${id}`);
};

const editPlayerProfile = (playerProfile: any) => {
  return conn.putJSON(endpoint, "json", playerProfile);
};

const editPlayerProfileHistory = (playerHistory: any) => {
  return conn.putJSON(`${endpoint}/History`, "json", playerHistory);
};

const addPlayerProfileHistory = (playerHistory: any) => {
  return conn.postJSON(`${endpoint}/History`, "json", playerHistory);
};

const activatePlayerProfile = (ProfileId: string) => {
  return conn.putJSON(`${endpoint}/Activate`, "json", { ProfileId });
};

const deactivatePlayerProfile = (ProfileId: string) => {
  return conn.putJSON(`${endpoint}/Deactivate`, "json", { ProfileId });
};

const playerProfileServices = {
  add,
  edit,
  remove,
  getAll,
  getAllPlayerProfiles,
  getSinglePlayerProfile,
  addPlayerProfile,
  getPlayerCard,
  removePlayerProfile,
  editPlayerProfile,
  activatePlayerProfile,
  deactivatePlayerProfile,
  editPlayerProfileHistory,
  addPlayerProfileHistory,
  getAllCountries,
  getMedicalCard,
  addNewSubscription,
  removeSubscription,
};

export default playerProfileServices;
