import jwtDecode, { JwtPayload } from "jwt-decode";
import { conn } from "../api/BaseConnection";
import axios from "axios";
import { IChangePasswordValues, IUser } from "../types/userTypes";
import { showServerErrors } from "utils/errorsUtils";

export const getUserFromToken = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken: JwtPayload = jwtDecode(token);
    try {
      const resp = await axios.get(
        `http://localhost:5000/api/User/Identity/currentUser/${decodedToken.sub}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );
      console.log(resp)
      const {
        firstName,
        lastName,
        email,
        username,
        id,
        position,
        phoneNumber,
        storeId,
        avatarFilePath
      } = resp.data.data;
      const user = {
        firstName: firstName,
        lastName: lastName,
        fullName: `${firstName} ${lastName}`,
        userId: id,
        email: email,
        role: 1,
        userName: username,
        storeId: storeId,
        avatarFilePath: avatarFilePath,

        isActive: true,
        permissions: [],
        phoneNumber: phoneNumber,
        position: position,
      };
      return user;
    } catch (errors: any) {
      showServerErrors(errors);
    }
  }
};

const getCurrentUser = (): Promise<IUser> => {
  return new Promise(async (resolve, reject) => {
    const userData = await getUserFromToken();
    if (userData) {
      resolve(userData);
    }

    reject({ error: ["User not found"] });
  });
};

const changePassword = (
  userId: string,
  passwords: IChangePasswordValues,
): Promise<any> => {
  return conn.postJSON("/api/Auth/ChangePassword", "json", {
    userId,
    ...passwords,
  });
};

const currentUser = {
  changePassword,
  getCurrentUser,
};

export default currentUser;
