import { color } from 'themes';

export const sx = {
  promotion: {
    margin: {
      md: '0 0 100px 0',
      sm: '0 0 70px 0',
      xs: '0 0 30px 0',
    },
  },
  header: {
    margin: '20px 0',
  },
  title: {
    margin: {
      xs: '0 0 10px 0',
      md: '0 0 20px 0',
    },
    fontSize: {
      sm: '40px',
      xs: '24px',
    },
    fontWeight: 'bold',
    fontFamily: 'Roboto slab',
    color: 'primary.main',
  },
  description: {
    maxWidth: '1200px',
    color: color.muted,
  },
  catalog: {
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
  },
  emptyText: {
    marginTop: '15px',
    fontSize: {
      sm: '24px',
      xs: '16px',
    },
  },
  cardsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: { xs: '20px', md: '40px' },
    gap: '10px',
  },
  pagination: {
    alignSelf: 'center',
    marginTop: {
      md: '60px',
      sm: '40px',
      xs: '20px',
    },
  },
};

export default sx;