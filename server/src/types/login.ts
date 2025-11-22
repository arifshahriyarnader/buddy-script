export interface LoginRequestBody {
  type: "email" | "refresh";
  email?: string;
  password?: string;
  refreshToken?: string;
}
