import { defaultTheme as t } from '../../themes';

const sx = {
  flag: {
    display: { 
      xs: 'none', 
      sm: 'flex' 
    },
    height: '24px',
    width: '32px',
    margin: '0 20px',
    borderRadius: '6px',
    overflow: 'hidden',
    '&:hover': {
      cursor: 'pointer',
    }
  },
  paper: {
    backgroundColor: t.palette.background.default,
    color: t.palette.text.secondary,
  }, 
  cart: {
    position: 'relative', 
    backgroundColor: t.palette.common.white,
    color: t.palette.text.secondary,

    '&:hover': {
      backgroundColor: t.palette.secondary.main,
    }
  },
  icon: { 
    marginLeft: '20px',
  },
};

export default sx;
