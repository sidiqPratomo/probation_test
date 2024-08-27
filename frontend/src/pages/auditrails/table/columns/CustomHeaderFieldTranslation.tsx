import clsx from 'clsx';
import { FC, PropsWithChildren, useMemo } from 'react';
import { HeaderProps } from 'react-table';
import { initialQueryState } from '../../../../_metronic/helpers';
import { useQueryRequest } from '../../core/QueryRequestProvider';
import { TableFieldTranslationLabel } from '../../../../components/label/TableFieldTranslationLabel';

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
  const { state, updateState } = useQueryRequest();
  const isSelectedForSorting = useMemo(() => {
    return name;
  }, [name]);

  const order: '1' | '-1' | undefined = useMemo(() => {
    const { sort } = state;
    if (sort) {
      const { key, order } = sort;
      if (key !== name) return '1';
      if (order === undefined) return '1';
      if (order === '1') return '-1';
      if (order === '-1') return undefined;
    }
    return '1';
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
    if (!sort) {
      updateState({
        ...initialQueryState,
      });
      return;
    }
    updateState({
      ...initialQueryState,
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
      style={{ cursor: 'pointer' }}
      onClick={sortColumn}
    >
      <TableFieldTranslationLabel collection={collection} name={name} />
    </th>
  );
};

export { CustomHeaderFieldTranslation };
