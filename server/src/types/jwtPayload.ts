export interface JwtPayload {
  _id: string;
  email?: string;
  [key: string]: any;
}
