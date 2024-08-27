import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';
import { HeaderProps } from 'react-table';
import { TableTranslationLabel } from '../../../../components/label/TableTranslationLabel';

type Props = {
  className?: string;
  name: string;
  tableProps: PropsWithChildren<HeaderProps<any>>;
};
const CustomHeaderActionTranslation: FC<Props> = ({
  className,
  name,
  tableProps,
}) => {
  return (
    <th {...tableProps.column.getHeaderProps()} className={clsx(className)}>
      <TableTranslationLabel name={name} />
    </th>
  );
};

export { CustomHeaderActionTranslation };
