const sx = {
  card: {
    maxHeight: '660px',
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
