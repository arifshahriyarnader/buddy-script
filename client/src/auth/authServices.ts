import axios from "axios";
import { appConfig } from "../common/config";
import type { RegistrationData } from "./authTypes";

export const registration = (userData: RegistrationData) => {
  return axios.post(`${appConfig.BASE_URL}/api/auth/signup`, userData);
};
