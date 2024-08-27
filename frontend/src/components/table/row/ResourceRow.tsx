// @ts-nocheck
import clsx from 'clsx'
import {FC} from 'react'
import {Row} from 'react-table'

interface Props<Type> {
  row: Row<Type>
}

const ResourceRow: FC<Props> = ({row}) => {
  return (
    <tr {...row.getRowProps()}>
      {row.cells.map((cell) => {
        return (
          <td
            {...cell.getCellProps()}
            className={clsx({'text-end min-w-100px': cell.column.id === 'actions'})}
          >
            {cell.render('Cell')}
          </td>
        )
      })}
    </tr>
  )
}

export {ResourceRow}
