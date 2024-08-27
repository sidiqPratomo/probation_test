import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FieldError, Merge } from "react-hook-form";
import Select, { ActionMeta, MultiValue } from "react-select";

type SelectOption = {
  value: string;
  label: string;
};

type MultipleSelectProps = {
  label: string;
  isRequired?: boolean;
  options: SelectOption[];
  closeMenuOnSelect?: boolean;
  changeHandler?: (
    newValue: MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>
  ) => void;
  value?: string[];
  errorsMessage?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
  readOnly?: boolean;
};

export function MultipleSelect({
  label,
  isRequired = false,
  options,
  closeMenuOnSelect = false,
  changeHandler,
  value = [],
  errorsMessage,
  readOnly = false,
}: MultipleSelectProps) {
  const [internalValue, setInternalValue] = useState<string[]>([]);

  useEffect(() => {
    if (value.length > 0) {
      setInternalValue(value);
    }
  }, [value]);

  return (
    <>
      <Form.Group className="fv-row mb-4">
        <Form.Label
          className={`d-flex align-items-center fs-5 fw-semibold mb-2 ${
            isRequired ? "required" : ""
          }`}
          htmlFor={label}
        >
          {label}
        </Form.Label>
        <Select
          className="react-select-styled"
          classNamePrefix="react-select"
          options={options}
          isMulti={true}
          isDisabled={readOnly}
          closeMenuOnSelect={closeMenuOnSelect}
          isSearchable={false}
          onChange={(newValue, actionMeta) => {
            setInternalValue(newValue.map((v) => v.value || "")); // Update internalValue on change
            if (changeHandler) {
              changeHandler(newValue, actionMeta);
            }
          }}
          value={options.filter((option) =>
            internalValue.includes(option.value)
          )}
        />
        {errorsMessage && (
          <span
            className="text-danger d-inline-block"
            style={{ fontSize: "0.95rem", marginTop: "0.5rem" }}
          >
            {errorsMessage && errorsMessage.message}
          </span>
        )}
      </Form.Group>
    </>
  );
}
