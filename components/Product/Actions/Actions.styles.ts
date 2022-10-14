import { defaultTheme as theme } from 'themes';

export const sx = {
  container: {
    display: 'flex',
    flexWrap: {
      xs: 'nowrap',
      lg: 'wrap',
    },
    alignItems: 'center',
    width: {
      xs: '100%',
      lg: '450px',
    },
  },

  stock: {
    color: theme.palette.text.secondary,
    maxWidth: '100%',
    margin: {
      xs: '0 12px 0 0',
      lg: 0,
    },
  },

  select: {
    height: '44px',
    marginRight: {
      xs: '7px',
      md: 0,
    },
  },

  docket: {
    width: {
      lg: '100%',
    },
    display: 'flex',
    alignItems: 'center',
    color: 'text.muted',
    order: {
      xs: -1,
      lg: 'inherit',
    },
    margin: {
      xs: '0 3% 0 0',
      sm: '0 70px 0 0',
      lg: '10px 0',
    },
  },

  buyBtnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: {
      xs: '44px',
      m: 'auto',
    },
    height: '44px',

    borderRadius: {
      xs: '50%',
      m: '6px',
    },
    margin: {
      lg: '0 4px',
      sm: '0 10px',
    },
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
  buyBtnCircle: {
    display: 'flex',
    height: '44px',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buyBtnLabel: {
    marginLeft: '10px',
    textTransform: 'uppercase',
    fontWeight: 600,
  },
  action: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },

  favoriteBtn: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    display: {
      xs: 'none',
      sm: 'flex',
    },

    background: theme.palette.accent.main,
    color: theme.palette.common.white,

    '&: hover': {
      background: theme.palette.common.black,
    },
  },
  favoriteBtnElected: {
    background: theme.palette.primary.main,
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
