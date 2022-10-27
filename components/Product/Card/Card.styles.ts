import { color } from 'themes';

const sx = {
  card: {
    display: 'flex',
    flexDirection: 'column',

    height: { xs: '315px', sm: '405px', md: '510px' },

    width: {
      xs: '170px',
      sm: '220px',
      md: '270px',
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
      xs: '150px',
      sm: '200px',
      md: '250px',
    },

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
  rate: {
    margin: '10px 0 0 0',
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

    margin: '5px 0 10px 0',

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
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: {
      xs: 'row',
      md: 'column',
    },
    margin: { xs: '10px 0 0 0', md: 0 },
  },
  deployedActions: {
    flexDirection: { xs: 'column' },
    margin: 0,
  },
  deployedStock: {
    display: { xs: 'none', md: 'flex' },
  },
};

export default sx;
