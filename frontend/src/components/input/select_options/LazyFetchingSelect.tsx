import { debounce } from 'lodash';
import { useCallback } from 'react';
import { ActionMeta, SingleValue } from 'react-select';
import AsyncSelect from 'react-select/async';
import { SelectOption } from '../../../base_models';

interface ProductData {
  id: number;
  title: string;
}

type LazyFetchingSelectProps = {
  label: string
  isRequired?: boolean
  changeHandler?: ((newValue: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => void) | undefined
}

export function LazyFetchingSelect({
  label,
  isRequired = false,
  changeHandler
}: LazyFetchingSelectProps) {
  const mapResponseToValuesAndLabels = (data: ProductData): { value: number; label: string } => ({
    value: data.id,
    label: data.title,
  });

  const callApi = async (value: string): Promise<{ value: number; label: string }[]> => {
    try {
      const apiUrl =
        value.trim() === ''
          ? 'https://dummyjson.com/products/search?q=&limit=10&skip=0'
          : `https://dummyjson.com/products/search?q=${encodeURIComponent(value)}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Error while fetching data: ${response.status}`);
      }

      const responseData = await response.json();
      const productArray: ProductData[] = responseData.products;
      const finalData = productArray
        .map(mapResponseToValuesAndLabels)
        .filter((i) => i.label.toLowerCase().includes(value.toLowerCase()));

      return finalData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadOptions = useCallback(
    debounce((inputText, callback) => {
      callApi(inputText).then((option) => callback(option))
    }, 1000),
    []
  );

  return (
    <div className='lazy-select fv-row mb-10'>
      <label className='d-flex align-items-center fs-5 fw-semibold mb-2 form-label' htmlFor={label}>
        {isRequired ? <span className="required">{label}</span> : <span>{label}</span>}
        <i
          className='ms-2 fs-7'
          data-bs-toggle='tooltip'
          title={label}
        ></i>
      </label>
      <AsyncSelect 
        cacheOptions
        loadOptions={loadOptions}
        onChange={changeHandler}
        defaultOptions
        isMulti={false}
        value={{
          value: "5",
          label: "Huawei P30"
      }}
      />
    </div>
  );
}