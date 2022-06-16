import { defaultTheme as t } from '../../../themes';

const sx = {
  card: {
    display: 'flex',
    flexDirection: 'column',

    height: {
      xs: '340px',
      sm: '370px',
      md: '500px',
    },

    width: {
      xs: '180px',
      sm: '220px',
      md: '300px',
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
    marginBottom: {
      xs: '10px',
      md: '20px',
    },
  },
  previewImg: {
    height: {
      xs: '160px',
      sm: '190px',
      md: '245px',
    },

    border: '2px solid',
    borderColor: '#FEC983',
    borderRadius: '10px',
    objectFit: 'none',

    '&:hover': {
      cursor: 'pointer',
    },
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
    bottom: 6,
    right: 6,
    height: '26px',
    borderRadius: '99px',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',

    color: t.palette.text.secondary,
  },
  title: {
    margin: {
      xs: '4px 0',
      md: '10px 0',
    },

    fontWeight: 'bold',
    fontFamily: 'Roboto slab',

    '&:hover': {
      cursor: 'pointer',
      opacity: '0.75',
    },
  },
  description: {
    height: {
      xs: '20px',
      md: '42px',
    },
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: 'inline-block',
    whiteSpace: 'normal',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  deployed: {
    flexDirection: 'column',
  },
};

export default sx;
