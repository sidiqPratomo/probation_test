import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateWrapper } from '../pages/create/CreateWrapper';
import EditWrapper from '../pages/edit/EditWrapper';
import { ListWrapper } from '../pages/list/ListWrapper';
import { TrashListWrapper } from '../pages/trash_list/TrashListWrapper';
import ReadWrapper from '../pages/read/ReadWrapper';
import { ResourceWrapper } from '../ResourceWrapper';
import { PageLink, PageTitle } from '../../../_metronic/layout/core';
import { useIntl } from 'react-intl';

const IndexRoutes: FC = () => {
  const { formatMessage } = useIntl();
  const breadcrumbs: Array<PageLink> = [
    {
      title: `Examples`,
      path: ``,
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ];

  return (
    <Routes>
      <Route element={<ResourceWrapper />}>
        <Route
          path='/'
          element={
            <>
              <PageTitle breadcrumbs={breadcrumbs}>
                {formatMessage({ id: 'ACTION.LIST' })}
              </PageTitle>
              <ListWrapper />
            </>
          }
        />
        <Route
          path='create'
          element={
            <>
              <PageTitle breadcrumbs={breadcrumbs}>
                {formatMessage({ id: 'ACTION.CREATE' })}
              </PageTitle>
              <CreateWrapper />
            </>
          }
        />
        <Route
          path='trash'
          element={
            <>
              <PageTitle breadcrumbs={breadcrumbs}>
                {formatMessage({ id: 'ACTION.TRASH' })}
              </PageTitle>
              <TrashListWrapper />
            </>
          }
        />
        <Route path=':id'>
          <Route
            index
            element={
              <>
                <PageTitle breadcrumbs={breadcrumbs}>
                  {formatMessage({ id: 'ACTION.READ' })}
                </PageTitle>
                <ReadWrapper />
              </>
            }
          />
          <Route
            path='edit'
            element={
              <>
                <PageTitle breadcrumbs={breadcrumbs}>
                  {formatMessage({ id: 'ACTION.UPDATE' })}
                </PageTitle>
                <EditWrapper />
              </>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default IndexRoutes;
