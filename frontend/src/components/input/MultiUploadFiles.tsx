import { Button, Form, InputGroup } from "react-bootstrap"
import { FileResponse } from "../../types"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import axios from "axios"

type MultiUploadFilesProps = {
  label: string
  bucket?: string
  path?: string
  initialFiles?: FileResponse[]
  onFileChange?: (files: FileResponse[]) => void
}

export function MultiUploadFiles({
  label,
  bucket = 'files',
  path = "",
  initialFiles,
  onFileChange,
}: MultiUploadFilesProps) {
  const baseURL = import.meta.env.VITE_APP_API_URL || ''
  const mediaBaseURL = `${baseURL}/file/upload`
  const uploadRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [filesData, setFilesData] = useState<FileResponse[]>([]);

  const openFileInput = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  }

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return false;
    }
    const files = Array.from(event.target.files)

    const data = new FormData();

    files.forEach((file) => {
      data.append('file[]', file);
    });

    data.append('bucket', bucket);
    if (path !== "") {
      data.append('path', path);
    }

    try {
      const res = await axios.post(`${mediaBaseURL}`, data, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      if (res.status === 200) {
        const result = res.data.data as FileResponse[];
        setFilesData(prevFiles => [...prevFiles, ...result])
        if (inputRef.current) {
          const uploadedFilesName = result.map(res => res.filename).join(', ');
          inputRef.current.value = uploadedFilesName;
        }
      } else {
        console.error('An unexpected errors while uploading files', res.status);
      }
    } catch (error) {
      console.error('An error occurred while upload files', error);
    }
  }

  useEffect(() => {
    if (onFileChange) {
      onFileChange(filesData)
    }
  }, [filesData, onFileChange]);

  useEffect(() => {
    if (initialFiles && initialFiles.length > 0 && inputRef.current) {
      const uploadedFilesName = initialFiles
        .map(entry => entry.filename)
        .join(', ');
      inputRef.current.value = uploadedFilesName;
    }
  }, [initialFiles])

  return (
    <div className="mb-10">
      <label htmlFor={label} className="form-label">{label}</label>
      <Form.Control
        type="file"
        hidden={true}
        ref={uploadRef}
        multiple={true}
        onChange={handleFile}
      />
      <InputGroup>
        <input
          className="form-control form-control-solid"
          type="text"
          ref={inputRef}
          disabled={true}
        />
        <Button
          variant="primary"
          onClick={(e) => {
            e.preventDefault();
            openFileInput();
          }}
        >
          <i className="fas fa-upload"></i>
        </Button>
      </InputGroup>
    </div>
  )
}
