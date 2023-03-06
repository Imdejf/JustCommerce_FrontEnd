import axios, { AxiosInstance, ResponseType } from "axios";
import qs from "qs";
export type IConnections = typeof connections.development;

export interface IRequestError {
  status: number;
  errors?: Array<Array<string>>;
  Errors?: Array<Array<string>>;
}

class BaseConnection {
  authentication: string;
  auth_token: string;
  base_url: string;
  endpoints: Omit<IConnections, "core">;
  conn: AxiosInstance;
  constructor(connections: IConnections) {
    this.authentication = "";
    this.auth_token = "";

    const { core, ...endpoints } = connections;
    this.base_url = core;
    this.endpoints = endpoints;

    this.conn = axios.create({
      timeout: 100 * 1000,
    });

    this.conn.interceptors.response.use(
      (response) => response,
      (error) => {
        const serverErrorRegex = /^5[0-9]{2}$/;
        const isServerError =
          !error.response || serverErrorRegex.test(error.response.status);
        if (
          error.response.data?.Errors?.Message[0] ===
          "Attempted to perform an unauthorized operation."
        ) {
          return Promise.reject({
            response: {
              data: {
                Errors: ["Nie masz uprawnień do tej akcji!"],
              },
            },
          });
        }
        if (isServerError) {
          return Promise.reject({
            response: {
              data: {
                Errors: [
                  "Przepraszamy, wystąpił błąd przy połączeniu z serwerem. Skontakuj się z ...",
                ],
              },
            },
          });
        }
        if (error.response.status === 403) {
          return Promise.reject({
            response: {
              data: {
                Errors: ["Brak uprawnień do wybranej opcji"],
              },
            },
          });
        }

        return Promise.reject(error);
      },
    );
  }

  setAuthToken(token: string) {
    this.authentication = token;
    if (token && token.indexOf("Bearer ") === 0) {
      this.conn.defaults.headers.common.Authorization = token;
    } else {
      delete this.conn.defaults.headers.common.Authorization;
    }
  }

  getJSON<T>(
    url: string,
    type: ResponseType = "json",
    payload = {},
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      //   this.queue.push(() =>
      this.conn
        .get(this.base_url + url, {
          responseType: type,
          params: payload,
          paramsSerializer: function (params) {
            return qs.stringify(params, { indices: false });
          },
        })
        .then((response) => {
          console.log(response.data)
          const { statusCode, data } = response.data;
          
          if (statusCode === 200) {
            console.log(data);
            resolve(data);
          }
        })
        .catch((err) => {
          reject(err.response.data);
        });
      //   );
    });
  }

  postJSON(
    endpoint: string,
    type: ResponseType = "json",
    payload = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      //   this.queue.push(() =>
      this.conn
        .post(this.base_url + endpoint, payload, {
          responseType: type,
        })
        .then((response) => {
          const { Data } = response.data;
          resolve(Data);
        })
        .catch((err) => {
          reject(err.response.data);
        });
      //   );
    });
  }

  putJSON(
    url: string,
    type: ResponseType = "json",
    payload = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      //   this.queue.push(() =>
      this.conn
        .put(this.base_url + url, payload, { responseType: type })
        .then((response) => {
          const { data } = response.data;
          resolve(data);
        })
        .catch((err) => {
          reject(err.response.data);
        });
      //   );
    });
  }

  patchJSON(
    url: string,
    type: ResponseType = "json",
    payload = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.conn
        .patch(this.base_url + url, payload, { responseType: type })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  }

  deleteJSON(url: string, type: ResponseType = "json", payload = {}) {
    return new Promise((resolve, reject) => {
      //   this.queue.push(() =>
      this.conn
        .delete(this.base_url + url, { responseType: type, params: payload })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err.response.data);
        });
      //   );
    });
  }

  protected all(arr: Array<any>) {
    return axios.all(arr);
  }

  // setAuthorizationErrorHandler(errorHandler) {
  //   this.authorizationErrorHandler = errorHandler;
  // }
}

const remoteEndpoints = {
  attributeGroup: "/api/administration/AttributeGroup",
  attribute: "/api/administration/attribute",
  language: "/api/administration/language",
  productTemplate: "/api/administration/productTemplate",
  productOption: "/api/administration/ProductOption",
  product: "/api/administration/product",
  category:"/api/administration/Category",
  //old
  artists: {
    base: "/artists/api/Artists",
    pressPacks: "/artists/api/Presspacks",
    storedFiles: "/artists/api/StoredFiles",
  },
  applicationUser: "/api/administration/AttributeGroup",
  auth: "/api/User",
  conditions: {
    base: "/conditions/api/Conditions",
    licensor: "/conditions/api/Conditions/Licensor",
    templates: "/conditions/api/Conditions/Templates",
  },
  digitalReleases: {
    base: "/digitalrelease/api/DigitalReleases",
    artists: "/digitalrelease/api/Artists",
  },
  licensors: "/labels/api/Licensors",
  permissions: "/auth/api/Permissions",
  profiles: "/auth/api/Profiles",
  providers: "/provider/api/providers",
  salesChannel: {
    salesChannel: "/saleschannel/api/SalesChannels",
    groups: "/saleschannel/api/Groups",
    providers: "/saleschannel/api/Providers",
    subGroups: "/saleschannel/api/Subgroups",
  },
  tracks: { base: "/track/api/Tracks", artists: "/track/api/Artists" },
  users: "/auth/api/Users",
  profile: "/api/profile",
  files: "/api/files",
  filesCategory: "/api/filesCategory",
  permission: "/api/Permission",
  delivery: "/api/Delivery",
  playerProfile: "/api/PlayerProfile",
  trainerProfile: "/api/TrainerProfile",
  academy: "/api/Academy",
  order: "/api/Order",
  notification: "/api/Notification",
};

const connections = {
  development: {
    core: "http://localhost:5000",
    ...remoteEndpoints,
  },
  production: {
    core: "https://adminapi.justwin.pl",
    ...remoteEndpoints,
  },
  test: {
    core: "https://localhost",
    attributeGroup: ":5000/api/administration/AttributeGroup",
    attribute: ":5000/api/administration/Attribute",
    language: ":5000/api/administration/language",
    productTemplate: ":5000/api/administration/productTemplate",
    productOption: ":5000/api/administration/ProductOption",
    category:":5000/api/administration/Category",
    product:":5000/api/administration/Product",
    artists: {
      base: ":5002/api/Artists",
      pressPacks: ":5002/api/Presspacks",
      storedFiles: ":5002/api/StoredFiles",
    },
    applicationUser: ":5002/api/applicationUser",
    auth: ":5001/api/Auth",
    conditions: {
      base: ":5003/api/Conditions",
      licensor: ":5003/api/Conditions/Licensor",
      templates: ":5003/api/Conditions/Templates",
    },
    digitalReleases: {
      base: ":50010/api/DigitalReleases",
      artists: ":50010/api/Artists",
    },
    licensors: ":50011/api/Licensors",
    permissions: ":5001/api/Permissions",
    profiles: ":5001/api/Profiles",
    providers: ":5001/api/Providers",
    salesChannel: {
      groups: ":50021/api/Groups",
      salesChannel: ":50021/api/SalesChannels",
      subGroups: ":50021/api/Subgroups",
      providers: ":50021/api/Providers",
    },
    tracks: { base: ":50011/api/Tracks", artists: ":50011/api/Artists" },
    users: ":5002/api/Users",
    profile: ":5004/profile",
    files: ":5002/api/files",
    filesCategory: ":5002/api/filesCategory",
    permission: ":5002/api/Permission",
    delivery: ":5002/api/Delivery",
    playerProfile: ":5002/api/PlayerProfile",
    trainerProfile: ":5002/api/TrainerProfile",
    academy: ":5002/api/Academy",
    order: ":5002/api/Order",
    notification: ":5002/api/Notification",
  },
};

export const conn = new BaseConnection(connections[process.env.NODE_ENV]);

export default BaseConnection;
