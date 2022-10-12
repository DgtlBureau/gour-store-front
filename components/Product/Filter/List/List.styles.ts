export const sx = {
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  summary: {
    display: 'flex',
    alignItems: { xs: 'flex-start', sm: 'center' },
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: 'flex-start',
    gap: '10px',
  },
  characteristics: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  categories: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    margin: { xs: '15px 0', sm: 0 },
  },
  resetBtn: {
    width: {
      xs: '100%',
      sm: 'fit-content',
    },
  },
  title: {
    fontFamily: 'Roboto slab',
    fontWeight: 'bold',
  },
};

export default sx;
