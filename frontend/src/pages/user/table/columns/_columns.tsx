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
    Header: (props) => <CustomHeader tableProps={props} title='First Name' className='min-w-125px' />,
    id: 'first_name',
    Cell: ({...props}) => {
      const entry = props.data[props.row.index]
      return <ColumnString value={entry['first_name']} />
    },
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Last Name' className='min-w-125px' />,
    id: 'last_name',
    Cell: ({...props}) => {
      const entry = props.data[props.row.index]
      return <ColumnString value={entry['last_name']} />
    },
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Username' className='min-w-125px' />,
    id: 'username',
    Cell: ({...props}) => {
      const entry = props.data[props.row.index]
      return <ColumnString value={entry['username']} />
    },
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Email' className='min-w-125px' />,
    id: 'email',
    Cell: ({...props}) => {
      const entry = props.data[props.row.index]
      return <ColumnString value={entry['email']} />
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
