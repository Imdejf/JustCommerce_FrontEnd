import { Dispatch } from "redux";

import authService from "../../services/authServices";
import { getCurrentUser } from "./currentUser";
import { getActiveLanguages } from "./activeLanguages";
import { getProfiles, getUserPermissions } from "./permissions";

import { ActionType, IAction } from "./actionTypes";
import { RootState } from "../store";
import { Values } from "../../components/auth/LoginForm";

import { getErrorsArray } from "../../utils/errorsUtils";

const signInSuccess = (): IAction => ({
  type: ActionType.SIGN_IN_SUCCESS,
});

const signInFailure = (): IAction => ({
  type: ActionType.SIGN_IN_FAILURE,
});

const signOutSuccess = (): IAction => ({
  type: ActionType.SIGN_OUT_SUCCESS,
});

const signOutFailure = (): IAction => ({
  type: ActionType.SIGN_OUT_FAILURE,
});

const destroySession = (): IAction => ({
  type: ActionType.DESTROY_SESSION,
});

const getInitData = () => async (dispatch: Dispatch<any>) => {
  await dispatch(getCurrentUser());
  await dispatch(getActiveLanguages());
  await dispatch(getUserPermissions());
  await dispatch(getProfiles());
};

export const signIn = (auth: Values) => (dispatch: Dispatch<any>) =>
  new Promise<string>(async (resolve, reject) => {
    try {
      const response = await authService.login(auth.Email, auth.Password);
      authService.setToken(response.Token);
      dispatch(signInSuccess());
      dispatch(getInitData());

      authService.keepSession();

      resolve("ok");
    } catch (error: any) {
      dispatch(signInFailure());
      console.error({ error });
      const errorsArray = getErrorsArray(error);
      reject(errorsArray);
    }
  });

export const signOut =
  () => (dispatch: Dispatch<any>, getState: () => RootState) =>
    new Promise<string>(async (resolve, reject) => {
      try {
        const { currentUser } = getState();
        if (currentUser) {
          await authService.logout(currentUser.userId);
          authService.revokeToken();

          dispatch(signOutSuccess());
          dispatch(destroySession());
          resolve("ok");
        }
      } catch (error: any) {
        dispatch(signOutFailure());
        console.error({ error });
        const errorsArray = getErrorsArray(error);
        reject(errorsArray);
      }
    });

export const authorize =
  () => (dispatch: Dispatch<any>, getState: () => RootState) => {
    const { isAuth } = getState().auth;
    const { token, milisecondsToExpire } = authService.getTokenInfoFromLocal();

    if (milisecondsToExpire > 0 && token) {
      if (!isAuth) {
        authService.setToken(token);
        authService.keepSession();
        dispatch(signInSuccess());
        dispatch(getInitData());
      }
    } else {
      dispatch(signInFailure());
    }
  };

export const remindPassword = (email: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await authService.remindPassword(email);
      resolve(res);
    } catch (error: any) {
      //TODO: remove cond after implement
      if (error.Errors.UnhandledException) {
        reject(["Ok until sender is not implemeted"]);
      }

      console.error({ error });
      const errorsArray = getErrorsArray(error);
      reject(errorsArray);
    }
  });
