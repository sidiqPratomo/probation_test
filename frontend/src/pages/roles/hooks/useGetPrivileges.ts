import axios from 'axios';


const config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const formattedPrivileges = async (): Promise<any> => {
  try {
    const API_URL = import.meta.env.VITE_APP_API_BASE_URL || '';
    const API_VERSION = import.meta.env.VITE_APP_API_VERSION || ''
    const url: string = `${API_URL}/${API_VERSION}/privileges/fetch/format`

    const response = await axios.get(url, { ...config });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response);
    }
  }
}

export const useGetPrivileges = () => {
  return {
    formattedPrivileges,
  };
};
