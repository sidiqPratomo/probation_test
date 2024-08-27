import { ID } from "../_metronic/helpers";

export interface Privileges {
  id?: ID;
  module: string;
  submodule: string;
  action: string;
  method: string;
  uri: string;
  ordering: string
}

export const InitialValue = {
  module: '',
  submodule: '',
  action: '',
  method: '',
  uri: '',
  ordering: '',
}

export interface MappingFetchPrivilege {
  submodule: string;
  action: string;
  uri: string;
  method: string;
}

export interface MappingPrivilege {
  name: string;
  mapping: Array<MappingFetchPrivilege>;
}

export interface DataMappingPrivilege {
  action: string;
  uri: string;
  method: string
}