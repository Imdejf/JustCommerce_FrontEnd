import { ArtistPropItem } from "types/artistTypes";
import {
  DigitalReleaseRequest,
  IDigitalRelease,
  IAddProduct,
} from "types/digitalReleaseTypes";
import { IListPageRequest, IListPageResponse } from "types/globalTypes";
import {
  Countries,
  OrderInterface,
  PlayerCard,
  PlayerProfileDetailInterface,
  PlayerProfileInterface,
} from "../types/userTypes";
import { conn } from "../api/BaseConnection";
import { string } from "yup";

const endpoint = conn.endpoints.order;

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

const getAllOrders = (
  pageInfo: IListPageRequest,
): Promise<IListPageResponse<any>> => {
  return conn.getJSON(`${endpoint}`, "json", { ...pageInfo });
};

const getAllCountries = (): Promise<Countries> => {
  return conn.getJSON(`${endpoint}/Countries`, "json");
};

const getAllAvailableDocument = (orderId: string) => {
  return conn.getJSON(`${endpoint}/AvailableDocument/${orderId}`, "json");
};

const getSingleOrder = (id: string): Promise<OrderInterface> => {
  return conn.getJSON(`${endpoint}/${id}`, "json");
};

const addPlayerProfile = (
  playerProfile: any,
  date: any,
  gender: any,
  userId: any,
  country: any,
) => {
  return conn.postJSON(`${endpoint}`, "json", {
    ...playerProfile,
    Birthdate: date,
    Gender: gender,
    UserId: userId,
    Country: country,
  });
};

const addDocument = (OrderId: string, DocumentId: string, Name: string) => {
  return conn.postJSON(`${endpoint}/Document`, "json", {
    OrderId,
    DocumentId,
    Name,
  });
};

const addAllDocuments = (OrderId: string) => {
  return conn.putJSON(`${endpoint}/Document`, "json", {
    OrderId,
  });
};

const getPlayerCard = (profileId: string): Promise<PlayerCard> => {
  return conn.getJSON(
    `${endpoint}/GetPlayerCardByProfileId/${profileId}`,
    "json",
  );
};

const removePlayerProfile = (id: string) => {
  return conn.deleteJSON(`${endpoint}/${id}`);
};

const editPlayerProfile = (playerProfile: any) => {
  return conn.putJSON(endpoint, "json", playerProfile);
};

const editTrackingNumber = (
  OrderId: string,
  TrackingNumer: string,
  Link: string,
) => {
  const body = {
    OrderId,
    TrackingNumer: {
      TrackingNumer,
      Link,
    },
  };

  return conn.putJSON(`${endpoint}/TrakicngNumber`, "json", body);
};

const editDeliveryState = (OrderId: string, OrderState: number) => {
  const body = {
    OrderId,
    OrderState,
    Description: "string",
  };

  return conn.putJSON(`${endpoint}/DeliveryState`, "json", body);
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

const editStatusRefund = (RefundId:string,Status:number)=>{
  const body = {
    RefundId,
    Status
  }
  return conn.putJSON(`${endpoint}/Refund`, "json", body);
}

const acceptRefundMoneyTransfer = (RefundId:string) => {
  return conn.postJSON(`${endpoint}/Refund/Accept`, "json",{RefundId} );
};
const declineRefundMoneyTransfer = (RefundId:string) => {
  return conn.postJSON(`${endpoint}/Refund/Decline`, "json", {RefundId});
};

const orderServices = {
  add,
  edit,
  remove,
  getAll,
  getAllOrders,
  getSingleOrder,
  addPlayerProfile,
  getPlayerCard,
  removePlayerProfile,
  editPlayerProfile,
  activatePlayerProfile,
  deactivatePlayerProfile,
  editPlayerProfileHistory,
  addPlayerProfileHistory,
  getAllCountries,
  editTrackingNumber,
  editDeliveryState,
  getAllAvailableDocument,
  addDocument,
  addAllDocuments,
  editStatusRefund,
  acceptRefundMoneyTransfer,
  declineRefundMoneyTransfer
};

export default orderServices;
