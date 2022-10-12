import { defaultTheme as theme } from 'themes';

const sx = {
  product: {
    display: 'flex',
    alignItems: {
      xs: 'center',
      md: 'flex-end',
    },
  },
  selected: {
    border: '2px solid',
    borderColor: theme.palette.accent.main,
  },
};

export default sx;
