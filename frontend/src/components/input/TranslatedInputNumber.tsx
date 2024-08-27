import React from "react";
import InputNumber, { InputNumberProps } from "./InputNumber";
import { FormFieldTranslationLabel } from "../label/FormFieldTranslationLabel";

interface TranslatedInputNumberProps extends Omit<InputNumberProps, "label"> {
  collection: string;
  fieldName: string;
}

export function TranslatedInputNumber({
  collection,
  fieldName,
  ...rest
}: TranslatedInputNumberProps) {
  return (
    <InputNumber
      label={
        <FormFieldTranslationLabel collection={collection} name={fieldName} />
      }
      {...rest}
    />
  );
}
