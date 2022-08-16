'use strict';

import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import * as NextImage from 'next/image';
import { RouterContext } from "next/dist/shared/lib/router-context";

import { NavigationProvider } from 'components/Navigation';
import { defaultTheme } from '../themes';

const MUITheme = (Story, context) => {
  return (
    <EmotionThemeProvider theme={defaultTheme}>
      <ThemeProvider theme={defaultTheme}>
        <NavigationProvider>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700&display=swap" rel="stylesheet" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;700&display=swap"
            rel="stylesheet"
          />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Coming+Soon&display=swap" rel="stylesheet" />
          <CssBaseline />
          <Story {...context} />
        </NavigationProvider>
      </ThemeProvider>
    </EmotionThemeProvider>
  );
};

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

export const decorators = [MUITheme];
