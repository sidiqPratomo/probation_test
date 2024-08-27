import {ID} from '../_metronic/helpers'

export interface Role {
  id?: ID
  name: string
  code?: string
}

export const InitialValue = {
  name: '',
  code: '',
}

export interface RoleRequest {
  id?: ID
  code?: string
  name: string
  privilege?: Array<string> | string
}
