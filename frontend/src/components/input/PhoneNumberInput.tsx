import { Form } from "react-bootstrap";
import PhoneInput from "react-country-phone-input";
import id from "react-country-phone-input/lang/id.json";
import "react-country-phone-input/lib/style.css";
import { FieldError } from "react-hook-form";
import ErrorField from "./ErrorField";

export type PhoneNumberInputProps = {
  value: string;
  onChange: (phone: string) => void;
  placeholder?: string;
  defaultCountry?: string;
  label: string;
  isRequired?: boolean;
  enableSearch?: boolean;
  autoFormat?: boolean;
  errorMessage?: FieldError | undefined;
  disabled?: boolean;
};

export function PhoneNumberInput({
  value,
  label,
  onChange,
  placeholder = "Input your phone number",
  defaultCountry = "id",
  isRequired = false,
  enableSearch = false,
  autoFormat = true,
  disabled = false,
  errorMessage,
}: PhoneNumberInputProps) {
  const handleChange = (phone: string) => {
    onChange(phone);
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {label}
        {isRequired && <sup className="text-danger">*</sup>}
      </Form.Label>
      <PhoneInput
        disabled={disabled}
        specialLabel="Custom Phone"
        country={defaultCountry}
        localization={id}
        placeholder={placeholder}
        autoFormat={autoFormat}
        enableSearch={enableSearch}
        value={value ? value : ""}
        onChange={handleChange}
      />
      {errorMessage && <ErrorField errorsMessage={errorMessage} />}
    </Form.Group>
  );
}
