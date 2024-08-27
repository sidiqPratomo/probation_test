import Flatpickr from 'react-flatpickr'
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect'
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/plugins/monthSelect/style.css";
import { useState } from 'react';

type MonthYearPickerProps = {
  label: string
  onChange?: (value: string) => void
  placeholder?: string
  value: string
  disabled?: boolean
}

export function MonthYearPicker({
  label,
  onChange,
  placeholder = "Pick Month & Years",
  disabled = false,
  value
}: MonthYearPickerProps,
) {
  const [dateState, setDateState] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  )

  const handleDateChange = (value: Date[]) => {
    if (value.length > 0) {
      const year = value[0].getFullYear();
      const month = (value[0].getMonth() + 1).toString().padStart(2, '0');
      const format = `${year}-${month}`;

      if (onChange) {
        onChange(format);
        setDateState(value[0])
      }
    }
  }

  return (
    <div className="mb-10">
      <label
        htmlFor={`${label}_month_year`}
        className='form-label'
      >
        {label}
      </label>
      <Flatpickr
        value={dateState}
        className="form-control"
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleDateChange}
        options={{
          plugins: [
            monthSelectPlugin({
              shorthand: true,
              dateFormat: "Y-m",
              altFormat: "Y-m",
              theme: "light"
            })]
        }}
      />
    </div>
  )
}

