import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { I18nProvider } from './_metronic/i18n/i18nProvider';
import { LayoutProvider, LayoutSplashScreen } from './_metronic/layout/core';
import { MasterInit } from './_metronic/layout/MasterInit';
import { AuthInit, AuthLocatioMiddleware } from './pages/auth';
import { ThemeModeProvider } from './_metronic/partials';
import { ModalContextProvider } from './context/ModalContext';
import { SnackbarProvider } from 'notistack';

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <ModalContextProvider>
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={2000}
            anchorOrigin={{
              horizontal: 'right',
              vertical: 'top',
            }}
          >
            <LayoutProvider>
              <ThemeModeProvider>
                <AuthInit>
                  <AuthLocatioMiddleware>
                    <Outlet />
                  </AuthLocatioMiddleware>
                  <MasterInit />
                </AuthInit>
              </ThemeModeProvider>
            </LayoutProvider>
          </SnackbarProvider>
        </ModalContextProvider>
      </I18nProvider>
    </Suspense>
  );
};

export { App };
