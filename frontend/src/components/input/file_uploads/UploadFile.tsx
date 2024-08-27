import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import {
  FileConfigProps,
  FileModel,
  fileConfig,
  initFileModel,
} from '../../../base_models';
import { useFileUpload } from '../../../hooks/useFileUpload';
import { useFormatter } from '../../../hooks/useFormatter';

type UploadFileProps = {
  label: string;
  bucket?: string;
  path?: string;
  initialFile?: FileModel;
  onFileChange?: (file: FileModel) => void;
  rules?: {
    maxFileSize?: string;
  };
};

export function UploadFile({
  label,
  bucket = 'files',
  path = '',
  initialFile,
  onFileChange,
  rules = {},
}: UploadFileProps) {
  const uploadRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileData, setFileData] = useState<FileModel>({ ...initFileModel });
  const { singleUpload } = useFileUpload();
  const { formatFilenameLabel } = useFormatter();

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) {
      return false;
    }

    try {
      const [file] = files;
      const config: FileConfigProps = { ...fileConfig, bucket, path };
      const response = await singleUpload(file, config);
      const { data } = response.data;
      setFileData(data);
      const { current } = inputRef;
      if (current) {
        current.value = formatFilenameLabel(data);
      }
    } catch (error) {
      console.error('An error occurred while uploaded image: ', error);
    }
  };

  const openFileInput = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  useEffect(() => {
    if (onFileChange) {
      onFileChange(fileData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileData]);

  useEffect(() => {
    if (initialFile && inputRef.current && initialFile.filename !== '') {
      inputRef.current.defaultValue = initialFile.filename;
      setFileData(initialFile);
    }
  }, [initialFile]);

  const rulesInfo = () => {
    const { maxFileSize } = rules;
    if (maxFileSize) {
      return (
        <small className='text-muted px-4'>max file size: {maxFileSize}</small>
      );
    }
    return <></>;
  };

  return (
    <div className='mb-10'>
      <label className='form-label'>{label}</label>
      <Form.Control
        type='file'
        hidden={true}
        ref={uploadRef}
        onChange={handleFile}
      />
      <InputGroup className='upload'>
        <input
          className='form-control'
          type='text'
          ref={inputRef}
          disabled={true}
        />
        <Button
          variant='primary'
          onClick={(e) => {
            e.preventDefault();
            openFileInput();
          }}
        >
          <i className='bi bi-upload pe-0'></i>
        </Button>
        <span className="progress-upload d-none" style={{width: '100%'}}></span>
      </InputGroup>
      {rulesInfo()}
      <small className="fs-9 d-block mt-1">File size max 10MB</small>
    </div>
  );
}
