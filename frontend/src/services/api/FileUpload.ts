import axios from "axios";
import {
  ResponseSingleFile,
  ResponseMultipleFile,
} from "../../_metronic/helpers";

export function ServiceMultipleFileUpload(
  payload: FormData,
  options?: { onUploadProgress?: (progressEvent: any) => void }
): Promise<ResponseMultipleFile> {
  return new Promise((resolve, reject) => {
    try {
      const API_URL = import.meta.env.VITE_APP_API_BASE_URL || "";
      const API_VERSION = import.meta.env.VITE_APP_API_VERSION || "";

      const bucket = payload.get("bucket");
      const path = payload.get("path");

      let params = "";
      if (bucket) {
        params += `bucket=${bucket}`;
      }
      if (path) {
        params += `&path=${path}`;
      }

      const url: string = `${API_URL}/${API_VERSION}/file/upload?${params}`;

      axios
        .post(url, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: options?.onUploadProgress,
        })
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    } catch (err) {
      reject(err);
    }
  });
}

export function ServiceSingleFileUpload(
  payload: FormData,
  options?: { onUploadProgress?: (progressEvent: any) => void }
): Promise<ResponseSingleFile> {
  return new Promise((resolve, reject) => {
    try {
      const API_URL = import.meta.env.VITE_APP_API_BASE_URL || "";
      const API_VERSION = import.meta.env.VITE_APP_API_VERSION || "";

      const bucket = payload.get("bucket");
      const path = payload.get("path");

      let params = "";
      if (bucket) {
        params += `bucket=${bucket}`;
      }
      if (path) {
        params += `&path=${path}`;
      }

      const url: string = `${API_URL}/${API_VERSION}/file/upload?${params}`;

      axios
        .post(url, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: options?.onUploadProgress,
        })
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    } catch (err) {
      reject(err);
    }
  });
}
