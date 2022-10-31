import { color } from 'themes';

export const sx = {
  cart: {
    display: 'flex',
    alignItems: 'center',

    borderRadius: '6px',

    width: '100%',

    justifyContent: 'center',

    fontFamily: 'Roboto slab',

    background: color.primary,
    color: color.white,

    '&: hover': {
      background: { md: color.black },
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
    color: color.white,
  },
  buyLabel: {
    textTransform: 'uppercase',
    marginLeft: '10px',
    color: color.white,
  },
  action: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default sx;
