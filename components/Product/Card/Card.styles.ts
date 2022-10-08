import { defaultTheme as t } from 'themes';

const sx = {
  card: {
    display: 'flex',
    flexDirection: 'column',

    height: 'auto',

    width: {
      xs: '165px',
      sm: '215px',
      md: '282px',
    },

    padding: {
      xs: '10px',
      md: '20px',
    },

    border: '2px solid',
    borderColor: '#FEC983',
    borderRadius: '10px',

    backgroundColor: t.palette.background.default,

    boxShadow: 'none',
    boxSizing: 'border-box',
  },
  preview: {
    position: 'relative',
  },
  previewImg: {
    height: {
      xs: '146px',
      sm: '190px',
      md: '255px',
    },

    border: '2px solid',
    borderColor: '#FEC983',
    borderRadius: '10px',

    cursor: 'pointer',
  },
  productImg: {
    height: '100%',
    objectFit: 'contain',
  },
  heart: {
    position: 'absolute',
    top: '8px',
    right: '8px',

    color: t.palette.text.muted || '',

    '&:hover': {
      cursor: 'pointer',
      opacity: 0.75,
    },
  },
  elected: {
    color: t.palette.accent.main,
  },
  country: {
    position: 'absolute',
    pointerEvents: 'none',
    bottom: 6,
    right: 6,
    height: '26px',
    width: '26px',
    overflow: 'hidden',
    borderRadius: '50%',
  },
  rate: {
    margin: {
      xs: '10px 0 5px 0',
      md: '10px 0',
    },
  },
  title: {
    fontSize: {
      xs: '14px',
      sm: '16px',
      md: '20px',
    },
    fontWeight: 'bold',
    fontFamily: 'Roboto slab',
    color: t.palette.text.secondary,
    display: '-webkit-box',

    height: '100%',
    overflow: 'hidden',
    WebkitLineClamp: {
      xs: '2',
      sm: '1',
      md: '2',
    },
    WebkitBoxOrient: 'vertical',

    maxHeight: {
      xs: '45px',
      sm: '26px',
      md: '64px',
    },
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',

    '&:hover': {
      cursor: 'pointer',
      opacity: '0.75',
    },
  },
  description: {
    display: {
      sm: '-webkit-box',
      xs: 'none',
    },
    height: '100%',
    maxHeight: '44px',
    margin: {
      xs: '5px 0',
      md: '10px 0',
    },
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',

    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'normal',
    color: t.palette.text.secondary,
  },
  actions: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
  },
  deployed: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
};

export default sx;
