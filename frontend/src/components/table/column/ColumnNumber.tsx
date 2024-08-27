import {FC, useState} from 'react'
import {useFormatter} from '../../../hooks/useFormatter'

interface Props {
  value: number
  decimal?: number
}

export const ColumnNumber: FC<Props> = ({value, decimal}) => {
  const {formatNumberDecimal} = useFormatter()
  const [result] = useState<number>(formatNumberDecimal(value, decimal))

  return <div className='text-dark text-hover-primary fs-6'>{result}</div>
}
