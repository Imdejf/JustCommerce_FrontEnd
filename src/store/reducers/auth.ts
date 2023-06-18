import { ActionType, IAction } from "../actions/actionTypes";

export interface ISignInData {
  login: string;
  password: string;
}

export interface IAuthState {
  isAuth: boolean | null;
}

export interface IAuthToken {
  Token: string;
  ExpiresInMin: number;
}

export interface IDecodeToken {
  iat: number;
  jti: string;
  ROLE: number;
  AuthServicePermissions: string;
  TracksServicePermissions: string;
  "AuthServicePermissionsLIST**": Array<string>;
  "TracksServicePermissionsLIST**": Array<string>;
  UserId: string;
  FirstName: string;
  LastName: string;
  Email: string;
  nbf: number;
  exp: number;
  iss: string;
  aud: string;
}

const initialValue: IAuthState = {
  isAuth: null,
};

const authState = (state = initialValue, action: IAction) => {
  switch (action.type) {
    case ActionType.SIGN_IN_SUCCESS:
      return {
        ...state,
        isAuth: true,
      };
    case ActionType.SIGN_IN_FAILURE:
      return {
        ...state,
        isAuth: false,
      };
    case ActionType.SIGN_OUT_SUCCESS:
      return {
        ...state,
        isAuth: false,
      };
    case ActionType.SIGN_OUT_FAILURE:
      return state;
    case ActionType.REGISTER_SUCCESS:
      return { ...state, error: "" };
    case ActionType.REGISTER_FAILURE:
      return { ...state, error: "Register Error" };
    default:
      return state;
  }
};
export default authState;
