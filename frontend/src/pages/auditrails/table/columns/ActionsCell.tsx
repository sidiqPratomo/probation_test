import { FC, useEffect } from "react";
import { MenuComponent } from "../../../../_metronic/assets/ts/components";
import { Auditrail } from "../../../../models/auditrails";
import { Collection } from "../../core/_models";
import useDownloadLogs from "../../hooks/useDownloadLogs";

type Props = {
  data: Auditrail;
};

const ActionsCell: FC<Props> = ({ data }) => {
  const { downloadFile } = useDownloadLogs();

  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  const handleDownload = (nameFile: string) => {
    try {
      downloadFile(nameFile, Collection);
    } catch (error) {
      console.error("Error while downloading logs", error);
      throw error;
    }
  };

  return (
    <>
      <a
        href="#"
        className="btn btn-light btn-active-light-primary btn-sm"
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-end"
      >
        Actions
      </a>
      {/* begin::Menu */}
      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
        data-kt-menu="true"
      >
        <div className="menu-item px-3">
          <span
            className="menu-link"
            onClick={() => handleDownload(data.name_file)}
          >
            Download
          </span>
        </div>
      </div>
    </>
  );
};

export { ActionsCell };
