export type FileModel = {
  bucket: string;
  filename: string;
  mime: string;
  path: string;
  originalFilename?: string;
  token?: string;
};

export interface FileConfigProps {
  bucket: string;
  path?: string;
}

export const fileConfig: FileConfigProps = {
  bucket: 'files',
};

export const initFileModel: FileModel = {
  bucket: 'files',
  filename: '',
  mime: '',
  path: '',
  originalFilename: '',
};
