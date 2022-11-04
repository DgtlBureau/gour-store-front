import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }

  interface PaletteOptions {
    accent: PaletteOptions['primary'];
  }

  interface TypeText {
    muted: string;
  }

  interface BreakpointOverrides {
    m: true;
  }
}

export const color = {
  white: '#FFFEF7',
  black: '#321811',
  green: '#24B232',
  primary: '#7E5F2F',
  secondary: '#F4E7CE',
  error: '#DB3D15',
  accent: '#F7A400',
  muted: '#C29F6C',
};

export const defaultTheme = createTheme({
  palette: {
    common: {
      white: color.white,
      black: color.black,
    },
    primary: {
      main: color.primary,
      contrastText: color.white,
    },
    secondary: {
      main: color.secondary,
      contrastText: color.black,
    },
    error: {
      main: color.error,
    },
    accent: {
      main: color.accent,
    },
    text: {
      primary: color.black,
      secondary: color.primary,
      muted: color.muted,
    },
    background: {
      default: color.white,
      paper: color.secondary,
    },
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontFamily: ['Nunito', 'Roboto slab', 'Roboto', 'Coming Soon', '-apple-system', 'sans-serif'].join(','),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      m: 745,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
