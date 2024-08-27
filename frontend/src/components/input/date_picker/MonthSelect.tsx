import { ActionMeta, SingleValue } from "react-select";
import { SelectOption } from "../../../base_models";
import { useEffect, useState } from "react";
import Select from 'react-select'
import { monthOptions } from "../../../docs/data";

type MonthSelectProps = {
  label: string;
  onChange?: ((newValue: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => void) | undefined
  value?: string
  isDisabled?: boolean
}

export function MonthSelect({
  label,
  onChange,
  value = '',
  isDisabled = false
}: MonthSelectProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>(value)

  useEffect(() => {
    setSelectedMonth(value)
  }, [value])


  return (
    <div className="mb-10">
      <label className="form-label" htmlFor={label}>{label}</label>
      <Select
        className="react-select-styled"
        classNamePrefix='react-select'
        options={monthOptions}
        isMulti={false}
        isSearchable={true}
        closeMenuOnSelect={true}
        onChange={(newValue, actionMeta) => {
          setSelectedMonth(newValue?.value || "")
          if (onChange) {
            onChange(newValue, actionMeta)
          }
        }}
        isDisabled={isDisabled}
        value={monthOptions.find(c => c.value === selectedMonth)}
      />
    </div>
  )
}
