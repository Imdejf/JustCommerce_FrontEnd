import { Country } from "../utils/constants/countires";

export interface IListPageRequest {
  pageNumber: number;
  pageSize?: number;
  searchString?: string;
  storeId?: string;
}

export interface IListPageMeta extends IListPageRequest {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IListPageResponse<T> extends IListPageMeta {
  items: Array<T>;
}

export interface IRequestSucces<T = any> {
  data: T;
}

export interface ICheckboxValue<T = any> {
  checked: boolean;
  value: T;
}

export interface IFileFormat {
  pdf: Array<string>;
  image: Array<string>;
}

export interface ImageFile {
  base64: string;
  file: File;
  path: string;
  sizes: {
    height: number;
    width: number;
    ratio: number;
  };
}

export enum DataViewMode {
  table,
  tiles,
}

export enum DataViewType {
  artists = "artists",
  contacts = "contacts",
  digitalRelease = "digitalRelease",
  licensors = "licensors",
  providers = "providers",
  tracks = "tracks",
  usersManagment = "usersManagment",
}

export interface IAddress {
  postCode: string;
  street: string;
  city: string;
  country: Country;
}

export const AddressLabels: Record<keyof IAddress, string> = {
  postCode: "Kod pocztowy",
  street: "Ulica",
  city: "Miasto",
  country: "Kraj",
};

export interface IFile {
  file: File;
  base64String: string;
  path: string;
}

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type SortState = {
  key: string;
  direction: SortDirection;
};
