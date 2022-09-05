const sx = {
  card: {
    maxWidth: {
      md: '660px',
      xs: '100%',
    },
    boxShadow: 'none',
    border: '1px solid',
    borderColor: '#FEC983',
    backgroundColor: 'background.default',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  content: {
    padding: '26px 13px 26px 26px',
  },
  children: {
    width: '100%',
    maxHeight: '150px',
    overflow: 'auto',
    paddingRight: '5px',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: '5px',
    },
  },
  title: {
    fontFamily: 'Roboto slab',
    fontWeight: 'bold',
    marginBottom: '20px',
    paddingRight: '12px',
  },
  link: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: '1px solid',
    borderColor: 'secondary.main',
    padding: '20px 26px',
    marginTop: 'auto',
    color: 'accent.main',
    '&:hover': {
      opacity: 0.75,
    },
  },
};

export default sx;
