export const sx = {
  container: {
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
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
  cardList: {
    width: '100%',
    marginTop: { xs: '20px', md: '40px' },
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
  emptyText: {
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
