import { Dispatch, SetStateAction } from 'react';
import { FileModel } from '../../../base_models/FileModel';

export type ID = undefined | null | number;

export interface LinkPagination {
  label: string;
  active: boolean;
  page: number | null;
  skip: number;
  limit: number;
  type?: string;
}

export type PaginationState = {
  skip: number;
  limit: number;
};

export type SortState = {
  sort?: {
    key: string;
    order: '1' | '-1' | undefined;
  };
};

export type FilterState = {
  [key: string]: any;
};

export type SearchState = {
  search?: string;
};

export type ResponseModel<T> = {
  data: {
    status?: boolean;
    code?: number;
    message?: string;
    data: {
      data: any;
      result: Array<T>;
      count: number;
    };
  };
};

// export type ResponseModelIsland<T> = {
//   data: {
//       data: Array<T>;
//       count: number;
//   };
// };


export interface ResponseModelIsland<T> {
  success: boolean;
  message: string;
  data: T[];  // Adjusted to reflect that data is an array of Island
  count: number;
}

export interface ResponseModelProvince<T> {
  success: boolean;
  message: string;
  data: T[];  // Adjusted to reflect that data is an array of Island
  count: number;
}

export interface ResponseModelCity<T> {
  success: boolean;
  message: string;
  data: T[];  // Adjusted to reflect that data is an array of Island
  count: number;
}

export type ResponseSingleModel<T> = {
  data: {
    status?: boolean;
    code?: number;
    message?: string;
    data: T;
  };
};

export type ResponseMultipleFile = {
  data: {
    status?: boolean;
    code?: number;
    message?: string;
    data: Array<FileModel>;
  };
};

export type ResponseSingleFile = {
  data: {
    status?: boolean;
    code?: number;
    message?: string;
    data: FileModel;
  };
};

export type QueryState = PaginationState &
  SortState &
  FilterState &
  SearchState;

export type QueryRequestContextProps = {
  state: QueryState;
  updateState: (updates: Partial<QueryState>) => void;
};

export const initialQueryState: QueryState = {
  skip: 0,
  limit: 10,
  sort: {
    key: 'created_time',
    order: '-1',
  },
  filter: {
    status: 1,
  },
};

export const initialTrashQueryState: QueryState = {
  skip: 0,
  limit: 10,
  sort: {
    key: 'created_time',
    order: '-1',
  },
  filter: {
    status: 0,
  },
};

export const initialQueryRequest: QueryRequestContextProps = {
  state: initialQueryState,
  updateState: () => {},
};

export type QueryResponseContextProps<T> = {
  response?: ResponseModel<T> | undefined;
  refetch: () => void;
  isLoading: boolean;
  query: string;
};

export const initialQueryResponse = {
  refetch: () => {},
  isLoading: false,
  query: '',
};

export type ListViewContextProps = {
  selected: Array<ID>;
  onSelect: (selectedId: ID) => void;
  onSelectAll: () => void;
  clearSelected: () => void;
  // NULL => (CREATION MODE) | MODAL IS OPENED
  // NUMBER => (EDIT MODE) | MODAL IS OPENED
  // UNDEFINED => MODAL IS CLOSED
  itemIdForUpdate?: ID;
  setItemIdForUpdate: Dispatch<SetStateAction<ID>>;
  isAllSelected: boolean;
  disabled: boolean;
};

export const initialListView: ListViewContextProps = {
  selected: [],
  onSelect: () => {},
  onSelectAll: () => {},
  clearSelected: () => {},
  setItemIdForUpdate: () => {},
  isAllSelected: false,
  disabled: false,
};
