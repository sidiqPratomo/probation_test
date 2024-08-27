import { Button, Form, InputGroup } from 'react-bootstrap';
import { FileConfigProps, FileModel, fileConfig } from '../../../base_models';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useFileUpload } from '../../../hooks/useFileUpload';
import { useFormatter } from '../../../hooks/useFormatter';

type MultiUploadFilesProps = {
  label: string;
  bucket?: string;
  path?: string;
  initialFiles?: FileModel[];
  onFileChange?: (files: FileModel[]) => void;
};

export function MultiUploadFiles({
  label,
  bucket = 'files',
  path = '',
  initialFiles,
  onFileChange,
}: MultiUploadFilesProps) {
  const uploadRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [filesData, setFilesData] = useState<FileModel[]>([]);
  const { multipleUpload } = useFileUpload();
  const { formatFilenameLabel } = useFormatter();

  const openFileInput = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) {
      return false;
    }

    try {
      const config: FileConfigProps = { ...fileConfig, bucket, path };
      const response = await multipleUpload(files, config);
      const { data } = response.data;
      setFilesData(data);
      const { current } = inputRef;
      if (current) {
        current.value = formatFilenameLabel(data);
      }
    } catch (error) {
      console.error('An error occurred while uploaded image: ', error);
    }
  };

  useEffect(() => {
    if (onFileChange) {
      onFileChange(filesData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesData]);

  useEffect(() => {
    if (initialFiles && initialFiles.length > 0 && inputRef.current) {
      const uploadedFilesName = initialFiles
        .map((entry) => entry.filename)
        .join(', ');
      inputRef.current.value = uploadedFilesName;
      setFilesData(initialFiles);
    }
  }, [initialFiles]);

  return (
    <div className='mb-10'>
      <label htmlFor={label} className='form-label'>
        {label}
      </label>
      <Form.Control
        type='file'
        hidden={true}
        ref={uploadRef}
        multiple={true}
        onChange={handleFile}
      />
      <InputGroup className='upload'>
        <input
          className='form-control form-control-solid'
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
      <small className="fs-9 d-block mt-1">File size max 10MB</small>
    </div>
  );
}
