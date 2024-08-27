/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthModel, UserModel } from './_models';

const AUTH_LOCAL_STORAGE_KEY = 'authorization_token';
const USER_LOCAL_STORGE_KEY = 'user_authorization';
const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return;
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);

  if (!lsValue) {
    return;
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel;
    if (auth) {
      // You can easily check auth_token expiration also
      return auth;
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error);
  }
};

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return;
  }

  try {
    const lsValue = JSON.stringify(auth);
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue);
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error);
  }
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error);
  }
};

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json';
  axios.interceptors.request.use(
    (config: { headers: { Authorization: string } }) => {
      const auth = getAuth();

      if (auth && auth.access_token) {
        config.headers.Authorization = `Bearer ${auth.access_token}`;
      }

      return config;
    },
    (err: any) => Promise.reject(err)
  );
}

const setUser = (user: UserModel) => {
  if (!localStorage) {
    return;
  }

  try {
    const lsValue = JSON.stringify(user);
    localStorage.setItem(USER_LOCAL_STORGE_KEY, lsValue);
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error);
  }
};

const removeUser = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(USER_LOCAL_STORGE_KEY);
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error);
  }
};

type roleprops = {
  path: string;
  currentUser?: UserModel;
  auth?: AuthModel;
};

const PrivilegesValidation = ({ path, currentUser, auth }: roleprops) => {
  if (!currentUser || !auth) {
    return true;
  }

  if (!auth?.role) {
    return true;
  }

  let privileges = auth?.role?.privileges;

  if (!privileges) {
    return true;
  }

  const role = auth.role;
  if (role.privileges && role.privileges.length === 0) {
    return true;
  }

  const admin = privileges?.filter((p) => {
    return p.uri.toString().toLowerCase() === '*';
  });

  if (admin && admin.length > 0) {
    return false;
  } else {
    privileges = privileges?.filter((p) => {
      const matching = new RegExp(p.uri.toString().toLowerCase());
      return (
        p.uri.toString().toLowerCase() === path.toString().toLowerCase() ||
        matching.test(path.toString().toLowerCase())
      );
    });

    if (privileges && privileges.length > 0) {
      return false;
    } else {
      return true;
    }
  }
};

export {
  getAuth,
  setAuth,
  removeAuth,
  setUser,
  removeUser,
  AUTH_LOCAL_STORAGE_KEY,
  PrivilegesValidation,
};
