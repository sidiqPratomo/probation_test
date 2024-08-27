import { useMemo } from "react";
import { useTable, ColumnInstance, Row } from "react-table";
import {
  useQueryResponseData,
  useQueryResponseLoading,
  useQueryResponse,
} from "../core/QueryResponseProvider";
import { useQueryRequest } from "../core/QueryRequestProvider";
import { listColumns, trashListColumns } from "./columns/_columns";
import { ListLoading } from "../components/loading/ListLoading";
import { KTCardBody } from "../../../_metronic/helpers";
import { ResourceHeader } from "../../../components/table/header/ResourceHeader";
import { ResourceRow } from "../../../components/table/row/ResourceRow";
import * as ListSearchComponent from "../components/header/list/ListSearchComponent";
import * as TrashListSeachComponent from "../components/header/trash/ListSearchComponent";
import { ListPagination } from "../../../_metronic/helpers/components/ListPagination";
import { TableTranslationLabel } from "../../../components/label/TableTranslationLabel";
import { useLocation } from "react-router-dom";
import { useCheckUrl } from "../../../hooks/useCheckUrl";

const Table = () => {
  const response = useQueryResponseData();
  const isLoading = useQueryResponseLoading();
  const data = useMemo(() => response, [response]);
  const location = useLocation();
  const { isUrlTrash } = useCheckUrl();
  const headerColumns = isUrlTrash(location.pathname)
    ? trashListColumns
    : listColumns;
  const columns = useMemo(() => headerColumns, []);
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const searchComponent = () => {
    if (isUrlTrash(location.pathname)) {
      return <TrashListSeachComponent.ListSearchComponent />;
    }
    return <ListSearchComponent.ListSearchComponent />;
  };

  return (
    <KTCardBody className="py-4">
      <div className="d-flex align-items-center mb-5">{searchComponent()}</div>

      <div className="table-responsive">
        <table
          id="kt_table_users"
          className="table align-middle table-row-dashed table-hover fs-6 gy-5 dataTable no-footer"
          {...getTableProps()}
        >
          <thead>
            <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
              {headers.map((column: ColumnInstance) => (
                <ResourceHeader key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 fw-bold" {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row | any, i) => {
                prepareRow(row);
                return (
                  <ResourceRow row={row} key={`row-${i}-${row.original.id}`} />
                );
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className="d-flex text-center w-100 align-content-center justify-content-center">
                    <TableTranslationLabel name="no_data" />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ListPagination
        useQueryRequest={useQueryRequest}
        useQueryResponse={useQueryResponse}
        useQueryResponseLoading={useQueryResponseLoading}
      />

      {isLoading && <ListLoading />}
    </KTCardBody>
  );
};

export { Table };
