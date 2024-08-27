import { FC } from "react";
import { Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import { CreateModel } from "../../core/_models";
import { countryOptions, hobbyOptions } from "../../../../docs/data";
import { SelectOption } from "../../../../base_models";
import {
  Checkbox,
  DatePicker,
  MultipleSelect,
  MultiUploadWithList,
  SingleSelect,
  SingleUploadImage,
  TranslatedInputNumber,
  TranslatedInputText,
  PhoneNumberInput,
} from "../../../../components";

interface Props {
  collection: string;
  readOnly?: boolean;
}

export const CreateForm: FC<Props> = ({ collection, readOnly = false }) => {
  const {
    formState: { errors },
    control,
  } = useFormContext<CreateModel>();

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
            min={0}
            collection={collection}
            fieldName="age"
            max={130}
            value={value}
            name="age"
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
        rules={{
          required: {
            value: true,
            message: "Date of Birth is required",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            isRequired
            label="Date of Birth"
            placeholder="3 July, 2024"
            value={value || ""}
            errorsMessage={errors.dob}
            options={{
              altInput: true,
              altFormat: "j F, Y",
              dateFormat: "Y-m-d",
            }}
            onChange={(date) => {
              onChange(date);
            }}
          />
        )}
      />

      {/* Single Select */}
      <Controller
        control={control}
        name="citizen"
        rules={{
          required: {
            value: true,
            message: "Citizen is required",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <SingleSelect
            options={countryOptions}
            label="Select Country"
            isRequired
            value={value}
            changeHandler={(val: SelectOption | null) => {
              if (val) {
                onChange(val.value);
              }
            }}
            errorsMessage={errors.citizen}
          />
        )}
      />

      {/* Multi Select */}
      <Controller
        control={control}
        name="hobbies"
        rules={{
          required: {
            value: true,
            message: "Hobbies is required",
          },
          validate: (arrValues) => {
            return (
              (arrValues && arrValues.length > 1) ||
              "Choose hobbies more than 1"
            );
          },
        }}
        render={({ field: { onChange, value } }) => (
          <MultipleSelect
            options={hobbyOptions}
            label="Favorite Hobbies"
            isRequired
            errorsMessage={errors.hobbies}
            value={value}
            changeHandler={(val) => {
              const targetValue = val
                ? (val as SelectOption[]).map((option) => option.value)
                : [];
              onChange(targetValue);
            }}
          />
        )}
      />

      {/* Checkbox */}
      <Controller
        control={control}
        name="married_status"
        render={({ field: { onChange, value } }) => (
          <Checkbox
            label="Already Married?"
            value={value}
            onChange={(val) => {
              onChange(val);
            }}
          />
        )}
      />

      {/* Upload Image */}
      <Form.Group>
        <Form.Label>Profile Picture</Form.Label>
        <Controller
          control={control}
          name="profile_picture"
          render={({ field: { onChange, value } }) => (
            <SingleUploadImage
              label="Select Image"
              bucket="multiple"
              path="sagara"
              onFileChange={(file) => {
                onChange(file);
              }}
              initialFiles={value}
            />
          )}
        />
      </Form.Group>

      {/* Multiple Upload */}
      <Controller
        control={control}
        name="supporting_document"
        rules={{
          required: {
            value: true,
            message: "Supporting document is required",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <MultiUploadWithList
            label="Supporting Document"
            bucket="multiple"
            path="sagara"
            isRequired
            onFileChange={(files) => {
              onChange(files);
            }}
            initialFiles={value}
          />
        )}
      />
      {errors.supporting_document && (
        <span
          className="text-danger d-inline-block"
          style={{ fontSize: "0.95rem" }}
        >
          {errors.supporting_document.message}
        </span>
      )}
    </>
  );
};
