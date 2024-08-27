import { Outlet } from 'react-router-dom'
import { FC } from 'react'
import { Content } from '../../_metronic/layout/components/content'
import { ToolbarWrapper } from '../../_metronic/layout/components/toolbar/ToolbarWrapper'

export const ResourceWrapper: FC = () => {

  return (
  <>
    <ToolbarWrapper />
    <Content>
      <Outlet />
    </Content>
  </>
  )
}
