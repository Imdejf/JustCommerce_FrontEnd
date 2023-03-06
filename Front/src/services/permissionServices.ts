import { conn } from "../api/BaseConnection";
import {
  IPermissionsChangeRequest,
  IPermissionsResponse,
  IPermissionProfile,
} from "../types/permissionsTypes";

const endpoint = conn.endpoints.permission;

const assignToProfile = (userId: string, profile: number) => {
  return conn.postJSON(`${endpoint}/AssignToProfile`, "json", {
    userId,
    profile,
  });
};

const changePermissions = ({
  userId,
  permissionsToGrant,
  permissionsToRevoke,
}: IPermissionsChangeRequest) => {
  return conn.putJSON(endpoint, "json", {
    userId,
    permissionsToGrant,
    permissionsToRevoke,
  });
};

const getProfiles = (): Promise<Array<IPermissionProfile>> => {
  return conn.getJSON(conn.endpoints.profiles, "json");
};

const getUserPermissions = (userId: string): Promise<IPermissionsResponse> => {
  return conn.getJSON(`${endpoint}/GetPermissions/${userId}`, "json");
};

const permissionService = {
  assignToProfile,
  changePermissions,
  getProfiles,
  getUserPermissions,
};

export default permissionService;
