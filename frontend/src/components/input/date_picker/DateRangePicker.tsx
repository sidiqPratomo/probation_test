import React, { useEffect, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import { BaseOptions } from 'flatpickr/dist/types/options'

interface DateRangePickerProps {
  onChange?: (startDate: string, endDate: string) => void;
  placeholder?: string;
  options?: Partial<BaseOptions>; // Flatpickr options
  label: string
  disabled?: boolean
  value: {
    start: string
    end: string
  }
}

export function DateRangePicker({
  onChange,
  placeholder = 'Pict date',
  options: UserOptions = {},
  label,
  disabled = false,
  value
}: DateRangePickerProps) {

  const [dateState, setDateState] = useState<Date[]>([]);
  
  const handleDateChange = (selectedDates: Date[]) => {
    if (selectedDates.length > 0) {
      const [startDate, endDate] = selectedDates
      
      if (startDate && endDate) {
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
  
        if (onChange) {
          onChange(formattedStartDate, formattedEndDate);
          setDateState([startDate, endDate])
        }
      }
    }
  }

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const defaultOptions: Partial<BaseOptions> = {
    mode: 'range',
  };

  const finalOptions: Partial<BaseOptions> = {
    ...defaultOptions,
    ...UserOptions,
  };

  useEffect(() => {
    // Convert the string dates to Date objects when the component mounts
    if (value.start && value.end) {
      const startDate = new Date(value.start)
      const endDate = new Date(value.end)
      setDateState([startDate, endDate]);
    }
  }, [value]);

  return (
    <div className="mb-10">
    <label htmlFor={label} className="form-label">{label}</label>
    <Flatpickr
      value={dateState}
      onChange={handleDateChange}
      options={finalOptions}
      className='form-control form-date'
      placeholder={placeholder}
      disabled={disabled}
    />
  </div>
  )
}