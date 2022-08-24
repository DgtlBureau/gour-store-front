import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }

  interface PaletteOptions {
    accent: PaletteOptions['primary'];
  }

  interface TypeText {
    muted?: string;
  }

  interface BreakpointOverrides {
    m: true;
  }
}

export const defaultTheme = createTheme({
  palette: {
    common: {
      white: '#FFFEF7',
      black: '#321811',
    },
    primary: {
      main: '#7E5F2F',
      contrastText: '#FFFEF7',
    },
    secondary: {
      main: '#F4E7CE',
      contrastText: '#321811',
    },
    error: {
      main: '#DB3D15',
    },
    accent: {
      main: '#F7A400',
    },
    text: {
      primary: '#321811',
      secondary: '#7E5F2F',
      muted: '#C29F6C',
    },
    background: {
      default: '#FFFEF7',
      paper: '#F4E7CE',
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
