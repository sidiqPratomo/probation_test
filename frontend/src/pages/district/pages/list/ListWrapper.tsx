import { ResourceProvider } from '../../../../context/ResourceContext'
import { ListViewProvider } from '../../core/ListViewProvider'
import { QueryRequestProvider } from '../../core/QueryRequestProvider'
import { QueryResponseProvider } from '../../core/QueryResponseProvider'
import { ListPage } from './ListPage'

export const ListWrapper = () => {
  return (
    <ResourceProvider>
      <QueryRequestProvider>
        <QueryResponseProvider>
          <ListViewProvider>
            <ListPage />
          </ListViewProvider>
        </QueryResponseProvider>
      </QueryRequestProvider>
    </ResourceProvider>
  )
}
