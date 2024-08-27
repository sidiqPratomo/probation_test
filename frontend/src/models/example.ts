import { FileModel } from "../base_models";

export interface ExampleModel {
  name: string;
  nik: string;
  dob: string;
  phone: string;
  age: number;
  taxpayer_number: string;
  citizen: string;
  hobbies: string[];
  married_status: boolean;
  profile_picture: FileModel | undefined;
  supporting_document: FileModel[];
}
