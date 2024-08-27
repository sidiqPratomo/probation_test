import { Button, Form, Spinner } from "react-bootstrap";
import { FileConfigProps, FileModel, fileConfig } from "../../../base_models";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useFileUpload } from "../../../hooks/useFileUpload";
import { useFormatter } from "../../../hooks/useFormatter";
import { enqueueSnackbar } from "notistack";

type SingleUploadImageProps = {
  label: string;
  bucket?: string;
  path?: string;
  initialFiles?: FileModel | null;
  onFileChange?: (files: FileModel | null) => void;
  readOnly?: boolean;
};

export function SingleUploadImage({
  label,
  bucket = "files",
  path = "",
  initialFiles = null,
  onFileChange,
  readOnly = false,
}: SingleUploadImageProps) {
  const uploadRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [filesData, setFilesData] = useState<FileModel | null>(initialFiles);

  const { singleUpload, staticUrl, progress, isUploading } = useFileUpload();
  const { formatFilenameLabel } = useFormatter();

  const openFileInput = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return;

    try {
      const config: FileConfigProps = { ...fileConfig, bucket, path };
      const response = await singleUpload(files[0], config);
      const result = response.data.data as unknown as FileModel;

      setFilesData(result);
      if (inputRef.current) {
        inputRef.current.value = formatFilenameLabel(result);
      }
      if (onFileChange) {
        onFileChange(result);
      }
    } catch (error) {
      console.error("An error occurred while uploading image: ", error);
      enqueueSnackbar({
        variant: "error",
        message: "Failed to upload image, please try again",
        autoHideDuration: 5000,
      });
    }
  };

  useEffect(() => {
    if (initialFiles !== null) {
      setFilesData(initialFiles);
    }
  }, [initialFiles]);

  return (
    <div className="mb-4">
      <div className="single_upload-image">
        {!readOnly && (
          <Form.Label htmlFor={label}>
            <Form.Control
              type="file"
              hidden={true}
              ref={uploadRef}
              onChange={handleFile}
              accept="image/*"
            />
            <Button
              variant="white"
              className="upload"
              disabled={isUploading}
              onClick={(e) => {
                e.preventDefault();
                openFileInput();
              }}
            >
              {isUploading ? (
                <Spinner animation="border" variant="dark" size="sm" />
              ) : (
                <i className="bi bi-upload pe-0"></i>
              )}
              {isUploading ? (
                <small>Uploading: {progress}%</small>
              ) : (
                <small>{label}</small>
              )}

              {isUploading && (
                <span
                  className="progress-upload"
                  style={{ width: `${progress}%` }}
                ></span>
              )}
            </Button>
          </Form.Label>
        )}
        {filesData && (
          <div className="position-relative" key={`img-${filesData.filename}`}>
            <div>
              <img src={staticUrl(filesData)} alt={filesData.filename} />
              {!readOnly && (
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    openFileInput();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-pencil"></i>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
      <small className="fs-9 d-block">File size max 10MB</small>
    </div>
  );
}
