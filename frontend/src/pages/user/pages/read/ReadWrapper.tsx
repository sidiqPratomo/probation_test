import { FC } from 'react'
import { usePageData } from '../../../../_metronic/layout/core'
import ReadPage from './ReadPage'

const ReadWrapper: FC = () => {
  const {setPageTitle} = usePageData()
  setPageTitle('Detail User')
  
  return <ReadPage />
}

export default ReadWrapper
