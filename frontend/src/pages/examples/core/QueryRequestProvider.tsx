/* eslint-disable react-refresh/only-export-components */
import { FC, useState, createContext, useContext } from 'react';
import {
  QueryState,
  QueryRequestContextProps,
  initialQueryRequest,
  WithChildren,
} from '../../../_metronic/helpers';
import { useLocation } from 'react-router-dom';
import { useCheckUrl } from '../../../hooks/useCheckUrl';

const QueryRequestContext =
  createContext<QueryRequestContextProps>(initialQueryRequest);

const QueryRequestProvider: FC<WithChildren> = ({ children }) => {
  const location = useLocation();
  const { isUrlTrash } = useCheckUrl();
  const currentState = (): QueryState => {
    const { state } = initialQueryRequest;
    const { pathname } = location;
    if (isUrlTrash(pathname)) {
      return {
        ...state,
        filter: {
          status: 0,
        },
      };
    }

    return state;
  };
  const [state, setState] = useState<QueryState>(currentState);

  const updateState = (updates: Partial<QueryState>) => {
    const updatedState = { ...state, ...updates } as QueryState;
    setState(updatedState);
  };

  return (
    <QueryRequestContext.Provider value={{ state, updateState }}>
      {children}
    </QueryRequestContext.Provider>
  );
};

const useQueryRequest = () => useContext(QueryRequestContext);
export { QueryRequestProvider, useQueryRequest };
