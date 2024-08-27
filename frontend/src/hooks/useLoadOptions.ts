import { OptionModel, QueryStringModel } from '../base_models';
import { ServiceGetAll } from '../services/api/GetAll';
import { ServiceGetOneById } from '../services/api/GetOneById';

export const useLoadOptions = () => {
  const loadOptions = async (
    collection: string,
    params?: QueryStringModel,
    keyLabel: string = 'id',
    keyValue: string = 'name'
  ): Promise<OptionModel[]> => {
    try {
      const { data } = await ServiceGetAll(collection, params);
      const { result } = data.data;
      const options: Array<OptionModel> = result.map((entry: any) => {
        const label = entry[keyLabel];
        const value = entry[keyValue];
        return {
          label,
          value,
        };
      });

      return Promise.resolve(options);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOptionSelected = async (
    collection: string,
    id: string,
    keyLabel: string = 'id',
    keyValue: string = 'name'
  ): Promise<OptionModel> => {
    try {
      const { data } = await ServiceGetOneById(collection, id);
      const entry: any = data.data;
      const label = entry[keyLabel];
      const value = entry[keyValue];
      const options = {
        label,
        value,
      };
      return Promise.resolve(options);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const sleepLoadOption = (duration: number = 1000): void => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(undefined);
      }, duration);
    });
  };

  return {
    loadOptions,
    getOptionSelected,
    sleepLoadOption,
  };
};
