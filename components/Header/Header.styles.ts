import { color } from 'themes';

const sx = {
  container: {
    position: 'relative',
    height: '72px',
  },
  logo: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  phone: {
    display: {
      xs: 'none',
      sm: 'none',
      md: 'none',
      lg: 'flex',
    },
    marginLeft: '20px',
  },
  city: {
    display: {
      xs: 'none',
      sm: 'none',
      md: 'flex',
    },
    alignItems: 'center',
    cursor: 'pointer',
    marginLeft: '20px',
  },
  cityTitle: {
    margin: '0 5px',
  },
  money: {
    display: {
      xs: 'none',
      sm: 'flex',
    },
    alignItems: 'center',
  },
  moneyAmount: {
    marginRight: '10px',
  },
  replenishment: {
    padding: '4px 16px',
    backgroundColor: color.white,
    borderRadius: '50px',
    '&:hover': {
      backgroundColor: color.secondary,
    },
  },
  flag: {
    display: {
      xs: 'none',
      sm: 'flex',
    },
    height: '24px',
    width: '32px',
    margin: '0 20px',
    borderRadius: '6px',
    overflow: 'hidden',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  cart: {
    position: 'relative',
    backgroundColor: color.white,
    color: color.primary,
    padding: '6px 12px',
    textDecoration: 'none',
    borderRadius: '6px',
    userSelect: 'none',

    '&:hover': {
      backgroundColor: color.secondary,
    },
  },
  cartBadge: {
    marginRight: '15px',
    '& .MuiBadge-badge': {
      right: -3,
      top: 4,
    },
  },
  icon: {
    display: {
      xs: 'none',
      sm: 'flex',
    },
  },
  menuBtn: {
    display: 'flex',
    justifyContent: 'center',
    minWidth: '34px',
    height: '34px',
    width: '34px',
    padding: 0,
    borderRadius: '6px',
    backgroundColor: color.white,
    '&:hover': {
      backgroundColor: color.white,
    },
  },
  menuIcon: {
    width: '18px',
    color: color.black,
  },
};

export default sx;
