import axios from 'axios'
import { ResponseSingleModel } from '../../_metronic/helpers'

export function ServiceCreate<T>(collection: string, payload: T): Promise<ResponseSingleModel<T>> {
  return new Promise((resolve, reject) => {
    try {
      const API_URL = import.meta.env.VITE_APP_API_BASE_URL || '';
      const API_VERSION = import.meta.env.VITE_APP_API_VERSION || ''
      const url: string = `${API_URL}/${API_VERSION}/${collection}`
      
      axios.post(url, payload)
        .then(response => resolve(response))
        .catch(error => reject(error))
    } catch (err) {
      reject(err)
    }
  })
}
