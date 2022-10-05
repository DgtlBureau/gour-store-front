import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { persistor, store } from 'store/store';

import { NavigationProvider } from 'components/Navigation';
import Notifications from 'components/Notifications/Notifications';

import { PersistGate } from 'redux-persist/integration/react';
import { defaultTheme } from 'themes';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={defaultTheme}>
          <NavigationProvider>
            <CssBaseline />
            <ToastContainer />
            <Notifications />
            <Head>
              <meta
                name='viewport'
                content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
              />
            </Head>
            <Component {...pageProps} />
          </NavigationProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
