import { Dispatch } from 'redux';

import languagesService from '../../services/Language/languageServices';
import currentUserService from '../../services/currentUserServices';

import { RootState } from '../store';
import { ActionType, IAction } from './actionTypes';

import { getErrorsArray } from '../../utils/errorsUtils';
import { ILanguageResponse } from 'types/Language/languageTypes';

const getActiveLanguagesSuccess = (language: any): IAction => ({
  type: ActionType.GET_LANGUAGES_SUCCESS,
  payload: language,
});

const getActiveLanguagesFailure = (): IAction => ({
  type: ActionType.GET_LANGUAGES_FAILURE,
});


  export const getActiveLanguages =
  () => (dispatch: Dispatch, getState: () => RootState) =>
    new Promise<any>(async (resolve, reject) => {
      try {
        const { currentUser } = getState();
        if (currentUser) {
            const user = await currentUserService.getCurrentUser();
            const languages = await languagesService.getAll(user.storeId);
            const languageResponse: ILanguageResponse = {
                storeId: user.storeId,
                languages: languages,
            };

            dispatch(getActiveLanguagesSuccess(languageResponse));
            resolve(languages);
        }
      } catch (error: any) {
        dispatch(getActiveLanguagesFailure());
        console.error({ error });
        const errorsArray = getErrorsArray(error);
        reject(errorsArray);
      }
    });
