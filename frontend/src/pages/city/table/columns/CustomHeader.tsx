import clsx from 'clsx'
import {FC, PropsWithChildren, useMemo} from 'react'
import {HeaderProps} from 'react-table'
import {initialQueryState} from '../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'

type Props = {
  className?: string
  title?: string
  tableProps: PropsWithChildren<HeaderProps<any>>
}
const CustomHeader: FC<Props> = ({className, title, tableProps}) => {
  const {state, updateState} = useQueryRequest()
  const isSelectedForSorting = useMemo(() => {
    return state.sort
  }, [state])

  const sortColumn = () => {
    if (isSelectedForSorting) {
      updateState({...state.sort, ...initialQueryState})
    }
  }

  return (
    <th
      {...tableProps.column.getHeaderProps()}
      className={clsx(className, isSelectedForSorting)}
      style={{cursor: 'pointer'}}
      onClick={sortColumn}
    >
      {title}
    </th>
  )
}

export {CustomHeader}
