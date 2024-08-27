import React, { ReactNode, useState } from "react";
import { Form } from "react-bootstrap";
import { FieldError } from "react-hook-form";
import ErrorField from "./ErrorField";

export type InputNumberProps = {
  label: string | ReactNode;
  isRequired?: boolean;
  name: string;
  value?: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  errorMessage?: FieldError | undefined;
  disabled?: boolean;
};

export default function InputNumber({
  label,
  isRequired = false,
  name,
  value: propValue,
  onChange,
  min,
  max,
  step,
  placeholder,
  errorMessage = undefined,
  disabled = false,
}: InputNumberProps) {
  const [internalValue, setInternalValue] = useState<number | string>(
    propValue || ""
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (max !== undefined && parseFloat(newValue) > max) {
      newValue = max.toString();
    }

    if (onChange) {
      e.target.value = newValue;
      onChange(e);
    } else {
      setInternalValue(newValue);
    }
  };

  const displayValue = onChange
    ? propValue !== undefined && propValue !== null
      ? propValue.toString()
      : ""
    : internalValue;

  return (
    <Form.Group className="mb-4" controlId={`form-${name}`}>
      {isRequired ? (
        <Form.Label>
          {label}
          <sup className="text-danger">*</sup>
        </Form.Label>
      ) : (
        <Form.Label>{label}</Form.Label>
      )}
      <Form.Control
        type="number"
        name={name}
        value={displayValue}
        onChange={handleChange}
        onWheel={(e) => (e.target as HTMLInputElement).blur()}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        placeholder={placeholder}
        required={isRequired}
      />
      {errorMessage && <ErrorField errorsMessage={errorMessage} />}
    </Form.Group>
  );
}
