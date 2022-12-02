import { color, createSx } from 'themes';

const sx = createSx({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    width: {
      xs: '172px',
      sm: '212px',
      md: '282px',
    },

    gap: {
      xs: '3px',
      md: '5px',
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
      xs: '148px',
      sm: '188px',
      md: '238px',
    },

    width: '100%',
    padding: '10px',
    objectFit: 'contain',
    backgroundSize: 'contain',

    border: '2px solid',
    borderColor: '#FEC983',
    borderRadius: '10px',
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

    WebkitLineClamp: {
      xs: '2',
      sm: '1',
      md: '2',
    },
    WebkitBoxOrient: 'vertical',

    maxHeight: { xs: '24px', sm: '26px', md: '30px' },

    overflow: 'hidden',
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
});

export default sx;
