import { useResourceContext } from "../../../../../context/ResourceContext";
import { Link } from "react-router-dom";
import { ActionTranslationLabel } from "../../../../../components/label/ActionTranslationLabel";
import useDownloadExamples from "../../../hooks/useDownloadExamples";
import { Button } from "react-bootstrap";

const ListToolbar = () => {
  const { collection } = useResourceContext();
  const { downloadFile } = useDownloadExamples();

  return (
    <div
      className="d-flex justify-content-end"
      data-kt-user-table-toolbar="base"
    >
      <div className="d-flex justify-content-between align-items-center w-100">
        <Link className="btn btn-primary" to={`/${collection}/create`}>
          <i className="bi bi-pencil me-2 fs-4"></i>
          <ActionTranslationLabel name="create" />
        </Link>
        <Button
          className="btn btn-outline btn-outline-secondary ms-3"
          onClick={downloadFile}
        >
          <i className="bi bi-file-earmark-arrow-down fs-4"></i> Export
        </Button>
      </div>
    </div>
  );
};

export { ListToolbar };
