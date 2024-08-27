import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { FileConfigProps, FileModel, fileConfig } from "../../../base_models";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useFileUpload } from "../../../hooks/useFileUpload";
import { useFormatter } from "../../../hooks/useFormatter";
import { enqueueSnackbar } from "notistack";

type MultiUploadWithListProps = {
  label: string;
  bucket?: string;
  path?: string;
  initialFiles?: FileModel[];
  onFileChange?: (files: FileModel[]) => void;
  isRequired?: boolean;
  readOnly?: boolean;
};

export function MultiUploadWithList({
  label,
  bucket = "files",
  path = "",
  initialFiles,
  onFileChange,
  isRequired = false,
  readOnly = false,
}: MultiUploadWithListProps) {
  const uploadRef = useRef<HTMLInputElement>(null);
  const [filesData, setFilesData] = useState<FileModel[]>([]);
  const { multipleUpload, staticUrl, progress, isUploading } = useFileUpload();
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
      let result: FileModel[];
      if (Array.isArray(response.data.data)) {
        result = response.data.data as FileModel[];
      } else {
        result = [response.data.data as FileModel];
      }

      const updatedFilesData = [...filesData, ...result];

      setFilesData(updatedFilesData);
      if (onFileChange) {
        onFileChange(updatedFilesData); // Notify parent about all files including new and existing
      }
    } catch (error) {
      console.error("An error occurred while uploaded image: ", error);
      enqueueSnackbar({
        variant: "error",
        message: "Failed to upload file, please try again",
        autoHideDuration: 5000,
      });
    }
  };

  // Initialize state with initialFiles when component mounts
  useEffect(() => {
    if (initialFiles) {
      setFilesData(initialFiles);
    }
  }, [initialFiles]);

  const handleDelete = (filename: string) => {
    const isConfirmed = window.confirm(
      "Are you sure want to delete this file?"
    );

    if (isConfirmed) {
      const updatedFilesData = filesData.filter(
        (file) => file.filename !== filename
      );
      setFilesData(updatedFilesData);

      if (onFileChange) {
        onFileChange(updatedFilesData);
      }
    }
  };

  return (
    <div className="mb-4">
      {isRequired ? (
        <Form.Label htmlFor={label} className="required">
          {label}
        </Form.Label>
      ) : (
        <Form.Label htmlFor={label}>{label}</Form.Label>
      )}
      <Form.Control
        type="file"
        hidden={true}
        ref={uploadRef}
        multiple={true}
        onChange={handleFile}
        disabled={readOnly}
      />
      <InputGroup className="upload">
        <input
          className="form-control"
          placeholder={
            isUploading ? `Uploading: ${progress}%` : `Upload files here...`
          }
          type="text"
          disabled={true}
        />
        <Button
          variant="primary"
          disabled={isUploading}
          onClick={(e) => {
            e.preventDefault();
            openFileInput();
          }}
        >
          {isUploading ? (
            <Spinner animation="border" variant="secondary" size="sm" />
          ) : (
            <i className="bi bi-upload pe-0"></i>
          )}
        </Button>
        {isUploading && (
          <span
            className="progress-upload"
            style={{ width: `${progress}%` }}
          ></span>
        )}
      </InputGroup>
      <small className="fs-9 d-block mt-1">File size max 10MB</small>

      <div className="d-flex flex-column gap-2 pt-3">
        {filesData &&
          filesData.length > 0 &&
          filesData.map((file, index) => (
            <div
              key={index}
              className="d-flex align-items-center justify-content-between"
            >
              {formatFilenameLabel(file)}
              {!readOnly ? (
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => handleDelete(file.filename)}
                ></button>
              ) : (
                <a
                  href={staticUrl(file)}
                  target="_blank"
                  className="btn btn-icon btn-sm"
                >
                  <i className="fas fa-download"></i>
                </a>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
