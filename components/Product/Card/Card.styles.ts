import { defaultTheme as t } from 'themes';

const sx = {
  card: {
    display: 'flex',
    flexDirection: 'column',

    height: { xs: '315px', sm: '405px', md: '510px' },
    width: 'fit-content',

    padding: {
      xs: '10px',
      md: '20px',
    },

    border: '2px solid',
    borderColor: '#FEC983',
    borderRadius: '10px',

    backgroundColor: t.palette.background.default,

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

    width: {
      xs: '150px',
      sm: '200px',
      md: '250px',
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

    color: t.palette.text.muted,

    cursor: 'pointer',

    '&:hover': {
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

    maxHeight: { xs: '24px', sm: '26px', md: '30px' },

    margin: '5px 0 10px 0',

    textOverflow: 'ellipsis',
    whiteSpace: 'normal',

    '&:hover': {
      cursor: 'pointer',
      opacity: '0.75',
    },
  },
  stock: {
    display: 'flex',
    justifyContent: 'center',
    padding: '2px 16px',
    borderRadius: '4px',
    backgroundColor: t.palette.background.paper,
    color: t.palette.text.secondary,
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
