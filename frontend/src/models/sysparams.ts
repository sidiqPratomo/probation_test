import { ID } from "../_metronic/helpers";

export interface Sysparam {
  id?: ID
  group: string 
  key: string
  type?: string | undefined
  value: string
  long_value?: string
}


export const InitialValue = {
  group: '',
  key: '',
  value: '',
  long_value: '',
  type: undefined,
}