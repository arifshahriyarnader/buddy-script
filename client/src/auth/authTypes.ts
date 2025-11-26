export interface RegistrationFormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface RegistrationData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  // repeatPassword: string;
}

export interface LoginData {
  type: "email" | "refresh";
  email?: string;
  password?: string;
  refreshToken?: string | null;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface AuthUser {
  user: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
}
