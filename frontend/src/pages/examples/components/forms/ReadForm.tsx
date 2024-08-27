import { FC } from "react";
import { Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import { ReadModel } from "../../core/_models";
import { countryOptions, hobbyOptions } from "../../../../docs/data";
import {
  Checkbox,
  DatePicker,
  MultipleSelect,
  MultiUploadWithList,
  PhoneNumberInput,
  SingleSelect,
  SingleUploadImage,
  TranslatedInputNumber,
  TranslatedInputText,
} from "../../../../components";

interface Props {
  collection: string;
  readOnly?: boolean;
}

export const ReadForm: FC<Props> = ({ collection, readOnly = true }) => {
  const {
    formState: { errors },
    control,
  } = useFormContext<ReadModel>();

  return (
    <>
      <Controller
        name="name"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Name is required",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TranslatedInputText
            collection={collection}
            errorMessage={errors.name}
            fieldName="name"
            name="name"
            isRequired={true}
            value={value}
            onChange={(value: string) => {
              onChange(value);
            }}
            placeholder="Enter your name"
          />
        )}
      />

      <Controller
        name="nik"
        control={control}
        rules={{
          required: {
            value: true,
            message: "NIK is required",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TranslatedInputText
            disabled
            collection={collection}
            errorMessage={errors.nik}
            fieldName="nik"
            name="nik"
            isRequired={true}
            value={value}
            mask="0000 0000 0000 0000"
            onChange={(value: string) => {
              onChange(value);
            }}
            placeholder="e.g: xxxx xxxx xxxx xxxx"
          />
        )}
      />

      <Controller
        name="taxpayer_number"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Nomor NPWP is required",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TranslatedInputText
            disabled
            collection={collection}
            errorMessage={errors.nik}
            fieldName="taxpayer_number"
            name="taxpayer_number"
            isRequired={true}
            value={value}
            mask="99.999.999.9-999.999"
            onChange={(value: string) => {
              onChange(value);
            }}
            placeholder="e.g: xx.xxxx.xxx.x-xxx.xxx"
          />
        )}
      />

      {/* Input Number */}
      <Controller
        name="age"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Age is required",
          },
          min: {
            value: 1,
            message: "Age must greater than 0",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TranslatedInputNumber
            onChange={(event) => {
              onChange(event.target.value);
            }}
            disabled
            min={0}
            max={130}
            value={value}
            name="age"
            collection={collection}
            fieldName="age"
            step={1}
            placeholder="How old are you?"
            errorMessage={errors.age}
          />
        )}
      />

      {/* phone number */}
      <Controller
        name="phone"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Phone number is required",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <PhoneNumberInput
            value={value}
            label="Phone Number"
            disabled={readOnly}
            onChange={(val) => onChange(val)}
            isRequired
            errorMessage={errors.phone}
          />
        )}
      />

      {/* Date Picker */}
      <Controller
        name="dob"
        control={control}
        render={({ field: { value } }) => (
          <DatePicker
            isRequired
            label="Date of Birth"
            value={value}
            disabled={readOnly}
            options={{
              altInput: true,
              altFormat: "j F, Y",
              dateFormat: "Y-m-d",
            }}
          />
        )}
      />

      {/* Single Select */}
      <Controller
        control={control}
        name="citizen"
        render={({ field: { value } }) => (
          <SingleSelect
            options={countryOptions}
            label="Select Country"
            isRequired
            value={value}
            readOnly={readOnly}
          />
        )}
      />

      {/* Multi Select */}
      <Controller
        control={control}
        name="hobbies"
        render={({ field: { value } }) => (
          <MultipleSelect
            options={hobbyOptions}
            label="Favorite Hobbies"
            isRequired
            value={value}
            readOnly={readOnly}
          />
        )}
      />

      {/* Checkbox */}
      <Controller
        control={control}
        name="married_status"
        render={({ field: { value } }) => (
          <Checkbox
            label="Already Married?"
            disabled={readOnly}
            readOnly={readOnly}
            value={value}
            isRequired
          />
        )}
      />

      {/* Upload Image */}
      <Form.Group>
        <Form.Label>Profile Picture</Form.Label>
        <Controller
          control={control}
          name="profile_picture"
          render={({ field: { value } }) => (
            <SingleUploadImage
              label="Select Image"
              bucket="multiple"
              path="sagara"
              initialFiles={value}
              readOnly={readOnly}
            />
          )}
        />
      </Form.Group>

      {/* Multiple Upload */}
      <Controller
        control={control}
        name="supporting_document"
        render={({ field: { value } }) => (
          <MultiUploadWithList
            label="Supporting Document"
            bucket="multiple"
            path="sagara"
            isRequired
            initialFiles={value}
            readOnly={readOnly}
          />
        )}
      />
    </>
  );
};
