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
  },
  content: {
    padding: '26px',
    borderBottom: '1px solid',
    borderColor: 'secondary.main',
  },
  children: {
    width: '100%',
    height: '140px',
    overflow: 'auto',
  },
  title: {
    fontFamily: 'Roboto slab',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  link: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 26px',
    color: 'accent.main',
    '&:hover': {
      opacity: 0.75,
    },
  },
};

export default sx;
