import { useEffect, useState } from "react"
import Select, { ActionMeta, SingleValue } from 'react-select'
import { SelectOption } from "../../../base_models/SelectOption"

type YearSelectProps = {
  label: string
  startYear?: number
  endYear?: number
  value: string
  onChange?: ((newValue: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => void) | undefined
  isDisabled?: boolean
}

export function YearSelect({
  label,
  startYear,
  endYear,
  value,
  onChange,
  isDisabled = false
}: YearSelectProps) {
  const [yearsData, setYearsData] = useState<SelectOption[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>(value)

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const start = startYear || currentYear - 2;
    const end = endYear || currentYear + 2;

    const yearOptions = [];

    for (let year = start; year <= end; year++) {
      yearOptions.push({
        label: year.toString(),
        value: year.toString()
      });
    }

    setYearsData(yearOptions);
  }, [startYear, endYear]);


  useEffect(() => {
    setSelectedYear(value)
  }, [value])


  return (
    <div className="mb-10">
      <label htmlFor={label} className="form-label">{label}</label>
      <Select
        isDisabled={isDisabled}
        className="react-select-styled"
        classNamePrefix="react-select"
        options={yearsData}
        isMulti={false}
        isSearchable={true}
        onChange={(newValue, actionMeta) => {
          setSelectedYear(newValue?.value || "")
          if (onChange) {
            onChange(newValue, actionMeta)
          }
        }}
        value={yearsData.find(c => c.value === selectedYear)}
      />
    </div>
  )
}
