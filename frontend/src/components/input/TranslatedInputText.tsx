import React from "react";
import InputText, { InputTextProps } from "./InputText";
import { FormFieldTranslationLabel } from "../label/FormFieldTranslationLabel";

interface TranslatedInputTextProps extends Omit<InputTextProps, "label"> {
  collection: string;
  fieldName: string;
}

export function TranslatedInputText({
  collection,
  fieldName,
  ...rest
}: TranslatedInputTextProps) {
  return (
    <InputText
      label={
        <FormFieldTranslationLabel collection={collection} name={fieldName} />
      }
      {...rest}
    />
  );
}
