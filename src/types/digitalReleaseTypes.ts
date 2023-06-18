import { ArtistPropItem } from "./artistTypes";

export type IDigitalRelease = {
  id: string;
  title: string;
  vesion: string;
  ean: string;
  pLine: string;
  cLine: string;
  collectiveManager: string;
  releaseDate: string;
  plates: Plate[];
  artists: ArtistPropItem[];
  labels: DigitalReleaseLabel[];
  type: ProductType;
  genre: string;
  coverFile: string;
  status: MusicProductStatus;
  processingFlag: boolean;
};

export interface CombinationValue {
  AttributeId: string;
  AttributeName: string;
  Value: string;
  ValueId: string;
}

export interface Combination {
  Amount: number;
  CombinationId: string;
  EAN: string;
  Gross: number;
  Netto: number;
  Tax: number;
  Values: CombinationValue[];
}

export interface File {
  File: {
    Base64String: string;
  };
  Position: number;
}

export interface IAddProduct {
  Name: string;
  Description: string;
  SellerId: string;
  ShortDescription: string;
  EAN: string;
  Tag: string;
  Netto: string | number | null;
  Tax: number;
  Status: number;
  AvailableFrom: string;
  AvailableTo: string;
  CategoryId: string;
  File: {
    Base64String: string;
  };
}

interface ProductImage {
  FtpPhotoFilePath: string;
  ProductFileId: string;
  Position: number;
}

export interface Delivery {
  DeliveryId: string;
  Name: string;
  Description: string;
  Deadline: number;
  Gross: number;
  Tax: number;
  AreaOfActivity: number;
  OnPrice: number;
  Netto: number;
  IsActivate: boolean;
}

export interface AttributeValue {
  Name: string;
  Position: number;
  ValueId: string;
}

export interface Attribute {
  AttributeId: string;
  Name: string;
  Position: number;
  Values: AttributeValue[];
}

interface ProductDocument {
  FtpFilePath: string;
  Id: string;
  Name: string;
}

export interface Product {
  AvailableFrom: string;
  AvailableTo: string;
  CategoryId: string;
  Description: string;
  EAN: string;
  Name: string;
  ProductId: string;
  Status: number;
  Tag: string;
  Type: number;
  Combinations: Combination[];
  CategoryName: string;
  Gross: number;
  Tax: number;
  Netto: number;
  ProductFiles: ProductImage[];
  Deliveries: Delivery[];
  FtpBannerPhotoFilePath: string;
  ShortDescription: string;
  Documents: ProductDocument[];
  TotalAmount: number;
}

export type DigitalReleaseRequest = Omit<IDigitalRelease, "id"> & {
  //TODO: Do implement it
  id: string;
};

//TODO: Do implement it
export type DigitalReleaseListItem = Pick<IDigitalRelease, "id">;

export type Plate = {
  id: string;
};

type DigitalReleaseLabel = {
  labelId: string;
  conditionId: string;
  trackId: string;
  isActive: boolean;
  participaction: number;
  dateFrom: string;
  dateTo: string;
};

export enum ProductType {
  "Produkt" = 1,
  "Licencja" = 3,
  "Usługa" = 2,
}

export enum VatType {
  "zwolniony" = 0,
  "8%" = 8,
  "23%" = 23,
}

export enum MusicProductStatus {
  project,
  readyToPublish,
  processing,
  published,
  inProcessWithdrawn,
  withdrawn,
}
