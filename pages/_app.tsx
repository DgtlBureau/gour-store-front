import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { NavigationProvider } from 'components/Navigation';
import { ToastContainer } from 'react-toastify';
import Notifications from 'components/Notifications/Notifications';
import { persistor, store } from '../store/store';
import { defaultTheme } from '../themes';

import 'react-toastify/dist/ReactToastify.css';

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
