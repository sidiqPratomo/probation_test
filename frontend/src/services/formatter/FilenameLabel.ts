import { FileModel } from '../../base_models';

export const ServiceFormatFilenameLabel = (
  file: FileModel | Array<FileModel>
): string => {
  if (Array.isArray(file)) {
    return file
      .map(({ originalFilename, filename }) =>
        originalFilename ? originalFilename : filename
      )
      .join(', ');
  }

  const { originalFilename, filename } = file;
  if (originalFilename) {
    return originalFilename;
  }

  if (filename) {
    return filename;
  }

  return '-';
};
