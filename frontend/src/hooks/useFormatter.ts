import { ID } from '../_metronic/helpers';
import { FileModel } from '../base_models';
import { ServiceFormatFilenameLabel } from '../services/formatter/FilenameLabel';
import { ServiceFormatNumberDecimal } from '../services/formatter/number';
import { ServiceFormatQueryString } from '../services/formatter/queryStringFilter';
import {
  ServiceArrayStringToString,
  ServiceFormatStringLength,
} from '../services/formatter/string';

export const useFormatter = () => {
  const capitalizeFormatUndescoreString = (text: string): string => {
    const result = text
      .split('_') // pisahkan string berdasarkan karakter _
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // ubah setiap kata menjadi huruf kapital
      .join(' ');
    return result;
  };
  const capitalizeFirstLetter = (text: string): string => {
    const result = `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
    return result;
  };

  const capitalizeWord = (value: string): string => {
    return value.toUpperCase();
  };

  const formatNumberDecimal = (number: number, decimal?: number): number => {
    return ServiceFormatNumberDecimal(number, decimal);
  };

  const formatStringLength = (text: string, limit?: number): string => {
    return ServiceFormatStringLength(text, limit);
  };

  const formatQueryString = (params?: object): string => {
    return ServiceFormatQueryString(params);
  };

  const formatBulkId = (ids: ID[] | string[]): string => {
    return ServiceArrayStringToString(ids);
  };

  const formatFilenameLabel = (file: FileModel | Array<FileModel>): string => {
    return ServiceFormatFilenameLabel(file);
  };

  return {
    capitalizeFormatUndescoreString,
    capitalizeFirstLetter,
    capitalizeWord,
    formatNumberDecimal,
    formatStringLength,
    formatQueryString,
    formatBulkId,
    formatFilenameLabel
  };
};
