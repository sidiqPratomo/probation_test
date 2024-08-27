import {FC} from 'react'
import {ColumnInstance} from 'react-table'

type Props<Type extends object> = {
  column: ColumnInstance<Type>
}

const ResourceHeader: FC<Props<any>> = ({column}) => {
  const {Header} = column as ColumnInstance

  return (
    <>
      {Header && typeof Header === 'string' ? (
        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
      ) : (
        column.render('Header')
      )}
    </>
  )
}

export {ResourceHeader}
