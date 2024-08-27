import Select, { ActionMeta, SingleValue } from "react-select";
import { useEffect, useState } from "react";
import { SelectOption } from "../../../base_models";
import { Form } from "react-bootstrap";
import { FieldError } from "react-hook-form";
import ErrorField from "../ErrorField";

type SingleSelectProps = {
  label: string;
  isRequired?: boolean;
  options?: SelectOption[];
  closeMenuOnSelect?: boolean;
  changeHandler?:
    | ((
        newValue: SingleValue<SelectOption>,
        actionMeta: ActionMeta<SelectOption>
      ) => void)
    | undefined;
  value?: string;
  errorsMessage?: FieldError | undefined;
  readOnly?: boolean;
};

export function SingleSelect({
  label,
  isRequired = false,
  options = [],
  closeMenuOnSelect = true,
  changeHandler,
  value = "",
  errorsMessage,
  readOnly = false,
}: SingleSelectProps) {
  const [internalValue, setInternalValue] = useState<string>(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <Form.Group className="fv-row mb-4">
      <Form.Label
        className="d-flex align-items-center fs-5 fw-semibold mb-2 form-label"
        htmlFor={label}
      >
        {isRequired ? (
          <span className="required">{label}</span>
        ) : (
          <span>{label}</span>
        )}
        <i className="ms-2 fs-7" data-bs-toggle="tooltip" title={label}></i>
      </Form.Label>
      <Select
        isDisabled={readOnly}
        className="react-select-styled"
        classNamePrefix="react-select"
        options={options}
        isMulti={false}
        closeMenuOnSelect={closeMenuOnSelect}
        isSearchable={false}
        onChange={(newValue, actionMeta) => {
          setInternalValue(newValue?.value || "");
          if (changeHandler) {
            changeHandler(newValue, actionMeta);
          }
        }}
        value={options.find((c) => c.value === internalValue)}
      />
      {errorsMessage && <ErrorField errorsMessage={errorsMessage} />}
    </Form.Group>
  );
}
