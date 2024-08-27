import axios from 'axios'
import { QueryStringModel } from '../../base_models/QueryString'
import { ServiceFormatQueryString } from '../formatter/queryStringFilter'
import { ResponseModel } from '../../_metronic/helpers'

export function ServiceGetOneByParams<T>(
  collection: string,
  params?: QueryStringModel
): Promise<ResponseModel<T>> {
  return new Promise((resolve, reject) => {
    try {
      const API_URL = import.meta.env.VITE_APP_API_BASE_URL || '';
      const API_VERSION = import.meta.env.VITE_APP_API_VERSION || ''
      const queryParams: string = ServiceFormatQueryString(params)
      const url: string = `${API_URL}/${API_VERSION}/${collection}?${queryParams || ''}`

      axios.get(url)
        .then(response => resolve(response))
        .catch(error => reject(error))
    } catch (err) {
      reject(err)
    }
  })
}
