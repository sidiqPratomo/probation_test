import axios from "axios";
import { AuthModel, LoginResponseModel, UserModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_AUTH_BASE_URL;
const API_VER = import.meta.env.VITE_APP_API_VERSION;


export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/${API_VER}/auth/refresh`;
export const REFRESH_ACCESSTOKEN_URL = `${API_URL}/${API_VER}/auth/refresh`
export const LOGIN_URL = `${API_URL}/${API_VER}/auth/signin`;
export const REGISTER_URL = `${API_URL}/${API_VER}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/${API_VER}/forgot_password`;

// Server should return AuthModel
export function login(username: string, password: string) {
  return axios.post<LoginResponseModel>(LOGIN_URL, {
    username,
    password,
  });
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  });
}

export function refreshToken(token: string){
  return axios.post<AuthModel>(REFRESH_ACCESSTOKEN_URL, {
    access_token: token,
  })
}

export function getUserByAuthModel(auth: AuthModel){
  return auth.user;
}
