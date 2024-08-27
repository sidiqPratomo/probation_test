import { Column } from 'react-table';
import { CustomHeaderActionTranslation } from './CustomHeaderActionTranslation';
import { ActionsCell } from './ActionsCellTrashList';
import { baseHeaderColumns } from './_baseHeaderColumns';

const trashListColumns: ReadonlyArray<Column<any>> = [
  ...baseHeaderColumns,
  {
    Header: (props) => (
      <CustomHeaderActionTranslation
        tableProps={props}
        name='actions'
        className='text-end min-w-100px'
      />
    ),
    id: 'actions',
    Cell: ({ ...props }) => <ActionsCell id={props.data[props.row.index].id} />,
  },
];

export { trashListColumns };
