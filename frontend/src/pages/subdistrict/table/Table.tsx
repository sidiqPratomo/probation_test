import {useMemo} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {useQueryResponseData, useQueryResponseLoading, useQueryResponse} from '../core/QueryResponseProvider'
import { useQueryRequest } from '../core/QueryRequestProvider'
import {usersColumns} from './columns/_columns'
import {KTCardBody} from '../../../_metronic/helpers'
import {ResourceHeader} from '../../../components/table/header/ResourceHeader'
import {ResourceRow} from '../../../components/table/row/ResourceRow'
import { ListPagination } from '../../../_metronic/helpers/components/ListPagination'
import { ListSearchComponent } from '../header/ListSearchComponent'
import { ListLoading } from '../loading/ListLoading'

const Table = () => {
  const response = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => response, [response])
  const columns = useMemo(() => usersColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  return (
    <KTCardBody className='py-4'>

      <div className="d-flex align-items-center mb-5">
        <ListSearchComponent/>
       

      </div>

      <div className='table-responsive'>
        <table
          id='kt_table_users'
          className='table align-middle table-row-dashed table-hover fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance) => (
                <ResourceHeader key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row|any, i) => {
                prepareRow(row)
                return <ResourceRow row={row} key={`row-${i}-${row.original.id}`} />
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    No matching records found
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
  )
}

export {Table}
