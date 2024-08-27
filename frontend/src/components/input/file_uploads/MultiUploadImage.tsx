import { Button, Form } from 'react-bootstrap';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  FileConfigProps,
  FileModel,
  fileConfig,
} from '../../../base_models/FileModel';
import { useFileUpload } from '../../../hooks/useFileUpload';
import { useFormatter } from '../../../hooks/useFormatter';

type MultiUploadImageProps = {
  label: string;
  bucket?: string;
  path?: string;
  initialFiles?: FileModel[];
  onFileChange?: (files: FileModel[]) => void;
};

export function MultiUploadImage({
  label,
  bucket = 'files',
  path = '',
  initialFiles,
  onFileChange,
}: MultiUploadImageProps) {
  const uploadRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [filesData, setFilesData] = useState<FileModel[]>([]);
  const { multipleUpload, staticUrl } = useFileUpload();
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

  const removeImage = (selectedIndex: number) => {
    const files = filesData.filter((_, index) => index !== selectedIndex);
    setFilesData(files);
  };

  return (
    <div className='mb-10'>
      <div className='multi_upload-image'>
        <label htmlFor={label}>
          <Form.Control
            type='file'
            hidden={true}
            ref={uploadRef}
            multiple={true}
            onChange={handleFile}
            accept='image/*'
          />
          <Button
            variant='white'
            className='upload'
            onClick={(e) => {
              e.preventDefault();
              openFileInput();
            }}
          >
            <i className='bi bi-upload mb-1'></i>
            <small>{label}</small>
            <span className="progress-upload d-none" style={{width: '100%'}}></span>
          </Button>
        </label>
        {filesData.map((file, index) => {
          const { originalFilename } = file;
          return (
            <div className='position-relative' key={`img-${index}`}>
              <div>
                <img src={staticUrl(file)} alt={originalFilename} />
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    removeImage(index);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <i className='bi bi-x'></i>
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <small className="fs-9 d-block mt-1">File size max 10MB</small>
    </div>
  );
}
