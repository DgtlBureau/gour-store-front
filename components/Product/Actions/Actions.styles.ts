import { color } from 'themes';

export const sx = {
  container: {
    width: {
      xs: '100%',
      sm: '450px',
    },
    gap: '5px',
    alignItems: { xs: 'flex-end', md: 'center' },
  },
  icon: {
    color: color.white,
  },
  gramSelect: {
    height: {
      xs: '34px',
      md: '40px',
    },
  },
  favoriteBtn: {
    height: {
      xs: '34px',
      md: '40px',
    },
    width: {
      xs: '34px',
      md: '40px',
    },
    borderRadius: '50%',

    background: color.accent,
    color: color.white,

    '&: hover': {
      background: color.black,
    },
  },
  favoriteBtnElected: {
    background: color.primary,
  },
};

export default sx;
