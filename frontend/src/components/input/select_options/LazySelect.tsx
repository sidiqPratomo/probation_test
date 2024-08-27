import AsyncSelect from 'react-select/async';
import { SingleValue, ActionMeta } from 'react-select';
import { useEffect, useState } from 'react';
import { SelectOption } from '../../../base_models';

type LazySelectProps = {
  label: string;
  isRequired?: boolean;
  options?: SelectOption[]
  closeMenuAfterSelect?: boolean
  isSearchable?: boolean
  changeHandler?: ((newValue: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => void) | undefined
  value?: string
}

export function LazySelect({
  label,
  isRequired = false,
  options = [],
  closeMenuAfterSelect = true,
  changeHandler,
  value = ''
}: LazySelectProps) {

  const [internalValue, setInternalValue] = useState<string>(value)

  const filterColors = (inputValue: string) => {
    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<SelectOption[]>((resolve, reject) => {
      setTimeout(() => {
        try {
          const filteredOptions = filterColors(inputValue);
          resolve(filteredOptions);
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });

  useEffect(() => {
    // Update internalValue when externalValue changes
    setInternalValue(value);
  }, [value]);

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
        className='react-select-styled' 
        classNamePrefix='react-select' 
        isMulti={false}
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        onChange={(newValue, actionMeta) => {
          setInternalValue(newValue?.value || ''); // Update internalValue on change
          if (changeHandler) {
            changeHandler(newValue, actionMeta);
          }
        }}
        closeMenuOnSelect={closeMenuAfterSelect}
        value={options.find(c => c.value === internalValue)}
      />
    </div>
  );
}
