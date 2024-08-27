import { FC } from 'react'
import { CreatePage } from './CreatePage'
import { usePageData } from '../../../../_metronic/layout/core'

export const CreateWrapper: FC = () => {
  const {setPageTitle} = usePageData()
  setPageTitle('Create User')
  
  return (
    <>
      <CreatePage />
    </>
  )
}
