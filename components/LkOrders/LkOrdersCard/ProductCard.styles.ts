import { defaultTheme as t } from '../../../themes';

const sx = {
  card: {
    display: 'flex',
    padding: '20px 0',

    boxShadow: 'none',
    background: 'transparent',
    borderRadius: 0,
  },

  image: {
    height: '52px',
    width: '52px',

    borderRadius: '2px',

    objectFit: 'cover',
  },

  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    padding: 0,
  },

  title: {
    fontWeight: 'bold',
    fontFamily: 'Roboto slab',
    color: t.palette.text.secondary,
  },
  productPrice: {
    width: '250px',
    fontWeight: 'bold',
    fontFamily: 'Roboto slab',
    color: t.palette.text.secondary,
    textAlign: 'right',
  },
  count: {
    fontWeight: 'bold',
    fontFamily: 'Roboto slab',
    color: t.palette.text.secondary,
    textAlign: 'right',
  },

  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    width: 'calc(100% - 145px)',
    paddingLeft: '20px',
  },

  docket: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  price: {
    fontWeight: 'bold',
  },
  oldPrice: {
    position: 'relative',

    width: 'fit-content',

    color: t.palette.text.muted || '',

    '&:before': {
      content: '""',
      borderBottom: '1px solid',
      borderColor: t.palette.error.main,
      position: 'absolute',
      width: '100%',
      height: '50%',
      transform: 'rotate(-12deg)',
    },
  },

  actions: {
    display: 'flex',
    justifyContent: 'space-between',

    padding: 0,

    button: {
      textTransform: 'none',

      padding: 0,

      color: t.palette.text.secondary,
    },
  },

  leftActions: {
    'button:first-child': {
      marginRight: '20px',
    },
  },

  edit: {
    display: 'flex',
    alignItems: 'center',

    padding: '4px',

    backgroundColor: t.palette.secondary.main,
    color: t.palette.text.secondary,

    borderRadius: '99px',

    button: {
      minWidth: '16px',
      padding: 'none',

      img: {
        height: '16px',
        width: '16px',
      },
    },
  },

  weight: {
    margin: '0 8px',
  },
};

export default sx;
