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
    Header: (props) => <CustomHeader tableProps={props} title='Id' className='min-w-125px' />,
    id: 'id',
    Cell: ({...props}) => {
      const entry = props.data[props.row.index]
      return <ColumnString value={entry['id']} />
    },
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='District code' className='min-w-125px' />,
    id: 'district_code',
    Cell: ({...props}) => {
      const entry = props.data[props.row.index]
      return <ColumnString value={entry['district_code']} />
    },
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='City name' className='min-w-125px' />,
    id: 'city_name',
    Cell: ({...props}) => {
      const entry = props.data[props.row.index]
      let city
      if(entry['city']){
        city = entry['city']
      }
      return <ColumnString value={city.name} />
    },
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='City code' className='min-w-125px' />,
    id: 'city_code',
    Cell: ({...props}) => {
      const entry = props.data[props.row.index]
      return <ColumnString value={entry['city_code']} />
    },
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='District Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => {
      const entry = props.data[props.row.index]
      return <ColumnString value={entry['name']} />
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
