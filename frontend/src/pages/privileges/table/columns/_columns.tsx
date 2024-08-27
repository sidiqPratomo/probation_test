import {Column} from 'react-table'
import {SelectionHeader} from './SelectionHeader'
import {SelectionCell} from './SelectionCell'
import {CustomHeader} from './CustomHeader'
import {ColumnString} from '../../../../components/table/column/ColumnString'
import {ActionsCell} from './ActionsCell'

const usersColumns: ReadonlyArray<Column<any>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Module' className='min-w-125px' />,
    id: 'module',
    Cell: ({...props}) => {
      const entry = props.data[props.row.index]
      return <ColumnString value={entry['module']} />
    },
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='URI' className='min-w-125px' />,
    id: 'uri',
    Cell: ({...props}) => {
      const entry = props.data[props.row.index]
      return <ColumnString value={entry['uri']} />
    },
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Method' className='min-w-125px' />,
    id: 'method',
    Cell: ({...props}) => {
      const entry = props.data[props.row.index]
      return <ColumnString value={entry['method']} />
    },
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Action' className='min-w-125px' />,
    id: 'action',
    Cell: ({...props}) => {
      const entry = props.data[props.row.index]
      return <ColumnString value={entry['action']} />
    },
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
  },
]

export {usersColumns}
