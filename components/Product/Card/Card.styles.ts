import { defaultTheme as t } from '../../../themes';

const sx = {
  card: {
    display: 'flex',
    flexDirection: 'column',

    height: {
      xs: '310px',
      sm: '380px',
      md: '520px',
    },

    width: {
      xs: '170px',
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
  },
  previewImg: {
    height: {
      xs: '146px',
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

    maxHeight: {
      sm: '26px',
      md: '64px',
    },
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'normal',

    '&:hover': {
      cursor: 'pointer',
      opacity: '0.75',
    },
  },
  description: {
    display: {
      md: 'inline-block',
      sm: 'inline-block',
      xs: 'none',
    },
    height: '100%',
    maxHeight: {
      md: '44px',
      sm: '22px',
    },
    margin: {
      xs: '5px 0',
      md: '10px 0',
    },

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
