export const sx = {
  header: {
    display: 'flex',
    flexDirection: {
      xs: 'row',
      md: 'column',
    },
    alignItems: { xs: 'center', md: 'flex-start' },
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
    marginTop: {
      xs: '20px',
      md: '40px',
    },
  },
  filterBtn: {
    marginTop: '1rem',
    minWidth: '20px',
    padding: '4px',
  },
};

export default sx;
