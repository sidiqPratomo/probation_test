import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import { BaseOptions } from "flatpickr/dist/types/options";
import { Form } from "react-bootstrap";
import { FieldError } from "react-hook-form";
import ErrorField from "../ErrorField";

interface DatePickerProps {
  onChange?: (date: string) => void;
  placeholder?: string;
  options?: Partial<BaseOptions>; // Flatpickr options
  label: string;
  value: string;
  disabled?: boolean;
  readOnly?: boolean;
  isRequired?: boolean;
  errorsMessage?: FieldError | undefined;
}

export function DatePicker({
  onChange,
  placeholder = "Pick date",
  options = {},
  label,
  value,
  disabled = false,
  readOnly = false,
  isRequired = false,
  errorsMessage,
}: DatePickerProps) {
  const [dateState, setDateState] = useState<Date | undefined>(undefined);

  const handleDateChange = (selectedDates: Date[]) => {
    if (selectedDates.length > 0) {
      const year = selectedDates[0].getFullYear();
      const month = (selectedDates[0].getMonth() + 1)
        .toString()
        .padStart(2, "0");
      const day = selectedDates[0].getDate().toString().padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      if (onChange) {
        onChange(formattedDate);
        setDateState(selectedDates[0]);
      }
    }
  };

  useEffect(() => {
    if (value !== "") {
      setDateState(new Date(value));
    }
  }, [value]);

  return (
    <Form.Group className="mb-4">
      {isRequired === true ? (
        <Form.Label className="required">{label}</Form.Label>
      ) : (
        <Form.Label>{label}</Form.Label>
      )}
      <Flatpickr
        value={dateState}
        onChange={handleDateChange}
        className="form-control form-date"
        placeholder={placeholder}
        options={options}
        aria-label={label}
        disabled={disabled}
        readOnly={readOnly}
      />
      {errorsMessage && <ErrorField errorsMessage={errorsMessage} />}
    </Form.Group>
  );
}
