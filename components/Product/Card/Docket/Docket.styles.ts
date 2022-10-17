export const sx = {
  docket: {
    display: 'flex',
    alignItems: { xs: 'flex-end', md: 'center' },
    justifyContent: { md: 'space-between' },
    width: { xs: 'fit-content', md: '100%' },
    margin: { md: ' 5px 0 10px 0' },
  },
  deployed: {
    margin: { xs: '0 0 10px 0', md: ' 5px 0 10px 0' },
    width: '100%',
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
