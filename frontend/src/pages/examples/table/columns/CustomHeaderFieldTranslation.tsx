import clsx from "clsx";
import { FC, PropsWithChildren, useMemo, useState } from "react";
import { HeaderProps } from "react-table";
import {
  initialQueryState,
  initialTrashQueryState,
} from "../../../../_metronic/helpers";
import { useQueryRequest } from "../../core/QueryRequestProvider";
import { TableFieldTranslationLabel } from "../../../../components/label/TableFieldTranslationLabel";
import { useLocation } from "react-router-dom";
import { useCheckUrl } from "../../../../hooks/useCheckUrl";

type Props = {
  className?: string;
  collection: string;
  name: string;
  tableProps: PropsWithChildren<HeaderProps<any>>;
};
const CustomHeaderFieldTranslation: FC<Props> = ({
  className,
  collection,
  name,
  tableProps,
}) => {
  const { pathname } = useLocation();
  const { isUrlTrash } = useCheckUrl();
  const [isTrash] = useState<boolean>(isUrlTrash(pathname));
  const { state, updateState } = useQueryRequest();
  const [sortStatus, setSortStatus] = useState<"1" | "-1" | undefined>(
    undefined
  );

  const isSelectedForSorting = useMemo(() => {
    return name;
  }, [name]);

  const order: "1" | "-1" | undefined = useMemo(() => {
    const { sort } = state;
    if (sort) {
      const { key, order } = sort;
      if (key !== name) return "1";
      if (order === undefined) return "1";
      if (order === "1") return "-1";
      if (order === "-1") return undefined;
    }
    return "1";
  }, [state, name]);

  const sort = useMemo(() => {
    if (order && isSelectedForSorting) {
      return {
        sort: {
          key: isSelectedForSorting,
          order,
        },
      };
    }
    return {
      sort: undefined,
    };
  }, [isSelectedForSorting, order]);

  const sortColumn = () => {
    const order = sort.sort?.order;
    setSortStatus(order);

    const queryState = isTrash ? initialTrashQueryState : initialQueryState;
    if (!sort) {
      updateState({
        ...queryState,
      });
      return;
    }
    updateState({
      ...queryState,
      ...sort,
    });
  };

  return (
    <th
      {...tableProps.column.getHeaderProps()}
      className={clsx(
        className
        // isSelectedForSorting && order !== undefined && `table-sort-${order}`
      )}
      style={{ cursor: "pointer" }}
      onClick={sortColumn}
    >
      <TableFieldTranslationLabel
        collection={collection}
        name={name}
        sortStatus={sortStatus}
      />
    </th>
  );
};

export { CustomHeaderFieldTranslation };
