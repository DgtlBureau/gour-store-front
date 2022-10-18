import { defaultTheme as t } from 'themes';

export const sx = {
  top: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      lg: 'row',
    },
    marginTop: '20px',
  },
  preview: {
    position: 'relative',
  },
  imageSlider: {
    margin: {
      lg: '0 40px 0 0',
      sm: '0 0 40px 0',
      xs: '0 0 20px 0',
    },
  },
  title: {
    margin: {
      xs: '0 0 15px 0',
      lg: '0 0 20px 0',
    },
    fontSize: {
      sm: '40px',
      xs: '24px',
    },
    fontWeight: 'bold',
    fontFamily: 'Roboto slab',
    color: 'primary.main',
  },
  info: {
    margin: '0 0 35px 0',
  },
  actions: {
    marginTop: '10px',
  },
  description: {
    margin: {
      lg: '100px 0 100px 0',
      sm: '70px 0 70px 0',
      xs: '30px 0 30px 0',
    },
  },
  reviews: {
    margin: {
      sm: '0 0 40px 0',
      xs: '0 0 30px 0',
    },
  },
  similar: {
    margin: {
      lg: '0 0 90px 0',
      sm: '0 0 70px 0',
      xs: '0 0 30px 0',
    },
  },
  comment: {
    marginBottom: '40px',
  },
  heart: {
    position: 'absolute',

    display: { xs: 'flex', sm: 'none' },

    top: '15px',
    right: '15px',

    color: t.palette.text.muted,

    cursor: 'pointer',
    zIndex: 100,

    '&:hover': {
      opacity: 0.75,
    },
  },
  elected: {
    color: t.palette.accent.main,
  },
};

export default sx;
