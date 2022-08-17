export const sx = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: {
      sm: '40px',
      xs: '24px',
    },
    fontFamily: 'Roboto slab',
    fontWeight: 'bold',
    color: 'text.secondary',
  },
  filters: {
    display: {
      xs: 'none',
      md: 'flex',
    },
    marginTop: {
      xs: '20px',
      md: '40px',
    },
  },
  filterBtn: {
    minWidth: '20px',
    padding: '4px',
  },
};

export default sx;
