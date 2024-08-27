import { ChangeEvent } from "react";
import { FieldError } from "react-hook-form";
import ErrorField from "./ErrorField";
import { Form } from "react-bootstrap";

type CheckboxProps = {
  label: string;
  value?: boolean; // Use 'value' instead of 'defaultValue'
  onChange?: (isChecked: boolean) => void; // 'onChange' should always have a boolean value
  disabled?: boolean;
  isRequired?: boolean;
  errorsMessage?: FieldError | undefined;
  readOnly?: boolean;
};

export function Checkbox({
  label,
  value = false, // Initialize 'value' as false
  disabled = false,
  onChange,
  isRequired = false,
  errorsMessage,
  readOnly = false,
}: CheckboxProps) {
  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.checked;
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <div className="mb-4">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={value}
          onChange={handleCheck}
          disabled={disabled}
          readOnly={readOnly}
        />
        {isRequired ? (
          <Form.Label className="required">{label}</Form.Label>
        ) : (
          <Form.Label>{label}</Form.Label>
        )}
      </div>
      {errorsMessage && <ErrorField errorsMessage={errorsMessage} />}
    </div>
  );
}
