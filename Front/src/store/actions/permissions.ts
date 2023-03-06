import { Dispatch } from "redux";

import permissionService from "../../services/permissionServices";
import {
  getChangedPermissionsRequestObject,
  changedPermissionsToState,
  permissoinsFromDTO,
} from "../../utils/permissionsUtils";

import { RootState } from "../store";
import { ActionType, IAction } from "./actionTypes";

import { getErrorsArray } from "../../utils/errorsUtils";
import {
  IPermissionProfile,
  IPermissions,
  IPermissionTransformDTO,
} from "../../types/permissionsTypes";
import authService from "../../services/authServices";

const getPermissionsSuccess = (permissions: any): IAction => ({
  type: ActionType.GET_PERMISSIONS_SUCCESS,
  payload: permissions,
});

const getPermissionsFailure = (): IAction => ({
  type: ActionType.GET_PERMISSIONS_FAILURE,
});

export const getUserPermissions =
  () => (dispatch: Dispatch, getState: () => RootState) =>
    new Promise<any>(async (resolve, reject) => {
      try {
        const { currentUser } = getState();

        if (currentUser) {
          const response = await permissionService.getUserPermissions(currentUser.userId);
          const permissions = permissoinsFromDTO(response.permissions);
          dispatch(getPermissionsSuccess(permissions));
          resolve(response);
        }
      } catch (error: any) {
        // dispatch(getPermissionsFailure());
        // console.error({ error });
        // const errorsArray = getErrorsArray(error);
        // reject(errorsArray);
      }
    });

const changePermissionsSuccess = (
  permissions: IPermissions,
): IAction<IPermissions> => ({
  type: ActionType.CHANGE_PERMISSIONS_SUCCESS,
  payload: permissions,
});

export const changePermissions =
  (permissions: IPermissionTransformDTO, userId: string) =>
  (dispatch: Dispatch, getState: () => RootState) =>
    new Promise(async (resolve, reject) => {
      try {
        const { currentUser, userPermissions } = getState();

        const data = getChangedPermissionsRequestObject(permissions);
        await permissionService.changePermissions({ userId, ...data });
        await authService.refreshToken();

        if (currentUser && userPermissions && userId === currentUser.userId) {
          const newPermissions = changedPermissionsToState(
            userPermissions,
            permissions,
          );
          dispatch(changePermissionsSuccess(newPermissions));
        }

        resolve("ok");
      } catch (error: any) {
        reject(error);
      }
    });

const getProfilesSuccess = (profiles: Array<IPermissionProfile>) => ({
  type: ActionType.GET_PROFILES_SUCCESS,
  payload: profiles,
});

const getProfilesFailure = () => ({
  type: ActionType.GET_PROFILES_FAILURE,
});

export const getProfiles = () => (dispatch: Dispatch) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const response = await permissionService.getProfiles();
      dispatch(getProfilesSuccess(response));
      resolve(response);
    } catch (error: any) {
      dispatch(getProfilesFailure());
      console.error({ error });
      const errorsArray = getErrorsArray(error);
      reject(errorsArray);
    }
  });
