export const sx = {
  container: {
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: {
      sm: '40px',
      xs: '24px',
    },
    fontWeight: 'bold',
    fontFamily: 'Roboto slab',
    color: 'text.secondary',
  },
  backArrow: {
    transform: 'rotate(-180deg)',
  },
  arrows: {
    display: {
      xs: 'none',
      md: 'flex',
    },
  },
  emptyTitle: {
    marginTop: '15px',
    fontSize: {
      sm: '24px',
      xs: '16px',
    },
  },
  slide: {
    display: 'flex',
    width: 'fit-content',
    height: 'auto',
    transform: 'none',
  },
};

export default sx;
