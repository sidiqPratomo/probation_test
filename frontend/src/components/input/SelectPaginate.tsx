import { useEffect, useState } from "react";
import { loadOptions } from "./select_options/loadOptions";
import { AsyncPaginate } from "react-select-async-paginate";
import { OptionModel } from "../../base_models";

interface SelectPaginateProps {
  label: string;
  debounceTimeout?: number;
  onChange?: (selectedOptions: OptionModel | null) => void;
  initialValue?: OptionModel | null | undefined;
}

export function SelectPaginate({
  label,
  debounceTimeout = 300,
  onChange,
  initialValue,
}: SelectPaginateProps) {
  const [value, setValue] = useState<OptionModel | null | undefined>(
    initialValue
  );

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (selectedOption: OptionModel | null) => {
    setValue(selectedOption);
    onChange && onChange(selectedOption);
  };

  return (
    <div className="mb-10 select_custom">
      <label htmlFor={label} className="form-label">
        {label}
      </label>
      <AsyncPaginate
        debounceTimeout={debounceTimeout}
        value={value}
        loadOptions={loadOptions}
        onChange={handleChange}
        isClearable={false}
      />
    </div>
  );
}
