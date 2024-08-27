import { ResourceProvider } from '../../../../context/ResourceContext'
import { ListViewProvider } from '../../core/ListViewProvider'
import { QueryRequestProvider } from '../../core/QueryRequestProvider'
import { QueryResponseProvider } from '../../core/QueryResponseProvider'
import { TrashListPage } from './TrashListPage'

export const TrashListWrapper = () => {
  return (
    <ResourceProvider>
      <QueryRequestProvider>
        <QueryResponseProvider>
          <ListViewProvider>
            <TrashListPage />
          </ListViewProvider>
        </QueryResponseProvider>
      </QueryRequestProvider>
    </ResourceProvider>
  )
}
