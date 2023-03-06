import { Dispatch } from 'redux';

import currentUserService from '../../services/currentUserServices';

import { IChangePasswordValues, IUser } from '../../types/userTypes';
import { RootState } from '../store';
import { ActionType, IAction } from './actionTypes';

import { getErrorsArray } from '../../utils/errorsUtils';

const getCurrentUserSuccess = (user: IUser): IAction<IUser> => ({
  type: ActionType.GET_CUR_USER_SUCCESS,
  payload: user,
});

const getCurrentUserFailure = (): IAction => ({
  type: ActionType.GET_CUR_USER_FAILURE,
});

export const getCurrentUser = () => (dispatch: Dispatch) =>
  new Promise<IUser>(async (resolve, reject) => {
    try {
      const user = await currentUserService.getCurrentUser();
      dispatch(getCurrentUserSuccess(user));

      resolve(user);
    } catch (error: any) {
      dispatch(getCurrentUserFailure());
      console.error({ error });
      const errorsArray = getErrorsArray(error);
      reject(errorsArray);
    }
  });

export const changePassword = (passwords: IChangePasswordValues) => (dispatch: Dispatch, getState: () => RootState) =>
  new Promise<IUser>(async (resolve, reject) => {
    try {
      const { currentUser } = getState();
      if (currentUser) {
        const res = await currentUserService.changePassword(currentUser.userId, passwords);
        resolve(res);
      } else {
        reject(['User not found']);
      }
    } catch (error: any) {
      console.error({ error });
      const errorsArray = getErrorsArray(error);
      reject(errorsArray);
    }
  });
