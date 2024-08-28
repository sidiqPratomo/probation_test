import clsx from "clsx";
import { LinkPagination } from "../../helpers";
import { PaginationHelpers } from "../../../services/formatter/PaginationHelpers";

const mappedLabel = (label: string): string => {
  if (label === "&laquo; Previous") {
    return "Previous";
  }

  if (label === "Next &raquo;") {
    return "Next";
  }

  return label;
};

type Props = {
  useQueryResponse: any;
  useQueryResponseLoading: any;
  useQueryRequest: any;
};

const ListPagination = ({
  useQueryResponse,
  useQueryResponseLoading,
  useQueryRequest,
}: Props) => {
  const { response } = useQueryResponse();
  const isLoading = useQueryResponseLoading();
  const { updateState, state } = useQueryRequest();
  const updatePage = (skip: number, limit: number) => {
    updateState({ skip, limit });
  };
  const { limit, skip } = state;
  const page: number = Math.floor(skip / limit) + 1;

  let paginations: Array<LinkPagination> = [];
  let dataCount = 0;

  if (response) {
    const collection = response.data;
    if (collection) {
      const { count } = collection;
      dataCount = count;
      paginations = PaginationHelpers({ count, limit, page });
    }
  }

  const totalPages = Math.ceil(dataCount / limit);

  return (
    <div className="d-flex justify-content-between mt-2 pb-2">
      <div className="d-flex align-items-center justify-content-center justify-content-md-start">
        <div id="kt_table_users_info">
          {dataCount > 0 && (
            <span className="ms-2 text-muted">
              Showing {skip + 1} to {Math.min(skip + limit, dataCount)} of{" "}
              {dataCount} entries
            </span>
          )}
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center justify-content-md-end">
        <div id="kt_table_users_paginate">
          <ul className="pagination">
            <li
              className={clsx("page-item", {
                disabled: page === 1,
              })}
              onClick={() => {
                updatePage(0, limit);
              }}
              style={{ cursor: "pointer" }}
            >
              <a className="page-link" aria-label="First">
                <i className="bi bi-chevron-double-left fs-4"></i>
              </a>
            </li>
            <li
              className={clsx("page-item", {
                disabled: page === 1,
              })}
              onClick={() => {
                updatePage(Math.max(skip - limit, 0), limit);
              }}
              style={{ cursor: "pointer" }}
            >
              <a className="page-link" aria-label="Previous">
                <i className="bi bi-chevron-left fs-4"></i>
              </a>
            </li>
            {paginations
              .map((link) => {
                return { ...link, label: mappedLabel(link.label) };
              })
              .map((link, index) => {
                const { label, skip, limit, type } = link;

                if (type === "separator") {
                  return (
                    <li
                      key={index}
                      className={clsx("page-item", {
                        active: false,
                        disabled: true,
                      })}
                    >
                      {label}
                    </li>
                  );
                }

                return (
                  <li
                    key={index}
                    className={clsx("page-item", {
                      active: link.active,
                      disabled: isLoading,
                      previous: label === "Previous",
                      next: label === "Next",
                    })}
                    onClick={() => {
                      updatePage(skip, limit);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <a className="page-link">{mappedLabel(label)}</a>
                  </li>
                );
              })}
            <li
              className={clsx("page-item", {
                disabled: page === totalPages,
              })}
              onClick={() => {
                updatePage(Math.max(skip + limit, 0), limit);
              }}
              style={{ cursor: "pointer" }}
            >
              <a className="page-link" aria-label="Next">
                <i className="bi bi-chevron-right fs-4"></i>
              </a>
            </li>
            <li
              className={clsx("page-item", {
                disabled: page === totalPages,
              })}
              onClick={() => {
                updatePage(Math.floor(dataCount / limit) * limit, limit);
              }}
              style={{ cursor: "pointer" }}
            >
              <a className="page-link" aria-label="Last">
                <i className="bi bi-chevron-double-right fs-4"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { ListPagination };
