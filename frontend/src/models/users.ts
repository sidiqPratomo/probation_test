import { ID } from "../_metronic/helpers";

export interface User {
  id?: ID;
  username:string;
  first_name: string;
  last_name?: string;
  email:string;
  password?:string;
  confirm_password?:string;
  role?: string;
}

export interface UserResponse {
  id: ID;
  username: string;
  first_name: string;
  last_name?: string;
  email:string;
  role?: Array<string>;
  password: string;
}

export const InitialValue = {
  username: '',
  first_name: '',
  last_name: '',
  email:'',
  password:'',
  confirm_password:'',
}

