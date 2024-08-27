import axios from 'axios'
import { ID, ResponseSingleModel } from '../../_metronic/helpers'

export function ServiceGetOneById<T>(
  collection: string,
  id: string | ID
): Promise<ResponseSingleModel<T>> {
  return new Promise((resolve, reject) => {
    try {
      const API_URL = import.meta.env.VITE_APP_API_BASE_URL || '';
      const API_VERSION = import.meta.env.VITE_APP_API_VERSION || ''
      const url: string = `${API_URL}/${API_VERSION}/${collection}/${id}`
      
      axios.get(url)
        .then(response => resolve(response))
        .catch(error => reject(error))
    } catch (err) {
      reject(err)
    }
  })
}
