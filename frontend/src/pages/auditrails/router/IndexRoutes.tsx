import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { ListWrapper } from "../pages/list/ListWrapper";
import { ResourceWrapper } from "../ResourceWrapper";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";

const IndexRoutes: FC = () => {
  const breadcrumbs: Array<PageLink> = [
    {
      title: `Auditrails`,
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
        <Route
          path="/"
          element={
            <>
              <PageTitle breadcrumbs={breadcrumbs}>List</PageTitle>
              <ListWrapper />
            </>
          }
        />
      </Route>
    </Routes>
  );
};

export default IndexRoutes;
