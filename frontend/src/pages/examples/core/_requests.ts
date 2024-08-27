import { QueryStringModel } from '../../../base_models/QueryString';
import { ServiceGetAll } from '../../../services/api/GetAll';
import { ServiceGetAllWithQueryString } from '../../../services/api/GetAllWithQueryString';
import {
  ID,
  ResponseModel,
  ResponseSingleModel,
} from '../../../_metronic/helpers';
import { ServiceSoftDelete } from '../../../services/api/SoftDelete';
import { ServiceHardDelete } from '../../../services/api/HardDelete';
import { ServiceBulkSoftDelete } from '../../../services/api/BulkSoftDelete';
import { ServiceCreate } from '../../../services/api/Create';
import { ServiceUpdate } from '../../../services/api/Update';
import { ServiceGetOneById } from '../../../services/api/GetOneById';
import { Collection, ListModel } from './_models';
import { ServiceRestore } from '../../../services/api/Restore';
import { ServiceBulkHardDelete } from '../../../services/api/BulkHardDelete';

export async function get(
  params?: QueryStringModel
): Promise<ResponseModel<ListModel>> {
  return new Promise(async (resolve, reject) => {
    try {
      const response: ResponseModel<ListModel> = await ServiceGetAll<ListModel>(
        Collection,
        params
      );
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export async function getWithQueryString(
  params?: string
): Promise<ResponseModel<ListModel>> {
  return new Promise(async (resolve, reject) => {
    try {
      const response: ResponseModel<ListModel> =
        await ServiceGetAllWithQueryString<ListModel>(Collection, params);
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
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
  return ServiceCreate<T>(collection, payload);
}

export async function update<T>(
  id: string | ID,
  payload: T
): Promise<ResponseSingleModel<T>> {
  return ServiceUpdate<T>(Collection, id, payload);
}

export async function softDelete<Type>(
  collection: string,
  id: ID
): Promise<ResponseModel<Type>> {
  return new Promise(async (resolve, reject) => {
    try {
      const response: ResponseModel<Type> = await ServiceSoftDelete(
        collection,
        id
      );
      return resolve(response);
    } catch (e) {
      return reject(e);
    }
  });
}

export async function restore<Type>(
  collection: string,
  id: ID
): Promise<ResponseModel<Type>> {
  return new Promise(async (resolve, reject) => {
    try {
      const response: ResponseModel<Type> = await ServiceRestore(
        collection,
        id
      );
      return resolve(response);
    } catch (e) {
      return reject(e);
    }
  });
}

export async function hardDelete<T>(
  collection: string,
  id: ID
): Promise<ResponseSingleModel<T>> {
  return ServiceHardDelete<T>(collection, id);
}

export async function bulkSoftDelete<Type>(
  collection: string,
  ids: ID[]
): Promise<ResponseModel<Type>> {
  return new Promise(async (resolve, reject) => {
    try {
      const response: ResponseModel<Type> = await ServiceBulkSoftDelete(
        collection,
        ids
      );
      return resolve(response);
    } catch (e) {
      return reject(e);
    }
  });
}

export async function bulkHardDelete<Type>(
  collection: string,
  ids: ID[]
): Promise<ResponseModel<Type>> {
  return new Promise(async (resolve, reject) => {
    try {
      const response: ResponseModel<Type> = await ServiceBulkHardDelete(
        collection,
        ids
      );
      return resolve(response);
    } catch (e) {
      return reject(e);
    }
  });
}
