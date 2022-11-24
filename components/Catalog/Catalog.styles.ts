import { SxProps } from '@mui/material';

const sx: Record<string, SxProps> = {
  catalog: {
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
  emptyText: {
    marginTop: '15px',
    fontSize: {
      sm: '24px',
      xs: '16px',
    },
  },
  cardsGrid: {
    display: 'flex',
    justifyContent: 'flex-start',
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
