import { defaultTheme as t } from '../../../themes';

const sx = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    height: '540px',
    width: '300px',

    border: '2px solid',
    borderColor: '#FEC983',
    borderRadius: '10px',

    backgroundColor: t.palette.background.default,

    boxShadow: 'none',
    boxSizing: 'border-box',
    '&:last-child': {
      paddingBottom: '0px',
    },
  },
  content: {
    padding: '20px 20px 0px 20px',
  },
  preview: {
    position: 'relative',
    marginBottom: '20px',
  },
  previewImg: {
    height: '245px',

    border: '2px solid',
    borderColor: '#FEC983',
    borderRadius: '10px',

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
    margin: '10px 0',
    fontWeight: 'bold',
    fontFamily: 'Roboto slab',

    '&:hover': {
      cursor: 'pointer',
      opacity: '0.75',
    },
  },
  description: {
    height: '42px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: 'inline-block',
    whiteSpace: 'normal',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',

    padding: '0 20px 20px 20px',
  },
  deployed: {
    flexDirection: 'column',
  },
};

export default sx;
