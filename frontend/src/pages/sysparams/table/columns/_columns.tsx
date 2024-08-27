import { Column } from 'react-table';
import { SelectionHeader } from './SelectionHeader';
import { SelectionCell } from './SelectionCell';
import { ColumnString } from '../../../../components/table/column/ColumnString';
import { ActionsCell } from './ActionsCell';
import { CustomHeaderFieldTranslation } from './CustomHeaderFieldTranslation';
import { Collection } from '../../core/_models';
import { CustomHeaderActionTranslation } from './CustomHeaderActionTranslation';

const usersColumns: ReadonlyArray<Column<any>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({ ...props }) => (
      <SelectionCell id={props.data[props.row.index].id} />
    ),
  },
  {
    Header: (props) => (
      <CustomHeaderFieldTranslation
        tableProps={props}
        name='group'
        className='min-w-125px'
        collection={Collection}
      />
    ),
    id: 'group',
    Cell: ({ ...props }) => {
      const entry = props.data[props.row.index];
      return <ColumnString value={entry['group']} />;
    },
  },
  {
    Header: (props) => (
      <CustomHeaderFieldTranslation
        tableProps={props}
        name='key'
        className='min-w-125px'
        collection={Collection}
      />
    ),
    id: 'key',
    Cell: ({ ...props }) => {
      const entry = props.data[props.row.index];
      return <ColumnString value={entry['key']} />;
    },
  },
  {
    Header: (props) => (
      <CustomHeaderFieldTranslation
        tableProps={props}
        name='value'
        className='min-w-125px'
        collection={Collection}
      />
    ),
    id: 'value',
    Cell: ({ ...props }) => {
      const entry = props.data[props.row.index];
      return <ColumnString value={entry['value']} />;
    },
  },
  {
    Header: (props) => (
      <CustomHeaderFieldTranslation
        tableProps={props}
        name='long_value'
        className='min-w-125px'
        collection={Collection}
      />
    ),
    id: 'long_value',
    Cell: ({ ...props }) => {
      const entry = props.data[props.row.index];
      return <ColumnString value={entry['long_value']} />;
    },
  },
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

export { usersColumns };
