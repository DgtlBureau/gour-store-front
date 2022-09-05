import { defaultTheme as theme } from 'themes';

export const sx = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',

    width: {
      xs: '100%',
      sm: '450px',
      md: '350px',
    },
  },

  actions: {
    display: 'flex',
    alignItems: 'center',
  },

  cart: {
    display: 'flex',
    alignItems: 'center',

    marginLeft: 0,

    borderRadius: '99px',

    fontFamily: 'Roboto slab',

    background: theme.palette.primary.main,
    color: theme.palette.common.white,

    '&: hover': {
      background: theme.palette.common.black,
    },
  },
  icon: {
    color: theme.palette.common.white,
  },
  btnGroup: {
    minWidth: '180px',
  },
  action: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },

  favoriteBtn: {
    marginLeft: '10px',

    borderRadius: '99px',

    background: theme.palette.accent.main,
    color: theme.palette.common.white,

    '&: hover': {
      background: theme.palette.common.black,
    },
  },
  favoriteElect: {
    marginLeft: '10px',

    borderRadius: '99px',

    background: theme.palette.primary.main,
    color: theme.palette.common.white,

    '&: hover': {
      background: theme.palette.common.black,
    },
  },
  docket: {
    display: 'flex',
    alignItems: 'center',
    color: 'text.muted',
  },
  total: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '5px',
    fontWeight: 'bold',
  },
  price: {
    fontWeight: 'bold',
    fontFamily: ' Roboto slab',
  },
  oldPrice: {
    textDecoration: 'line-through',
    marginRight: '5px',
  },
};

export default sx;
