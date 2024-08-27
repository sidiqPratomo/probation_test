import React, { useState, ReactNode } from "react";
import { Form } from "react-bootstrap";
import { FieldError } from "react-hook-form";
import ErrorField from "./ErrorField";

export type InputTextProps = {
  label: string | ReactNode;
  isRequired?: boolean;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  type?: "text" | "email" | "password";
  mask?: string;
  errorMessage?: FieldError | undefined;
  disabled?: boolean;
};

function applyMask(value: string, mask: string): string {
  let result = "";
  let valueIndex = 0;
  for (let i = 0; i < mask.length && valueIndex < value.length; i++) {
    if (mask[i] === "9" || mask[i] === "0") {
      if (/\d/.test(value[valueIndex])) {
        result += value[valueIndex];
        valueIndex++;
      } else {
        valueIndex++;
        i--;
      }
    } else {
      result += mask[i];
      if (value[valueIndex] === mask[i]) {
        valueIndex++;
      }
    }
  }
  return result;
}

export default function InputText({
  label,
  isRequired = false,
  name,
  value: propValue,
  onChange,
  placeholder,
  maxLength,
  type = "text",
  mask,
  errorMessage,
  disabled = false,
}: InputTextProps) {
  const [internalValue, setInternalValue] = useState<string>(propValue || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (mask) {
      const unmaskedValue = newValue.replace(/[^0-9]/g, "");
      if (onChange) {
        onChange(unmaskedValue);
      } else {
        setInternalValue(unmaskedValue);
      }
    } else {
      if (onChange) {
        onChange(newValue);
      } else {
        setInternalValue(newValue);
      }
    }
  };

  const displayValue = mask
    ? applyMask(onChange ? propValue || "" : internalValue, mask)
    : onChange
    ? propValue
    : internalValue;

  return (
    <Form.Group className="mb-3" controlId={`form-${name}`}>
      <Form.Label>
        {label}
        {isRequired && <sup className="text-danger">*</sup>}
      </Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder || mask}
        maxLength={maxLength || (mask ? mask.length : undefined)}
        required={isRequired}
        disabled={disabled}
      />
      {errorMessage && <ErrorField errorsMessage={errorMessage} />}
    </Form.Group>
  );
}
