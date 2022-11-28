import { color } from 'themes';

const sx = {
  card: {
    display: 'flex',

    maxWidth: {
      md: '700px',
      xs: '100%',
    },

    padding: '20px 0',

    marginRight: 0,

    boxShadow: 'none',
    background: 'transparent',
    borderRadius: 0,
  },

  previewImg: {
    height: {
      sm: '125px',
      xs: '80px',
    },
    width: {
      sm: '125px',
      xs: '80px',
    },

    border: '2px solid #FDCE85',
    borderRadius: '10px',

    objectFit: 'contain',
    backgroundSize: 'contain',
  },

  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    width: '100%',

    margin: {
      sm: '0 0 0 20px',
      xs: '0 0 0 15px',
    },
  },

  content: {
    padding: 0,
  },

  contentTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  contentGram: {
    color: color.primary,
  },

  title: {
    fontSize: {
      xs: '14px',
      sm: '16px',
      md: '18px',
    },
    fontWeight: 'bold',
    fontFamily: 'Roboto slab',
    color: color.primary,

    '&:hover': {
      opacity: '0.75',
    },
  },

  docket: {
    display: 'flex',
    flexDirection: {
      sm: 'column',
      xs: 'row-reverse',
    },
    alignItems: 'flex-end',
  },
  price: {
    fontSize: {
      xs: '14px',
      sm: '24px',
    },
    fontWeight: 'bold',
    margin: {
      xs: '0 0 0 10px',
      sm: 0,
    },
  },
  oldPrice: {
    position: 'relative',

    width: 'fit-content',

    color: color.muted,

    '&:before': {
      content: '""',
      borderBottom: '1px solid',
      borderColor: color.error,
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

      color: color.primary,
    },
  },

  deleteBtn: {
    display: {
      xs: 'none',
      sm: 'flex',
    },
  },

  cancelBtn: {
    height: 'fit-content',
    padding: 0,
    color: color.secondary,
  },

  leftActions: {
    'button:first-of-type': {
      marginRight: '20px',
    },
  },

  edit: {
    display: 'flex',
    alignItems: 'center',

    padding: '4px',

    backgroundColor: color.secondary,
    color: color.primary,

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

    fontSize: {
      xs: '13px',
      sm: '15px',
    },
  },
};

export default sx;
