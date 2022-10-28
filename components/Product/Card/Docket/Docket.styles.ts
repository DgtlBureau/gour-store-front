export const sx = {
  docket: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '10px',
  },
  pricing: {
    display: 'flex',
    flexDirection: 'column',
  },
  weight: {
    display: { xs: 'none', sm: 'flex' },
    alignItems: 'center',
    color: 'text.muted',
  },
  total: {
    display: 'flex',
    marginRight: '5px',
    fontWeight: 'bold',
  },
  price: {
    fontSize: {
      xs: '16px',
      sm: '20px',
      md: '24px',
    },
    fontWeight: 'bold',
    fontFamily: ' Roboto slab',
  },
  unit: {
    fontSize: {
      xs: '12px',
      sm: '13px',
      md: '14px',
    },
  },
  oldPrice: {
    fontSize: {
      xs: '12px',
      sm: '13px',
      md: '14px',
    },
    textDecoration: 'line-through',
  },
};

export default sx;
