import axios from 'axios';
import { ServiceFormatQueryString } from '../formatter/queryStringFilter';
import { QueryStringModel } from '../../base_models/QueryString';
import { ResponseModel } from '../../_metronic/helpers';

export function ServiceGetAll<T>(
  collection: string,
  params?: QueryStringModel
): Promise<ResponseModel<T>> {
  return new Promise(async (resolve, reject) => {
    try {
      const API_URL = import.meta.env.VITE_APP_API_BASE_URL || '';
      const API_VERSION = import.meta.env.VITE_APP_API_VERSION || '';
      const queryParams: string = ServiceFormatQueryString(params);
      const url: string = `${API_URL}/${API_VERSION}/${collection}?${
        queryParams || ''
      }`;
      const response: ResponseModel<T> = await axios.get(url);
      return resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}
