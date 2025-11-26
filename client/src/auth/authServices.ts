import axios from "axios";
import { appConfig } from "../common/config";
import type { AuthUser, LoginData, RegistrationData } from "./authTypes";

export const registration = (userData: RegistrationData) => {
  return axios.post(`${appConfig.BASE_URL}/api/auth/signup`, userData);
};

const saveAuthUser = (authUser: AuthUser) => {
  localStorage.setItem(appConfig.CURRENT_USER_KEY, JSON.stringify(authUser));
};

const getAuthUser = (): AuthUser | null => {
  const storedUser = localStorage.getItem(appConfig.CURRENT_USER_KEY);
  if (!storedUser) return null;
  return JSON.parse(storedUser);
};
export const isUserLoggedIn = () => {
  return !!getAuthUser();
};

export const getAccessToken = () => {
  const authUser = getAuthUser();
  return authUser?.accessToken || null;
};

export const getRefreshToken = () => {
  const authUser = getAuthUser();
  return authUser?.refreshToken || null;
};

export const login = async (loggedUserData: LoginData) => {
  try {
    const response = await axios.post(
      `${appConfig.BASE_URL}/api/auth/login`,
      loggedUserData
    );
     const data = response.data;
    const authUser: AuthUser = {
      user: {
        _id: data._id,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
      },
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
    saveAuthUser(authUser);
    return authUser;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Login failed:", error.response?.data || error.message);
    } else {
      console.error("An unexpected error occured:", error);
    }
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem(appConfig.CURRENT_USER_KEY);
};
