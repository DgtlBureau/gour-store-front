const sx = {
  card: {
    display: 'flex',
    alignItems: 'center',

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
    flexDirection: {
      xs: 'column',
      sm: 'row',
    },
    justifyContent: 'space-between',
    padding: 0,

    '&:last-child': {
      padding: 0,
    },
  },

  title: {
    fontWeight: 'bold',
    fontFamily: 'Roboto slab',
    color: 'text.secondary',
  },
  productPrice: {
    fontWeight: 'bold',
    width: '250px',
    textAlign: 'right',
  },
  count: {
    color: 'text.muted',
    textAlign: 'right',
  },

  info: {
    width: 'calc(100% - 48px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '0 24px',
  },

  docket: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  price: {
    fontWeight: 'bold',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',

    padding: 0,

    button: {
      textTransform: 'none',

      padding: 0,

      color: 'text.secondary',
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

    backgroundColor: 'secondary.main',
    color: 'text.secondary',

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
