import { ICheckboxValue } from './globalTypes';

export interface IPermissionsActionTypes {
  Create: string;
  Edit: string;
  Update: string;
  View: string;
  Delete: string;
  CreateUser: string;
  EditUser: string;
  DeleteUser: string;
  ViewManagementList: string;
  ViewContactList: string;
  ChangeOwnPassword: string;
  ManagePermissions: string;
  ChangeRole: string;
  ChangePassword: string;
  SetUserActiveOrDeactive: string;
  RevokePermission: string;
  GrantPermission: string;
  ChangeStatus: string;
  Deactivate: string;
  Detail: string;
  DowngradeStatus: string;
  EditName: string;
  Merge: string;
  ViewList: string;
  EditLabel: string;
  EditFinancialData: string;
  CreateSubgroup: string;
  UpdateSubgroup: string;
  DeleteSubgroup: string;
  ListSubgroups: string;
  DetailSubgroup: string;
  ListGroups: string;
  CreatePresspack: string;
  UpdatePresspack: string;
  DeletePresspack: string;
  CreateStoredFile: string;
  DeleteStoredFile: string;
  EditEAN: string;
  EditPublished: string;
  Accept: string;
  Details: string;
}

export enum PermissionsDomains {
  ArtistServicePermissions = 'Artist',
  AuthServicePermissions = 'Auth',
  DigitalReleasePermissions = 'DigitalRelease',
  LicensorServicePermissions = 'Licensor',
  ProviderServicePermissions = 'Provider',
  SalesChannelServicePermissions = 'SalesChannel',
  TracksServicePermissions = 'Tracks',
}

export enum PermissionsDomainsShort {
  Artist = 'ArtistServicePermissions',
  Auth = 'AuthServicePermissions',
  DigitalRelease = 'DigitalReleasePermissions',
  Licensor = 'LicensorServicePermissions',
  Provider = 'ProviderServicePermissions',
  SalesChannel = 'SalesChannelServicePermissions',
  Tracks = 'TracksServicePermissions',
}

interface IPermission {
  checked: boolean;
  value: number;
}

export interface IAuthPermissions<T = IPermission> {
  CreateUser: T;
  EditUser: T;
  DeleteUser: T;
  ViewManagementList: T;
  ViewContactList: T;
  ChangeOwnPassword: T;
  ManagePermissions: T;
  ChangeRole: T;
  ChangePassword: T;
  SetUserActiveOrDeactive: T;
  RevokePermission: T;
  GrantPermission: T;
}

export interface IDigitalRelease<T = IPermission> {
  Create: T;
  Edit: T;
  Delete: T;
  ViewList: T;
  EditEAN: T;
  EditPublished: T;
  Accept: T;
  Details: T;
}

export interface IPermissions<T = IPermission> {
  Artist: IArtistPermissions<T>;
  Auth: IAuthPermissions<T>;
  DigitalRelease: IDigitalRelease<T>;
  Licensor: ILicensorPermissions<T>;
  Provider: IProviderPermissions<T>;
  SalesChannel: ISalesChannelPermissions<T>;
  Tracks: ITrackPermissions<T>;
}

export interface IPermissionDTO {
  permissionDomainName: keyof typeof PermissionsDomains;
  permissionFlagName: keyof IPermissionsActionTypes;
  permissionFlagValue?: number;
}

export interface IPermissionTransformDTO {
  [key: string]: {
    permissionDomainName: keyof typeof PermissionsDomains;
    permissionFlagName: keyof IPermissionsActionTypes;
    permissionFlagValue?: number;
    value: ICheckboxValue<number>;
  };
}

export interface IPermissionResponse {
  item1: IPermissionDTO;
  item2: boolean;
}

export interface IPermissionsResponse {
  userId: string;
  permissions: Array<IPermissionResponse>;
}

export interface IPermissionsChangeRequest {
  userId: string;
  permissionsToGrant: Array<IPermissionDTO>;
  permissionsToRevoke: Array<IPermissionDTO>;
}

export interface IPermissionProfile {
  flagName: string;
  flagValue: number;
}

export interface ITrackPermissions<T = IPermission> {
  Create: T;
  Edit: T;
  View: T;
  Delete: T;
}

export interface IArtistPermissions<T = IPermission> {
  Create: T;
  Edit: T;
  Delete: T;
  ViewList: T;
  EditName: T;
  ChangeStatus: T;
  Deactivate: T;
  Detail: T;
  Merge: T;
  DowngradeStatus: T;
  CreatePresspack: T;
  UpdatePresspack: T;
  DeletePresspack: T;
  CreateStoredFile: T;
  DeleteStoredFile: T;
}

export interface ILicensorPermissions<T = IPermission> {
  Create: T;
  Delete: T;
  Detail: T;
  Edit: T;
  EditFinancialData: T;
  EditLabel: T;
  EditName: T;
  ViewList: T;
}

export interface IProviderPermissions<T = IPermission> {
  Create: T;
  Update: T;
  Delete: T;
  View: T;
}

export interface ISalesChannelPermissions<T = IPermission> {
  CreateSubgroup: T;
  UpdateSubgroup: T;
  DeleteSubgroup: T;
  ListSubgroups: T;
  DetailSubgroup: T;
  Create: T;
  Update: T;
  Delete: T;
  ViewList: T;
  Detail: T;
  ListGroups: T;
}

export type PermissionChangeItemType = {
  domain: keyof IPermissions;
  action: keyof IPermissionsActionTypes;
  value: ICheckboxValue<number>;
};
