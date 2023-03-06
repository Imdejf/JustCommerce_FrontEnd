export interface IAction<T = null> {
  type: ActionType;
  payload?: T;
}

export interface IActionPayloaded<T> {
  type: ActionType;
  payload: T;
}

export enum ActionType {
  DESTROY_SESSION,
  GET_PROFILES_SUCCESS,
  GET_PROFILES_FAILURE,
  CHANGE_PERMISSIONS_SUCCESS,
  GET_PERMISSIONS_SUCCESS,
  GET_PERMISSIONS_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  GET_CUR_USER_SUCCESS,
  GET_CUR_USER_FAILURE,
  GET_LANGUAGES_SUCCESS,
  GET_LANGUAGES_FAILURE,
  CHANGE_USERS_FAILURE,
  CHANGE_USERS_SUCCESS,
  CHANGE_DATA_VIEW_MODE,
  FILTER_PANEL_OPEN,
  FILTER_PANEL_CLOSE,
  GET_ARTIST_DETAIL,
  GET_PRESSPACK_SUCCESS,
  GET_PRESSPACK_FAILURE,
  ADD_PRESSPACK,
  EDIT_PRESSPACK,
}
