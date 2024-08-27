import {QueryStringModel} from '../../../base_models/QueryString'
import {ServiceGetAll} from '../../../services/api/GetAll'
import {ServiceGetAllWithQueryString} from '../../../services/api/GetAllWithQueryString'
import {ID, ResponseModel, ResponseSingleModel} from '../../../_metronic/helpers'
import {ServiceSoftDelete} from '../../../services/api/SoftDelete'
import { ServiceHardDelete } from '../../../services/api/HardDelete'
import {ServiceBulkSoftDelete} from '../../../services/api/BulkSoftDelete'
import {ServiceCreate} from '../../../services/api/Create'
import {ServiceUpdate} from '../../../services/api/Update'
import {ServiceGetOneById} from '../../../services/api/GetOneById'


export async function get<Type>(
  collection: string,
  params?: QueryStringModel
): Promise<ResponseModel<Type[]>> {
  return new Promise(async (resolve, reject) => {
    try {
      const response: ResponseModel<Type[]> = await ServiceGetAll<Type[]>(collection, params)
      return resolve(response)
    } catch (e) {
      return reject(e)
    }
  })
}

export async function getWithQueryString<Type>(
  collection: string,
  params?: string
): Promise<ResponseModel<Type[]>> {
  
  return new Promise(async (resolve, reject) => {
    try {
      const response: ResponseModel<Type[]> = await ServiceGetAllWithQueryString<Type[]>(
        collection,
        params
      )
      return resolve(response)
    } catch (e) {
      return reject(e)
    }
  })
}

export async function getOneById<T>(
  collection: string,
  id: string
): Promise<ResponseSingleModel<T>> {
  return ServiceGetOneById<T>(collection, id);
}

export async function create<T>(
  collection: string,
  payload: T
): Promise<ResponseSingleModel<T>> {
  return ServiceCreate<T>(collection, payload)
}

export async function update<T>(
  collection: string,
  id: string | ID,
  payload: T
): Promise<ResponseSingleModel<T>> {
  return ServiceUpdate<T>(collection, id, payload)
}

export async function softDelete<Type>(collection: string, id: ID): Promise<ResponseModel<Type>> {
  return new Promise(async (resolve, reject) => {
    try {
      const response: ResponseModel<Type> = await ServiceSoftDelete(collection, id)
      return resolve(response)
    } catch (e) {
      return reject(e)
    }
  })
}

export async function hardDelete<T>(collection: string, id: ID): Promise<ResponseSingleModel<T>> {
  return ServiceHardDelete<T>(collection, id)
}

export async function bulkSoftDelete<Type>(
  collection: string,
  ids: ID[]
): Promise<ResponseModel<Type>> {
  return new Promise(async (resolve, reject) => {
    try {
      const response: ResponseModel<Type> = await ServiceBulkSoftDelete(collection, ids)
      return resolve(response)
    } catch (e) {
      return reject(e)
    }
  })
}
