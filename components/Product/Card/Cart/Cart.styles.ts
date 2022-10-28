import { defaultTheme as t } from 'themes';

export const sx = {
  cart: {
    display: 'flex',
    alignItems: 'center',

    borderRadius: '6px',

    width: '100%',

    justifyContent: 'center',

    fontFamily: 'Roboto slab',

    background: t.palette.primary.main,
    color: t.palette.common.white,

    '&: hover': {
      background: { md: t.palette.common.black },
    },
  },
  iconBtn: {
    width: '100%',
    padding: {
      xs: '10px',
    },
  },
  icon: {
    fontSize: {
      md: '22px',
      sm: '20px',
      xs: '18px',
    },
    color: t.palette.common.white,
  },
  buyLabel: {
    textTransform: 'uppercase',
    marginLeft: '10px',
    color: t.palette.common.white,
  },
  action: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default sx;
