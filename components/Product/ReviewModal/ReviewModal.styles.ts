import { defaultTheme as t } from 'themes';

const sx = {
  comment: {
    cursor: 'pointer',
    width: {
      xs: '250px',
      sm: '280px',
    },
    padding: '12px',
    backgroundColor: t.palette.common.white,
    boxShadow: 'none',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    margin: '6px 0',
  },
  date: {
    marginLeft: '16px',
  },
};

export default sx;
