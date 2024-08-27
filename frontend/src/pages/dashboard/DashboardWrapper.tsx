import {FC} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../_metronic/layout/core'

import { ToolbarWrapper } from '../../_metronic/layout/components/toolbar'
import { Content } from '../../_metronic/layout/components/content'

const DashboardPage: FC = () => (
  <>
    <ToolbarWrapper />
    <Content>
      {/* Content Goes Here */}
    </Content>
  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
