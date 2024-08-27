import { Outlet, Route, Routes } from "react-router-dom";
import { PageLink, PageTitle } from "../../_metronic/layout/core";
import { ProductList } from "./products-list/ProductList";
import Create from "./create/Create";

const productsBreadcrumbs: Array<PageLink> = [
  {
    title: 'Product List',
    path: '/products',
    isSeparator: false,
    isActive: false
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const ProductPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="/"
          element={
            <>
              <PageTitle breadcrumbs={productsBreadcrumbs}>Products List</PageTitle>
              <ProductList />
            </>
          }
        >
        </Route>
        <Route
          path="/create"
          element={
            <>
              <PageTitle breadcrumbs={productsBreadcrumbs}>Products Create</PageTitle>
              <Create />
            </>
          }
        >
        </Route>
      </Route>
    </Routes>
  )
}

export default ProductPage;