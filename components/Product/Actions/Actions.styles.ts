import { color } from 'themes';

export const sx = {
  container: {
    width: {
      xs: '100%',
      sm: '450px',
    },
    alignItems: { xs: 'flex-end', md: 'center' },
  },
  icon: {
    color: color.white,
  },
  favoriteBtn: {
    width: '44px',
    height: '44px',
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
