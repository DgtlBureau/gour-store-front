const sx = {
  card: {
    width: '100%',
    padding: '30px',
    backgroundColor: 'background.paper',
    borderRadius: '6px',
  },
  footer: {
    width: '100%',
    borderTop: '1px dashed',
    borderColor: 'text.muted',
    margin: '20px 0 0 0',
    padding: '20px 0 0 0',
  },
  field: {
    width: '100%',
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row',
      md: 'column',
    },
    gap: {
      xs: 0,
      sm: '20px',
      md: 0,
    },
    marginBottom: '10px',
  },
  fieldPrice: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  count: {
    fontFamily: 'Roboto slab',
    fontWeight: 'bold',
    margin: '0 0 20px 0',
  },
  product: {
    width: 'fit-content',
    color: 'text.muted',
  },
  total: {
    fontFamily: 'Roboto slab',
    fontWeight: 'bold',
    color: 'text.secondary',
  },
};

export default sx;
