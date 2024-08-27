import axios from "axios";
import { useAuth } from "../../auth";

const useDownloadLogs = () => {
  const { auth } = useAuth();
  const downloadFile = async (nameFile: string, Collection: string) => {
    try {
      const API_URL = import.meta.env.VITE_APP_API_BASE_URL || "";
      const API_VERSION = import.meta.env.VITE_APP_API_VERSION || "";
      const URL = `${API_URL}/${API_VERSION}/${Collection}/log/download?name_file=${nameFile}`;

      const response = await axios({
        url: URL,
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth?.access_token}`,
        },
        responseType: "blob", // Important: responseType as blob for file download
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", nameFile);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("Error while downloading logs", error);
      throw error;
    }
  };

  return { downloadFile };
};

export default useDownloadLogs;
