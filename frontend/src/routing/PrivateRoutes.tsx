import { lazy, FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import { MenuTestPage } from "../pages/MenuTestPage";
import { getCSSVariableValue } from "../_metronic/assets/ts/_utils";
import { WithChildren } from "../_metronic/helpers";

const PrivateRoutes = () => {
  const ProductPage = lazy(() => import("../modules/products/ProductPage"));
  const SysparamPage = lazy(
    () => import("../pages/sysparams/router/IndexRoutes")
  );
  const PrivilegePage = lazy(
    () => import("../pages/privileges/router/IndexRoutes")
  );
  const RolePage = lazy(() => import("../pages/roles/router/IndexRoutes"));
  const UserPage = lazy(() => import("../pages/user/router/IndexRoutes"));
  const AuditrailPage = lazy(
    () => import("../pages/auditrails/router/IndexRoutes")
  );
  const ExamplesPage = lazy(
    () => import("../pages/examples/router/IndexRoutes")
  );

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="dashboard" element={<DashboardWrapper />} />
        <Route path="menu-test" element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path="/products/*"
          element={
            <SuspensedView>
              <ProductPage />
            </SuspensedView>
          }
        />
        <Route
          path="/sysparams/*"
          element={
            <SuspensedView>
              <SysparamPage />
            </SuspensedView>
          }
        />
        <Route
          path="/privileges/*"
          element={
            <SuspensedView>
              <PrivilegePage />
            </SuspensedView>
          }
        />
        <Route
          path="/roles/*"
          element={
            <SuspensedView>
              <RolePage />
            </SuspensedView>
          }
        />
        <Route
          path="/users/*"
          element={
            <SuspensedView>
              <UserPage />
            </SuspensedView>
          }
        />
        <Route
          path="/auditrails/*"
          element={
            <SuspensedView>
              <AuditrailPage />
            </SuspensedView>
          }
        />
        <Route
          path="/examples/*"
          element={
            <SuspensedView>
              <ExamplesPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
