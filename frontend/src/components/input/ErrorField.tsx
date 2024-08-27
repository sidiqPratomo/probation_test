import { FC } from "react";
import { FieldError } from "react-hook-form";

type ErrorFieldProps = {
  errorsMessage?: FieldError | undefined;
};

const ErrorField: FC<ErrorFieldProps> = ({ errorsMessage }) => {
  return (
    <span
      className="text-danger d-inline-block"
      style={{ fontSize: "0.95rem", marginTop: "0.5rem" }}
    >
      {errorsMessage && errorsMessage.message}
    </span>
  );
};

export default ErrorField;
