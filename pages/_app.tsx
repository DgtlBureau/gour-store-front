import type { AppProps } from 'next/app'
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';

import { defaultTheme } from '../themes';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp;
