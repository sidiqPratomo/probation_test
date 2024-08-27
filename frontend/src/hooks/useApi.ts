import {ServiceCreate} from '../services/api/Create'
import {ServiceGetAll} from '../services/api/GetAll'
import {ServiceGetOneById} from '../services/api/GetOneById'
import {ServiceGetOneByParams} from '../services/api/GetOneByParams'
import {ServiceHardDelete} from '../services/api/HardDelete'
import {ServiceRestore} from '../services/api/Restore'
import {ServiceSoftDelete} from '../services/api/SoftDelete'
import {ServiceUpdate} from '../services/api/Update'
import {QueryStringModel} from '../base_models/QueryString'
import {ID} from '../_metronic/helpers'
import {ServiceBulkSoftDelete} from '../services/api/BulkSoftDelete'

export const useApi = () => {
  const getAll = async <T>(collection: string, params?: QueryStringModel) => {
    try {
      return await ServiceGetAll<T>(collection, params)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  const getOneById = async <T>(collection: string, id: string) => {
    try {
      return await ServiceGetOneById<T>(collection, id)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  const getOneByParams = async <T>(collection: string, params?: QueryStringModel) => {
    try {
      return await ServiceGetOneByParams<T>(collection, params)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  const create = async <T>(collection: string, payload: T) => {
    try {
      return await ServiceCreate<T>(collection, payload)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  const update = async <T>(collection: string, id: ID | string, payload: T) => {
    try {
      return await ServiceUpdate<T>(collection, id, payload)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  const softDelete = async <T>(collection: string, id: ID | string) => {
    try {
      return await ServiceSoftDelete<T>(collection, id)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  const bulkSoftDelete = async <T>(collection: string, id: ID[] | string[]) => {
    try {
      return await ServiceBulkSoftDelete<T>(collection, id)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  const hardDelete = async <T>(collection: string, id: string) => {
    try {
      return await ServiceHardDelete<T>(collection, id)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  const restore = async <T>(collection: string, id: string) => {
    try {
      return await ServiceRestore<T>(collection, id)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  return {
    getAll,
    getOneById,
    getOneByParams,
    create,
    update,
    softDelete,
    bulkSoftDelete,
    hardDelete,
    restore,
  }
}
