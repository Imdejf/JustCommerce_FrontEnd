import axios, { ResponseType, AxiosResponse } from "axios";

import jwtDecode from "jwt-decode";

import { conn } from "../api/BaseConnection";
import { IRequestSucces } from "../types/globalTypes";
import { IRegisterDTO } from "../types/userTypes";
import { IAuthToken, IDecodeToken } from "../store/reducers/auth";
import { showServerErrors } from "utils/errorsUtils";

const endpoint = conn.endpoints.auth;

const login = (
  Username: string,
  Password: string,
  requestType?: ResponseType,
): Promise<IAuthToken> => {
  const data = `Username=${Username}&Password=${Password}&grant_type=password&client_id=ro.client&client_secret=secret`;


  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  return axios.post('http://localhost:5000/connect/token', data, config).then((response: AxiosResponse) => {
    const authToken: IAuthToken = {
      Token: response.data.access_token,
      ExpiresInMin: response.data.expires_in
    };
    return authToken;
  });
};

const logout = (
  userId: string,
  requestType?: ResponseType,
): Promise<IRequestSucces> => {
  //TODO: handle logOut
  // return conn.postJSON(`${endpoint}/LogOut`, requestType, {
  //   userId,
  // });
  return new Promise((resolve, reject) => {
    resolve({ data: "ok" });
  });
};

const register = (
  user: Partial<IRegisterDTO>,
  profile: { label: string; value: number },
): Promise<string> => {
  return conn.postJSON(`${endpoint}/Register`, "json", {
    ...user,
    Profile: profile.value,
  });
};

const getTokenInfoFromLocal = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const { exp } = jwtDecode<IDecodeToken>(token);
    const expiresInMiliseconds = exp * 1000;
    // const expiresInMiliseconds = exp * 1000 - 30000 - 60000 * 29;
    const expiresAt = new Date(expiresInMiliseconds);
    const milisecondsToExpire = expiresInMiliseconds - Date.now();
    return { token, expiresAt, milisecondsToExpire };
  }

  return { token: "", expiresAt: "", milisecondsToExpire: 0 };
};

//all in miliseconds
const CHECK_TIME_OFFSET = 10000;
const EXPIRES_OFFSET = CHECK_TIME_OFFSET * 2;
const MINIMUM_CHECK_TIME = 1000;

let sessionHandler: ReturnType<typeof setTimeout>;

const keepSession = () => {
  const { milisecondsToExpire } = getTokenInfoFromLocal();
  const checkTimeout = Math.max(
    milisecondsToExpire - CHECK_TIME_OFFSET,
    MINIMUM_CHECK_TIME,
  );

  if (sessionHandler) {
    clearTimeout(sessionHandler);
  }
  sessionHandler = setTimeout(async () => {
    const shouldRefreshToken =
      milisecondsToExpire - checkTimeout <= EXPIRES_OFFSET;
    if (shouldRefreshToken) {
      try {
        refreshToken();
        return keepSession();
      } catch (errors: any) {
        showServerErrors(errors);
      }
    }
  }, checkTimeout);
};

const setToken = (token: string, tokenType = "Bearer") => {
  const authorizationHeader = `${tokenType} ${token}`;
  conn.setAuthToken(authorizationHeader);
  localStorage.setItem("token", token);
};

const refreshToken = async () => {
  try {
    await conn.putJSON(`${endpoint}/RefreshToken`, "json", {});

    // if (token) {
    //   setToken(token);
    // }
  } catch (error: any) {
    localStorage.removeItem("token");
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    window.location.pathname === "/login";
    throw error;
  }
};

const revokeToken = () => {
  clearTimeout(sessionHandler);
  conn.setAuthToken("");
  localStorage.removeItem("token");
  localStorage.removeItem("token-expires");
};

const remindPassword = (email: string) => {
  return conn.postJSON(`${endpoint}/SendPasswordResetEmail`, "json", { email });
};

const authService = {
  getTokenInfoFromLocal,
  keepSession,
  login,
  logout,
  refreshToken,
  register,
  remindPassword,
  revokeToken,
  setToken,
};

export default authService;
