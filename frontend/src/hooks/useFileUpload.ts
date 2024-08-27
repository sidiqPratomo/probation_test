import { useState } from "react";
import { FileConfigProps, FileModel, fileConfig } from "../base_models";
import {
  ServiceMultipleFileUpload,
  ServiceSingleFileUpload,
} from "../services/api/FileUpload";

const API_URL = import.meta.env.VITE_APP_API_BASE_URL || "";
const API_VERSION = import.meta.env.VITE_APP_API_VERSION || "";

export const useFileUpload = () => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const multipleUpload = async (
    files: FileList,
    config: FileConfigProps = { ...fileConfig }
  ) => {
    try {
      setIsUploading(true);
      setProgress(0);

      const payload = new FormData();
      Array.from(files).forEach((file) => {
        payload.append("file[]", file);
      });

      const { bucket, path } = config;
      payload.append("bucket", bucket);
      if (path) {
        payload.append("path", path);
      }

      return await ServiceMultipleFileUpload(payload, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        },
      });
    } catch (e) {
      return Promise.reject(e);
    } finally {
      setIsUploading(false);
    }
  };

  const singleUpload = async (
    file: File,
    config: FileConfigProps = { ...fileConfig }
  ) => {
    try {
      setIsUploading(true);
      setProgress(0);

      const payload = new FormData();
      payload.append("file", file);

      const { bucket, path } = config;
      payload.append("bucket", bucket);
      if (path) {
        payload.append("path", path);
      }

      return await ServiceSingleFileUpload(payload, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        },
      });
    } catch (e) {
      return Promise.reject(e);
    } finally {
      setIsUploading(false);
    }
  };

  const staticUrl = (file: FileModel): string => {
    const { bucket, path, filename } = file;
    if (!bucket || !path || !filename) return "";
    const url: string = `${API_URL}/${API_VERSION}/file/download?bucket=${bucket}&path=${path}&filename=${filename}`;
    return encodeURI(url);
  };

  return {
    multipleUpload,
    singleUpload,
    staticUrl,
    progress,
    isUploading,
  };
};
