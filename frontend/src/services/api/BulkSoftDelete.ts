import axios from 'axios'
import { ID, ResponseModel } from '../../_metronic/helpers'
import { ServiceArrayStringToString } from '../formatter/string'

export function ServiceBulkSoftDelete<T>(
  collection: string,
  id: ID[] | string[]
): Promise<ResponseModel<T>> {
  return new Promise((resolve, reject) => {
    try {
      const API_URL = import.meta.env.VITE_APP_API_BASE_URL || '';
      const API_VERSION = import.meta.env.VITE_APP_API_VERSION || ''
      const ids: string = ServiceArrayStringToString(id)
      const url: string = `${API_URL}/${API_VERSION}/${collection}/${ids}/delete`
      
      axios.put(url)
        .then(response => resolve(response))
        .catch(error => reject(error))
    } catch (err) {
      reject(err)
    }
  })
}
