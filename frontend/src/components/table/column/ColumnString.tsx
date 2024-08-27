import { FC, useState } from 'react'
import { useFormatter } from '../../../hooks/useFormatter'

interface Props {
  value: string
  limit?: number
}

export const ColumnString: FC<Props> = ({ value, limit }) => {
  const { formatStringLength } = useFormatter()
  const [result] = useState<string>(formatStringLength(value, limit))

  return <div className='text-dark text-hover-primary fs-6'>{result}</div>
}
