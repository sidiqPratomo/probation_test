import AsyncSelect from 'react-select/async';
import { MultiValue, ActionMeta } from 'react-select';
import { SelectOption } from '../../../base_models';

type LazyMultiSelectProps = {
  label: string;
  isRequired?: boolean;
  options?: SelectOption[]
  closeMenuAfterSelect?: boolean
  isSearchable?: boolean
  value?: string[]
  changeHandler?: ((newValue: MultiValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => void) | undefined
}

export function LazyMultiSelect({
  label,
  isRequired = false,
  options = [],
  closeMenuAfterSelect = true,
  changeHandler,
  value = []
}: LazyMultiSelectProps) {
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
        isMulti={true}
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        closeMenuOnSelect={closeMenuAfterSelect}
        onChange={changeHandler}
        value={options.filter(option => value.includes(option.value))}
      />
    </div>
  );
}
