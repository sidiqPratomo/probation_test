import {FC} from 'react'
import {Route, Routes} from 'react-router-dom'
import {CreateWrapper} from '../pages/create/CreateWrapper'
import EditWrapper from '../pages/edit/EditWrapper'
import {ListWrapper} from '../pages/list/ListWrapper'
import ReadWrapper from '../pages/read/ReadWrapper'
import {ResourceWrapper} from '../ResourceWrapper'
import {PageLink,PageTitle} from '../../../_metronic/layout/core';


const IndexRoutes: FC = () => {

  const breadcrumbs: Array<PageLink> = [
    {
      title: `Roles`,
      path: ``,
      isSeparator: false,
      isActive: false,
    },
    {
      title: "",
      path: "",
      isSeparator: true,
      isActive: false,
    },
  ];

  
   return (
    <Routes>
      <Route element={<ResourceWrapper />}>
        <Route path='/' element={
          <>
              <PageTitle breadcrumbs={breadcrumbs}>List</PageTitle>
              <ListWrapper />
          </>
        } />
        <Route path='create' element={
          <>
            <PageTitle breadcrumbs={breadcrumbs}>Create</PageTitle>
            <CreateWrapper />
          </>

        } />
        <Route path=':id'>
          <Route index element={
           <>
              <PageTitle breadcrumbs={breadcrumbs}>Detail</PageTitle>
              <ReadWrapper />
           </>

          } />
          <Route path='edit' element={
            <>
              <PageTitle breadcrumbs={breadcrumbs}>Edit</PageTitle>
              <EditWrapper />
            </>
          } />
        </Route>
      </Route>
    </Routes>
  )
}

export default IndexRoutes
