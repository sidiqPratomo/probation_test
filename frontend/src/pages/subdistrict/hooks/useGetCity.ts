import axios from 'axios';
import { useQuery } from 'react-query';
import { City } from '../../../models/countries';
import { ResponseModelCity } from '../../../_metronic/helpers';

export const fetchAllCity = async (): Promise<ResponseModelCity<City>> => {
    const API_URL = import.meta.env.VITE_APP_API_BASE_URL || '';
      const API_VERSION = import.meta.env.VITE_APP_API_VERSION || 'api';
      const url: string = `${API_URL}/${API_VERSION}/city`;
      const response = await axios.get<ResponseModelCity<City>>(url);
      return response.data;
  };

  export const useAllCity = () => {
    return useQuery<ResponseModelCity<City>, Error>('allIsland', fetchAllCity);
  };