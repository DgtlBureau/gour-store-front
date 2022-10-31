import { color } from 'themes';

const sx = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    width: {
      xs: '190px',
      sm: '200px',
      md: '270px',
    },

    gap: {
      xs: '5px',
      md: '10px',
    },

    padding: {
      xs: '10px',
      md: '20px',
    },

    border: '2px solid',
    borderColor: '#FEC983',
    borderRadius: '10px',

    backgroundColor: color.white,

    boxSizing: 'border-box',
  },
  preview: {
    position: 'relative',
  },
  previewImg: {
    height: {
      xs: '170px',
      sm: '180px',
      md: '230px',
    },

    width: '100%',

    border: '2px solid',
    borderColor: '#FEC983',
    borderRadius: '10px',
  },
  productImg: {
    height: '100%',
    objectFit: 'contain',
  },
  heart: {
    position: 'absolute',
    top: '8px',
    right: '8px',

    color: color.muted,

    cursor: 'pointer',

    '&:hover': {
      opacity: 0.75,
    },
  },
  elected: {
    color: color.accent,
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
  title: {
    fontSize: {
      xs: '14px',
      sm: '16px',
      md: '20px',
    },
    fontWeight: 'bold',
    fontFamily: 'Roboto slab',
    color: color.primary,
    display: '-webkit-box',

    height: '100%',
    overflow: 'hidden',
    WebkitLineClamp: {
      xs: '2',
      sm: '1',
      md: '2',
    },
    WebkitBoxOrient: 'vertical',

    maxHeight: { xs: '24px', sm: '26px', md: '30px' },

    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    '&:hover': {
      opacity: '0.75',
    },
  },
  stock: {
    display: 'block',
    padding: '2px 16px',
    borderRadius: '4px',
    backgroundColor: color.secondary,
    color: color.primary,

    width: '100%',
    height: '100%',

    maxHeight: '26px',

    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',

    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
};

export default sx;
