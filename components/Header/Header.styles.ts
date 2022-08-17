import { defaultTheme as t } from '../../themes';

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
    backgroundColor: 'common.white',
    borderRadius: '50px',
    '&:hover': {
      backgroundColor: 'secondary.main',
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
    backgroundColor: t.palette.common.white,
    color: t.palette.text.secondary,

    '&:hover': {
      backgroundColor: t.palette.secondary.main,
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
    margin: '0 10px',
  },
  menuBtn: {
    display: {
      xs: 'flex',
      sm: 'none',
    },
    justifyContent: 'center',
    minWidth: '34px',
    height: '34px',
    width: '34px',
    marginLeft: '20px',
    padding: 0,
    borderRadius: '6px',
    backgroundColor: t.palette.common.white,
    '&:hover': {
      backgroundColor: t.palette.common.white,
    },
  },
  menuIcon: {
    width: '18px',
    color: t.palette.common.black,
  },
};

export default sx;
