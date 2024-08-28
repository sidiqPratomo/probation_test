import axios from 'axios';
import { useQuery } from 'react-query';
import { Island } from '../../../models/countries';
import { ResponseModelIsland } from '../../../_metronic/helpers';

export const fetchAllIsland = async (): Promise<ResponseModelIsland<Island>> => {
    const API_URL = import.meta.env.VITE_APP_API_BASE_URL || '';
      const API_VERSION = import.meta.env.VITE_APP_API_VERSION || 'api';
      const url: string = `${API_URL}/${API_VERSION}/region`;
      const response = await axios.get<ResponseModelIsland<Island>>(url);
      return response.data;
  };

  export const useAllIsland = () => {
    return useQuery<ResponseModelIsland<Island>, Error>('allIsland', fetchAllIsland);
  };