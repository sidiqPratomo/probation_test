import axios from 'axios'
import { ID, ResponseSingleModel } from '../../_metronic/helpers'

export function ServiceUpdate<T>(
  collection: string,
  id: ID | string,
  payload: T
): Promise<ResponseSingleModel<T>> {
  return new Promise((resolve, reject) => {
    try {
      const API_URL = import.meta.env.VITE_APP_API_BASE_URL || '';
      const API_VERSION = import.meta.env.VITE_APP_API_VERSION || ''
      const url: string = `${API_URL}/${API_VERSION}/${collection}/${id}`
      axios.put(url, payload)
        .then(response => resolve(response))
        .catch(error => reject(error))
    } catch (err) {
      reject(err)
    }
  })
}
