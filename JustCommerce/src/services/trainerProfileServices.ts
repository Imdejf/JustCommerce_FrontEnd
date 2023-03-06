import { ArtistPropItem } from "types/artistTypes";
import {
  DigitalReleaseRequest,
  IDigitalRelease,
  IAddProduct,
} from "types/digitalReleaseTypes";
import { IListPageRequest, IListPageResponse } from "types/globalTypes";
import {
  PlayerProfileDetailInterface,
  PlayerProfileInterface,
  TrainerProfileDetailInterface,
} from "../types/userTypes";
import { conn } from "../api/BaseConnection";

const endpoint = conn.endpoints.trainerProfile;

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

const getAllTrainerProfiles = (
  pageInfo: IListPageRequest,
): Promise<IListPageResponse<any>> => {
  return conn.getJSON(`${endpoint}`, "json", { ...pageInfo });
};

const getSingleTrainerProfile = (
  id: string,
): Promise<TrainerProfileDetailInterface> => {
  return conn.getJSON(`${endpoint}/${id}`, "json");
};

const addTrainerProfile = (playerProfile: any, userId: any, country: any) => {
  return conn.postJSON(`${endpoint}`, "json", {
    ...playerProfile,
    UserId: userId,
    Country: +country,
    AcceptedPrivatePolicyAndRegulation: true,
    InformationClausule: true,
    LaunchTask: true,
    MarketingDataProcessing: true,
    MarketingDataRecieving: true,
    DisciplineId: "03641162-2934-11ed-bb1c-0242ac1b0002",
  });
};

const addFollowing = (
  PlayerId: string,
  TrainerId: string,
  AccessType: number,
) => {
  const body = {
    PlayerId,
    TrainerId,
    AccessType,
  };
  return conn.postJSON(`${endpoint}/Following`, "json", body);
};

const getTrainerCard = (profileId: string) => {
  return conn.getJSON(
    `${endpoint}/GetPlayerCardByProfileId/${profileId}`,
    "json",
  );
};

const removeTrainerProfile = (id: string) => {
  return conn.deleteJSON(`${endpoint}/${id}`);
};

const removeFollowing = (id: string) => {
  return conn.deleteJSON(`${endpoint}/Following/${id}`);
};

const editTrainerProfile = (playerProfile: any) => {
  return conn.putJSON(endpoint, "json", playerProfile);
};

const editFollowing = (FollowingId: string, AccessType: number) => {
  const body = {
    FollowingId,
    AccessType,
  };
  return conn.putJSON(`${endpoint}/Following`, "json", body);
};

const trainerProfileServices = {
  add,
  edit,
  remove,
  getAll,
  getAllTrainerProfiles,
  getSingleTrainerProfile,
  addTrainerProfile,
  getTrainerCard,
  removeTrainerProfile,
  editTrainerProfile,
  addFollowing,
  editFollowing,
  removeFollowing,
};

export default trainerProfileServices;
