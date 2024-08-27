import { ExampleModel } from "../../../models/example";

export type CreateModel = ExampleModel;
export type ReadModel = ExampleModel;
export type UpdateModel = ExampleModel;
export type DeleteModel = ExampleModel;
export type ListModel = ExampleModel;

export const initialExampleModel: ExampleModel = {
  nik: "",
  name: "",
  hobbies: [],
  citizen: "",
  phone: "",
  age: 0,
  taxpayer_number: "",
  dob: "",
  married_status: false,
  profile_picture: undefined,
  supporting_document: [],
};

export const Collection = "examples";

export const initialValueAddModel = { ...initialExampleModel };
export const initialValueReadModel = { ...initialExampleModel };
export const initialValueUpdateModel = { ...initialExampleModel };
