import { useEffect, useState } from 'react';
import { OptionModel } from '../../../base_models/OptionModel';
import { AsyncPaginate } from 'react-select-async-paginate';
import { useLoadOptions } from '../../../hooks/useLoadOptions';

interface SelectReferenceProps {
  label: string;
  collection: string;
  keyLabel: string;
  keyValue: string;
  debounceTimeout?: number;
  onChange?: (selected: string) => void;
  params?: Record<string, any>;
  deps?: any;
  initialValue: string;
}

export function SelectReference({
  label,
  collection,
  keyLabel,
  keyValue,
  onChange,
  debounceTimeout = 300,
  params = {},
  deps,
  initialValue = '',
}: SelectReferenceProps) {
  const { sleepLoadOption, loadOptions, getOptionSelected } = useLoadOptions();
  const [internalValue, setInternalValue] = useState<
    OptionModel | null | undefined
  >(null);

  const options = async () => {
    sleepLoadOption();
    try {
      const skipLimit = {
        '!skip': 0,
        '!limit': 1000,
      };

      const options: OptionModel[] = await loadOptions(collection, {
        ...params,
        ...skipLimit,
      });

      return {
        options,
      };
    } catch (err) {
      console.error('Error while fetching data from API:', err);
      return {
        options: [],
        hasMore: false,
      };
    }
  };

  const handleChange = (selected: OptionModel | null) => {
    if (selected) {
      setInternalValue(selected);
      onChange && onChange(selected?.value.toString());
    }
  };

  useEffect(() => {
    setInternalValue(null);
  }, [deps]);

  useEffect(() => {
    if (initialValue) {
      const fetchDetail = async () => {
        try {
          const response = await getOptionSelected(collection, initialValue);
          setInternalValue(response);
        } catch (e) {
          console.error('error while fetching default value:', e);
        }
      };

      fetchDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection, initialValue, keyLabel, keyValue]);

  return (
    <div className='mb-10 select_custom'>
      <label className='form-label' htmlFor={label}>
        {label}
      </label>
      <AsyncPaginate
        debounceTimeout={debounceTimeout}
        value={internalValue}
        loadOptions={options}
        isClearable={false}
        onChange={handleChange}
        cacheUniqs={[deps]}
      />
    </div>
  );
}
