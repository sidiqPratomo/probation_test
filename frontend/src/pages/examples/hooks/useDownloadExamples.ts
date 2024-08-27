import axios from "axios";
import { useAuth } from "../../auth";

const useDownloadExamples = () => {
  const { auth } = useAuth();
  const downloadFile = async () => {
    try {
      const API_URL = import.meta.env.VITE_APP_API_BASE_URL || "";
      const API_VERSION = import.meta.env.VITE_APP_API_VERSION || "";
      const URL = `${API_URL}/${API_VERSION}/examples/null/export?report_type=csv`;

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
      link.setAttribute(
        "download",
        `examples_${new Date().toDateString().replace(" ", "_")}.csv`
      );
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

export default useDownloadExamples;
