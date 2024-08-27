import axios from 'axios';
import { ResponseModel } from '../../_metronic/helpers';

export async function ServiceGetAllWithQueryString<T>(
  collection: string,
  params?: string
): Promise<ResponseModel<T>> {
  return new Promise(async (resolve, reject) => {
    try {
      const API_URL = import.meta.env.VITE_APP_API_BASE_URL || '';
      const API_VERSION = import.meta.env.VITE_APP_API_VERSION || '';
      const url: string = `${API_URL}/${API_VERSION}/${collection}?${
        params || ''
      }`;

      const response: ResponseModel<T> = await axios.get(url);
      return resolve(response);
    } catch (err) {
      return reject(err);
    }
  });
}
