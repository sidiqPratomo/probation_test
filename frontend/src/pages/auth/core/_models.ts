export interface BaseAuthModel {
  user?: UserModel;
  role?: RoleResponse;
  access_token: string;
  //api_token: string
  //refreshToken?: string
}

export interface LoginResponseModel extends BaseAuthModel {
   
}

export interface RefreshTokenResponse {
  access_token: string;
  
}

export interface AuthModel extends BaseAuthModel { }


export interface Privilege {
  id?: number;
  role: number;
  action?: string;
  uri: string;
  method: string;
  created_by: null | string;
  updated_by: null | string;
  created_time: string;
  updated_time: string;
  status: number;
}

export interface Role {
  id: number;
  users_id: number;
  roles_id: {
    id: number;
    name: string;
    code: string;
    created_by: null | string;
    updated_by: null | string;
    created_time: string;
    updated_time: string;
    status: number;
  };
  created_by: null | string;
  updated_by: null | string;
  created_time: string;
  updated_time: string;
  status: number;
}

export interface RoleResponse {
  privileges: Privilege[];
  role: Role[];
}

export interface UserModel {
  id: number
  photo: string | null
  first_name: string
  last_name: string
  username: string
  email: string
  gender?: string
  address?: string
  password: string
  created_by: string | null
  updated_by: string | null
  created_time: string
  updated_time: string
  status: number
  // username: string
  // password: string | undefined
  // email: string
  // first_name: string
  // last_name: string
  // fullname?: string
  // occupation?: string
  // companyName?: string
  // phone?: string
  // roles?: Array<number>
  // pic?: string
  // language?: 'en' | 'de' | 'es' | 'fr' | 'ja' | 'zh' | 'ru'
  // timeZone?: string
  // website?: 'https://keenthemes.com'
  // emailSettings?: UserEmailSettingsModel
  // auth?: AuthModel
  // communication?: UserCommunicationModel
  // address?: UserAddressModel
  // socialNetworks?: UserSocialNetworksModel
}
