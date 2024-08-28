import axios from 'axios';
import { useQuery } from 'react-query';
import { Province } from '../../../models/countries';
import { ResponseModelProvince } from '../../../_metronic/helpers';

export const fetchAllIsland = async (): Promise<ResponseModelProvince<Province>> => {
    const API_URL = import.meta.env.VITE_APP_API_BASE_URL || '';
      const API_VERSION = import.meta.env.VITE_APP_API_VERSION || 'api';
      const url: string = `${API_URL}/${API_VERSION}/province`;
      const response = await axios.get<ResponseModelProvince<Province>>(url);
      return response.data;
  };

  export const useAllProvince = () => {
    return useQuery<ResponseModelProvince<Province>, Error>('allIsland', fetchAllIsland);
  };